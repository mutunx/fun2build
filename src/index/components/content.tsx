import React, {BaseSyntheticEvent, SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Box, Flex, List, ListItem,  SkeletonText, Text, useBoolean, useOutsideClick} from "@chakra-ui/react";
import {useComment} from "../../common/hook/useComment";
import Tucao from "../../common/components/tucao";


function Content() {

    const [tucaoFlag,setTucaoFlag] = useBoolean(false);
    const [activeComment,setActiveComment] = useState("");
    const [activeTucaoCommentId,setActiveTucaoCommentId] = useState("");
    const sectionRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const commentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const tucaoRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    useOutsideClick({
        ref: sectionRef,
        handler: () => {
            setTucaoFlag.off();
            setActiveComment('');
        },
    })
    const {comment,isCommentLoading,isCommentError} = useComment();


    function scrollEvent(e: React.WheelEvent) {
        const scrollObj = tucaoFlag ? tucaoRef.current : commentRef.current;
        scrollObj.scrollBy(e.deltaX,e.deltaY);
    }

    return (
        <Flex justify={'center'} align={'stretch'} onWheel={scrollEvent} h={'calc(100vh - 2rem)'} >
            <Flex justify={'center'} align={'stretch'}  ref={sectionRef} >
                <Box ref={commentRef} w={'60vw'} overflow={tucaoFlag ? 'hidden':'auto'} sx={{'::-webkit-scrollbar':{display:'none'}}}>
                    <List spacing={4} >
                        {
                            isCommentLoading ?
                                <SkeletonText mt='4' noOfLines={4} spacing='4' />
                                : isCommentError || !comment ? <Box> error </Box>
                                : comment.map(item =>
                                    <ListItem  key={item.guid} onClick={()=>{
                                        setTucaoFlag.on();
                                        setActiveComment(item.guid);
                                        setActiveTucaoCommentId(item.link.substring(item.link.lastIndexOf('/')))
                                    }}>
                                        <Text color={tucaoFlag !== (item.guid === activeComment) ? 'gray.50' : 'blue.400'}>{item.author}</Text>
                                        <Text color={tucaoFlag !== (item.guid === activeComment) ? 'gray.50' : 'blue.900'}>{item.contentSnippet}</Text>
                                    </ListItem>
                                )
                        }
                    </List>

                </Box>
                <Box ref={tucaoRef} w={'30vw'} display={tucaoFlag ? 'block':'none'} overflow={'auto'}  sx={{'::-webkit-scrollbar':{display:'none'}}}>
                    <Tucao id={activeTucaoCommentId} />

                </Box>
            </Flex>
        </Flex>

    );
}

export default Content;
