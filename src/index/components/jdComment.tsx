import React, { useRef, useState} from 'react';
import {Box, Flex, List, ListItem,  SkeletonText, Text, useBoolean, useOutsideClick} from "@chakra-ui/react";
import {useComment} from "../../common/hook/useComment";
import Tucao from "../../common/components/tucao";

type props = {
    setActiveComment:Function,
}

function JdComment({setActiveComment}:props) {

    const [beClicked,setBeClicked] = useBoolean(false);
    const [guid,setGuid] = useState("");
    const {comment,isCommentLoading,isCommentError} = useComment();
    return (
            <List spacing={4} >
                {
                    isCommentLoading ?
                        <SkeletonText mt='4' noOfLines={4} spacing='4' />
                        : isCommentError || !comment ? <Box> error </Box>
                        : comment.map(item =>
                            <ListItem  key={item.guid} onClick={()=>{
                                setBeClicked.on();
                                setGuid(item.guid);
                                setActiveComment(item.link.substring(item.link.lastIndexOf('/')))
                            }}>
                                <Text color={beClicked !== (item.guid === guid) ? 'white' : 'blackAlpha.500'}>{item.module} {item.author}:</Text>
                                <Text color={beClicked !== (item.guid === guid) ? 'white' : 'blue.900'}>{item.contentSnippet}</Text>
                            </ListItem>
                        )
                }
            </List>



    );
}

export default JdComment;
