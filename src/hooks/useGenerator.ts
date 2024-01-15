import { makeMerkleTree } from "@/merkle";
import { IMerkleTree, IProofs } from "@/merkle/interface";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useFormCore from "./useFormCore";
import { exportToJson } from "@/utils";

const useGenerator = () => {
  const [file, setFile] = useState<File | null>(null);
  const [exportFileName, setExportFileName] = useState<string>("export");
  const [convertETHtoWei, setConvertETHtoWei] = useState<boolean>(false);
  const [merkleTreeData, setMerkleTreeData] = useState<IMerkleTree | null>(
    null
  );

  const { values: query, setValue: setQuery } = useFormCore({
    publicAddress: "",
    tokenId: null,
  });

  const [proofs, setProofs] = useState<IProofs | null>(null);

  const toast = useToast({
    duration: 3000,
    position: "bottom",
  });

  const processUploadFile = async () => {
    if (!file) return;
    try {
      const data = await makeMerkleTree(file, {
        exportFileName,
        ETHToWei: convertETHtoWei,
      });
      setMerkleTreeData(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
      });
    }
  };

  const processExportFile = () => {
    exportToJson(merkleTreeData, exportFileName);
  };

  const getProofs = () => {
    if (!merkleTreeData) return;
    const leave = merkleTreeData.leaves.find(
      (el) =>
        el.data.publicAddress === query.publicAddress &&
        el.data.id === Number(query.tokenId)
    );

    if (!leave) return;

    setProofs({
      merkleRoot: merkleTreeData.merkleRoot,
      proofs: leave?.proofs,
      data: leave?.data,
    } as IProofs);

  };

  return {
    file,
    setFile,
    convertETHtoWei,
    setConvertETHtoWei,
    exportFileName,
    setExportFileName,
    processUploadFile,
    merkleTreeData,
    query,
    setQuery,
    proofs,
    getProofs,
    processExportFile,
    setMerkleTreeData,
  };
};

export default useGenerator;
