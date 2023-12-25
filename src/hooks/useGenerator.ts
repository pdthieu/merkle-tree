import { makeMerkleTree } from "@/merkle";
import { convertFile } from "@/utils";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const useGenerator = () => {
  const toast = useToast({
    duration: 3000,
    position: "bottom",
  });
  const [file, setFile] = useState<File | null>(null);
  const [exportFileName, setExportFileName] = useState<string>("export");
  const [convertETHtoWei, setConvertETHtoWei] = useState<boolean>(false);

  const process = async () => {
    if (!file) return;
    try {
      await makeMerkleTree(file, {
        exportFileName,
        ETHToWei: convertETHtoWei,
      });
      setFile(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
      });
    }
  };

  return {
    file,
    setFile,
    convertETHtoWei,
    setConvertETHtoWei,
    exportFileName,
    setExportFileName,
    process,
  };
};

export default useGenerator;
