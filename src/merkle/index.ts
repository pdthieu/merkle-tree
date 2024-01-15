import { convertFile, exportToJson, etherToWei } from "@/utils";
import { buildBabyjub, buildPoseidonOpt } from "circomlibjs";
import buildPoseidonMerkle from "@/libs/PoseidonMerkle";
import { IMerkleTree } from "./interface";

export const makeMerkleTree = async (
  file: File,
  options: { ETHToWei?: boolean; exportFileName: string } = {
    ETHToWei: true,
    exportFileName: "export",
  }
): Promise<IMerkleTree> => {
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
  const merklePosArray = poseidonMerkle.generateMerklePosArray(depth);

  const tokensWithProof = data.map((row, index) => ({
    proofs: {
      paths2Root: poseidonMerkle
        .getProof(index, tree, leaves)
        .map((el) => toHexString(el)),
      paths2RootPos: merklePosArray[index],
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
  return result;
};

export const verifyProof = async (
  root: string,
  proofs: { paths2Root: string[]; paths2RootPos: number[] },
  rawData: string,
  types: string[]
): Promise<boolean> => {
  const { paths2Root, paths2RootPos } = proofs;
  const data = JSON.parse(rawData);
  if (Object.keys(data).length !== types.length) {
    throw new Error("Data and types is inconsistent");
  }

  const poseidon = await buildPoseidonOpt();
  const babyJub = await buildBabyjub();
  const F = babyJub.F;
  const toHexString = (val: any) => {
    return "0x" + F.toObject(val).toString(16);
  };

  let computedHash = poseidon(Object.values(data));
  paths2Root.forEach((proof, index) => {
    computedHash = paths2RootPos[index]
      ? poseidon([proof, computedHash])
      : poseidon([computedHash, proof]);
  });

  return toHexString(computedHash) === root;
};
