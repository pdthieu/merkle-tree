import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import FormControl from "./FormControl";
import UploadInput from "./UploadInput";
import { BsInfoCircleFill } from "react-icons/bs";
import useGenerator from "@/hooks/useGenerator";
import { prettifyJSON } from "@/utils/util";

interface GeneratorProps {}

const Generator = ({}: GeneratorProps) => {
  const {
    file,
    setFile,
    convertETHtoWei,
    setConvertETHtoWei,
    exportFileName,
    setExportFileName,
    processUploadFile,
    processExportFile,
    merkleTreeData,
    setMerkleTreeData,
    query,
    setQuery,
    proofs,
    getProofs,
  } = useGenerator();

  return (
    <Box w="full" maxW="48rem">
      <Heading mb={8} color={"green.500"} textAlign={"center"}>
        Generator
      </Heading>

      <FormControl label="Input file">
        <UploadInput
          label="File"
          file={file}
          onSubmit={setFile}
          onDrop={() => setMerkleTreeData(null)}
          inputProps={{ accept: ".xlsx" }}
        />
        <Checkbox
          colorScheme="green"
          isChecked={convertETHtoWei}
          onChange={(e) => setConvertETHtoWei(e.target.checked)}
          mt={2}
        >
          <Flex align={"center"}>
            Convert ETH to Wei
            <Tooltip label="Convert ETH type to wei in exported file">
              <Box ml={2}>
                <BsInfoCircleFill />
              </Box>
            </Tooltip>
          </Flex>
        </Checkbox>
      </FormControl>

      <Button
        colorScheme="green"
        w="full"
        mt={4}
        onClick={processUploadFile}
        isDisabled={!file}
      >
        Generate Merkle Tree
      </Button>

      <FormControl label="Example input file" mt={4}>
        <a href="/data.xlsx">
          <Text color={"blue.500"} fontWeight={"semibold"} cursor={"pointer"}>
            data.xlsx
          </Text>
        </a>
      </FormControl>

      <Divider borderColor="neutral.500" mt={8} />

      <FormControl label="Export file name" mt={8}>
        <Input
          value={exportFileName}
          onChange={(e) => setExportFileName(e.target.value)}
        />
      </FormControl>

      <Button
        colorScheme="green"
        w="full"
        mt={4}
        onClick={processExportFile}
        isDisabled={!file || !merkleTreeData}
      >
        Export File
      </Button>

      <Divider borderColor="neutral.500" mt={8} />

      <FormControl label="Public Address" mt={8}>
        <Input
          placeholder="Example: 0x1234134asdaf"
          value={query.publicAddress}
          onChange={(e) => setQuery("publicAddress", e.target.value)}
          fontSize={"xs"}
          fontFamily={"monospace"}
        />
      </FormControl>
      <FormControl label="Token ID" mt={4}>
        <Input
          placeholder="Example: 101"
          value={query.tokenId ?? ""}
          onChange={(e) => setQuery("tokenId", e.target.value)}
          fontSize={"xs"}
          fontFamily={"monospace"}
          type="number"
        />
      </FormControl>

      <Button
        colorScheme="green"
        w="full"
        mt={4}
        onClick={getProofs}
        isDisabled={!file || !merkleTreeData}
      >
        Get Proofs
      </Button>

      <Textarea
        value={prettifyJSON(proofs ?? "")}
        fontSize={"xs"}
        fontFamily={"monospace"}
        placeholder={`Proofs is here`}
        h="12rem"
        mt={4}
        isDisabled
      />
    </Box>
  );
};

export default Generator;
