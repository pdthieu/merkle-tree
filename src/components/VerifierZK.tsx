import { Box, Button, Heading, Input, Textarea, Text } from "@chakra-ui/react";
import React from "react";
import FormControl from "./FormControl";
import useVerifier from "@/hooks/useVerifier";

const VerifierZK = () => {
  const { values, setValue, isDisabled, isValid, handleVerify } =
    useVerifier();

  const prettifyJSON = (json: string) => {
    return JSON.stringify(JSON.parse(json), null, 2);
  };

  return (
    <Box w="full" maxW="48rem">
      <Heading mb={8} color="orange.500">
        Verifier ZK
      </Heading>
      <FormControl label="Tree root">
        <Input
          type="text"
          placeholder="Example: 0x7805a5e18e093fe163bfe931898304d284472ce8cc4692942954fb1ac0af1a20"
          value={values.root}
          onChange={(e) => setValue("root", e.target.value)}
          fontSize={"xs"}
          fontFamily={"monospace"}
        />
      </FormControl>
      <FormControl label="Proofs">
        <Textarea
          value={values.proofs}
          onChange={(e) => setValue("proofs", e.target.value)}
          onBlur={() => setValue("proofs", prettifyJSON(values.proofs))}
          fontSize={"xs"}
          fontFamily={"monospace"}
          placeholder={`Example: \n${prettifyJSON(`{ 
            "paths2Root": [
              "0xad196729f283eb43a47934888821c8982661785703e77a8794b0f07d0e4d7142",
              "0x615122da60fe4d194aaa03214a72d159dacf359d88e6041e33218fad908cda30",
              "0x97a694534f1efe9c8b66479aebbc034018bb05e2faceccd398901421d589c935"
            ],
            "paths2RootPos": ["0", "1", "0"]
          }`)}`}
          h="8rem"
        />
      </FormControl>
      <FormControl label="Data">
        <Textarea
          value={values.data}
          onChange={(e) => setValue("data", e.target.value)}
          onBlur={() => setValue("data", prettifyJSON(values.data))}
          fontSize={"xs"}
          fontFamily={"monospace"}
          placeholder={`Example: \n${prettifyJSON(`{
                          "publicAddress": "0x7Af6f70217108AfE82983145db6B4F82C8Ef598F",
                          "amount": "100000000000000000000"
                        }`)}`}
          h="8rem"
        />
      </FormControl>
      <FormControl label="Type of each data attribute (separated by comma)">
        <Input
          placeholder="Example: address, uint256"
          value={values.types}
          onChange={(e) => setValue("types", e.target.value)}
          fontSize={"xs"}
          fontFamily={"monospace"}
        />
      </FormControl>
      <Button
        colorScheme={"orange"}
        w="full"
        mt={4}
        onClick={handleVerify}
        isDisabled={isDisabled}
      >
        Verify
      </Button>
      <Box mt={4}>
        {isValid !== null &&
          (isValid === true ? (
            <Text fontSize={"xl"} color="green.500" fontWeight={"bold"}>
              Valid Proofs
            </Text>
          ) : (
            <Text fontSize={"xl"} color="red.500" fontWeight={"bold"}>
              Invalid Proofs
            </Text>
          ))}
      </Box>
    </Box>
  );
};

export default VerifierZK;
