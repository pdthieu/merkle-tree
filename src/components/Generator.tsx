import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import FormControl from "./FormControl";
import UploadInput from "./UploadInput";
import { BsInfoCircleFill } from "react-icons/bs";
import useGenerator from "@/hooks/useGenerator";

interface GeneratorProps {}

const Generator = ({}: GeneratorProps) => {
  const {
    file,
    setFile,
    convertETHtoWei,
    setConvertETHtoWei,
    exportFileName,
    setExportFileName,
    process,
  } = useGenerator();

  return (
    <Box w="full" maxW="48rem">
      <Heading mb={8} color={"green.500"}>
        Generator
      </Heading>

      <FormControl label="Input file">
        <UploadInput
          label="File"
          file={file}
          onSubmit={setFile}
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

      <FormControl label="Export file name">
        <Input
          value={exportFileName}
          onChange={(e) => setExportFileName(e.target.value)}
        />
      </FormControl>

      <Button
        colorScheme="green"
        w="full"
        mt={4}
        onClick={process}
        isDisabled={!file}
      >
        Process
      </Button>

      <FormControl label="Example input file" mt={4}>
        <a href="/data.xlsx">
          <Text color={"blue.500"} fontWeight={"semibold"} cursor={"pointer"}>
            data.xlsx
          </Text>
        </a>
      </FormControl>
    </Box>
  );
};

export default Generator;
