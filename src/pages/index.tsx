import FormControl from "@/components/FormControl";
import Generator from "@/components/Generator";
import UploadInput from "@/components/UploadInput";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Stack,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { BsInfoCircleFill } from "react-icons/bs";

const Home: NextPage = () => {
  return (
    <Stack
      direction={["column", "row"]}
      h="full"
      justify="center"
      spacing="16"
      p={4}
      py={16}
    >
      <Generator />
      <Box w="full" maxW="32rem">
        <Heading mb={8} color="orange.500">
          Verifier
        </Heading>
        <FormControl label="Tree root">
          <Input
            type="text"
            placeholder="Example: 0x7805a5e18e093fe163bfe931898304d284472ce8cc4692942954fb1ac0af1a20"
            value={""}
            onChange={() => {}}
            fontSize={"xs"}
            fontFamily={"monospace"}
          />
        </FormControl>
        <FormControl label="Proofs">
          <Textarea
            value={"aaa"}
            onChange={(e) => {}}
            onBlur={() => {}}
            fontSize={"xs"}
            fontFamily={"monospace"}
            // placeholder={`Example: \n${prettifyJSON(`[
            //                 "0xad196729f283eb43a47934888821c8982661785703e77a8794b0f07d0e4d7142",
            //                 "0x615122da60fe4d194aaa03214a72d159dacf359d88e6041e33218fad908cda30",
            //                 "0x97a694534f1efe9c8b66479aebbc034018bb05e2faceccd398901421d589c935"
            //             ]`)}`}
            h="8rem"
          />
        </FormControl>
        <FormControl label="Data">
          <Textarea
            value={""}
            onChange={(e) => {}}
            onBlur={() => {}}
            fontSize={"xs"}
            fontFamily={"monospace"}
            // placeholder={`Example: \n${prettifyJSON(`{
            //                 "publicAddress": "0x7Af6f70217108AfE82983145db6B4F82C8Ef598F",
            //                 "amount": "100000000000000000000"
            //               }`)}`}
            h="8rem"
          />
        </FormControl>
        <FormControl label="Type of each data attribute (separated by comma)">
          <Input
            placeholder="Example: address, uint256"
            value={""}
            onChange={(e) => {}}
            fontSize={"xs"}
            fontFamily={"monospace"}
          />
        </FormControl>
        <Button
          colorScheme={"orange"}
          w="full"
          mt={4}
          onClick={() => {}}
          isDisabled={false}
        >
          Verify
        </Button>
        {/* <Box mt={4}>
          {true !== null &&
            (5 > 3 ? (
              <Text fontSize={"xl"} color="green.500" fontWeight={"bold"}>
                Proofs is valid
              </Text>
            ) : (
              <Text fontSize={"xl"} color="red.500" fontWeight={"bold"}>
                Proof is invalid
              </Text>
            ))}
        </Box> */}
      </Box>
    </Stack>
  );
};

export default Home;
