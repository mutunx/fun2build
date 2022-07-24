import Header from "../common/components/header";
import Comment from "./components/comment";
import {Flex} from "@chakra-ui/react";
import {Routes, Route} from "react-router-dom";

function App() {


  return (
      <Flex flexDir={'row'} justify={'center'} bg={'white'} h={'100vh'} >
        <Header />
          <Routes>
              <Route path="/" element={<Comment />} />
              <Route path="/test" element={<h1>hello</h1>} />
          </Routes>
      </Flex>
  );
}

export default App;
