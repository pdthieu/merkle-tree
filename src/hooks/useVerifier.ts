import { useToast } from "@chakra-ui/react";
import useFormCore from "./useFormCore";
import { useEffect, useState } from "react";
import { verifyProof } from "@/merkle";

const useVerifier = () => {
  const toast = useToast({
    duration: 3000,
    position: "bottom",
  });

  const { values, setValue } = useFormCore({
    root: "",
    proofs: "",
    data: "",
    types: "",
  });

  const isDisabled = Object.values(values).some((value) => value === "");

  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (values !== null) setIsValid(null);
  }, [values]);

  const handleVerify = async () => {
    try {
      const result = await verifyProof(
        values.root,
        JSON.parse(values.proofs),
        values.data,
        values.types.split(",").map((type) => type.trim())
      );

      setIsValid(result);
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        status: "error",
      });
    }
  };

  return {
    values,
    setValue,
    isDisabled,
    isValid,
    handleVerify,
  };
};

export default useVerifier;
