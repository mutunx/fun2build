import Header from "../common/components/header";
import JdComment from "./components/jdComment";
import {Box, Flex, useBoolean, useOutsideClick} from "@chakra-ui/react";
import {Routes, Route} from "react-router-dom";
import React, {useRef, useState} from "react";
import Tucao from "../common/components/tucao";
import V2ex from "./components/v2ex";
import V2exPost from "../common/components/v2exPost";

function App() {
    const [activeComment,setActiveComment] = useState("");
    const sectionRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const postRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const commentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    useOutsideClick({
        ref: sectionRef,
        handler: () => {
            setActiveComment('');
        },
    })


  return (
      <Flex flexDir={'row'} justify={'center'} bg={'white'} h={'100vh'} >
        <Header />

          <Flex justify={'center'} align={'stretch'}  h={'100vh'} >
              <Flex justify={'center'} align={'stretch'}  ref={sectionRef} >
                  <Box ref={postRef} w={'40vw'} paddingRight={'1rem'} overflow={activeComment !== '' ? 'hidden':'auto'} sx={{'::-webkit-scrollbar':{display:'none'}}}>
                      <Routes>
                          <Route path="/" element={<JdComment setActiveComment={setActiveComment} />} />
                          <Route path="/v2ex/hot" element={<V2ex setActiveComment={setActiveComment} type={'hot'} />} />
                      </Routes>
                  </Box>
                  <Box ref={commentRef} w={'30vw'} display={activeComment !== '' ? 'block':'none'} overflow={'auto'}  sx={{'::-webkit-scrollbar':{display:'none'}}}>
                      <Routes>
                          <Route path="/" element={<Tucao id={activeComment} />} />
                          <Route path="/v2ex/hot" element={<V2exPost id={activeComment} />} />
                      </Routes>
                  </Box>
              </Flex>
          </Flex>

      </Flex>
  );
}

export default App;
