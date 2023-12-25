import { ethers } from "ethers";
import { convertFile, exportToJson, etherToWei } from "@/utils";
import { buildBabyjub, buildPoseidonOpt } from "circomlibjs";
import PoseidonMerkle from "@/libs/PoseidonMerkle";
import buildPoseidonMerkle from "@/libs/PoseidonMerkle";

export const makeMerkleTree = async (
  file: File,
  options: { ETHToWei?: boolean; exportFileName: string } = {
    ETHToWei: true,
    exportFileName: "export",
  }
) => {
  const poseidonJs = await buildPoseidonOpt();
  const babyJub = await buildBabyjub();
  const F = babyJub.F;
  const { data, types } = await convertFile(file);

  const toHexString = (val: any) => {
    return "0x" + F.toObject(val).toString(16);
  };

  const leaves = data.map((row) =>
    poseidonJs(
      Object.values(row).map((value: any, index) =>
        parseFloat(value) > 0 && options.ETHToWei && types[index].isETH
          ? etherToWei(value.toString())
          : value
      )
    )
  );

  const poseidonMerkle = await buildPoseidonMerkle();
  const tree = poseidonMerkle.treeFromLeafArray(leaves);
  const depth = poseidonMerkle.getBase2Log(leaves.length);
  let root = tree[0];
  while (Array.isArray(root)) {
    root = root[0];
  }

  const tokensWithProof = data.map((row, index) => ({
    proofs: {
      paths2Root: poseidonMerkle
        .getProof(index, tree, leaves)
        .map((el) => toHexString(el)),
      paths2RootPos: poseidonMerkle.generateMerklePosArray(depth)[index],
    },
    leafHash: toHexString(leaves[index]),
    index,
    data: {
      ...Object.fromEntries(
        Object.entries(row).map(([key, value]: any, idx) => [
          key,
          parseFloat(value) > 0 && options.ETHToWei && types[idx].isETH
            ? etherToWei(value.toString())
            : value,
        ])
      ),
    },
  }));
  const result = {
    merkleRoot: toHexString(root),
    leaves: tokensWithProof,
  };
  exportToJson(result, options.exportFileName);
};

// export const verifyProof = (
//   root: string,
//   proofs: string[],
//   rawData: string,
//   types: string[]
// ) => {
//   const data = JSON.parse(rawData);
//   if (Object.keys(data).length !== types.length) {
//     throw new Error("Data and types is inconsistent");
//   }

//   const { keccak256: etherKeccak, defaultAbiCoder } = ethers.utils;
//   let computedHash = etherKeccak(
//     defaultAbiCoder.encode(types, Object.values(data))
//   );
//   proofs.forEach((proof) => {
//     computedHash = etherKeccak(
//       computedHash < proof
//         ? computedHash + proof.substring(2)
//         : proof + computedHash.substring(2)
//     );
//   });

//   return computedHash === root;
// };
// function etherToWei(arg0: any): any {
//   throw new Error("Function not implemented.");
// }
