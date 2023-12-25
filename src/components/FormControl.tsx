import React from "react";
import {
  FormControlProps as CharkaFormControlProps,
  FormControl as ChakraFormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

interface FormControlProps extends CharkaFormControlProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const FormControl = ({
  label,
  error,
  children,
  ...rest
}: FormControlProps) => {
  return (
    <ChakraFormControl isInvalid={!!error} mb={4} w="full" {...rest}>
      <FormLabel mb={1}>{label}</FormLabel>
      {children}
      <FormErrorMessage>{error}</FormErrorMessage>
    </ChakraFormControl>
  );
};

export default FormControl;
