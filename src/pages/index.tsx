import Generator from "@/components/Generator";
import Verifier from "@/components/Verifier";
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
    </Stack>
  );
};

export default Home;
