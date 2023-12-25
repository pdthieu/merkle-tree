import Generator from "@/components/Generator";
import Verifier from "@/components/Verifier";
import VerifierZK from "@/components/VerifierZK";
import { Stack } from "@chakra-ui/react";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Stack
      direction={["column", "column", "row"]}
      h="full"
      justify="center"
      spacing="16"
      p={4}
      py={16}
    >
      <Generator />
      <Verifier />
      <VerifierZK />
    </Stack>
  );
};

export default Home;
