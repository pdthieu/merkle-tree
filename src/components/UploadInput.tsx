import { Box, Flex, Input, InputProps, Text } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { BsX } from "react-icons/bs";

interface UploadInputProps {
  label: string;
  file: File | null;
  onSubmit: (f: File | null) => void;
  onDrop: () => void;
  inputProps?: InputProps;
}

const UploadInput = ({
  label,
  file,
  onSubmit,
  onDrop,
  inputProps,
}: UploadInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) onSubmit(e.target.files[0]);
  };

  return (
    <Box>
      <Box
        pos="relative"
        cursor="pointer"
        rounded="md"
        height="10rem"
        border="1px"
        borderColor="gray.700"
        px={2}
      >
        {file ? (
          <Flex
            align="center"
            justify="center"
            px={2}
            height="100%"
            width="100%"
          >
            <Text isTruncated>{file.name}</Text>
            <Box
              as="button"
              color="red.500"
              onClick={() => onSubmit(null)}
              ml={2}
            >
              <BsX size="1.25rem" />
            </Box>
          </Flex>
        ) : (
          <Flex align="center" justify="center" px={2} height="100%">
            Upload or drop file here (.xlsx)
            <Input
              pos="absolute"
              type="file"
              top="0"
              left="0"
              width="100%"
              height="100%"
              zIndex="50"
              cursor="pointer"
              onChange={handleChange}
              onDrop={onDrop}
              title=""
              accept="image/png, image/jpeg"
              opacity="0"
              {...inputProps}
            />
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default UploadInput;
