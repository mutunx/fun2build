import Header from "../common/components/header";
import Content from "./components/content";
import {Flex} from "@chakra-ui/react";

function App() {


  return (
      <Flex flexDir={'column'} bg={'gray.50'} h={'100vh'} >
        <Header />
        <Content />
      </Flex>
  );
}

export default App;
