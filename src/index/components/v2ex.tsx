import React, { useRef, useState} from 'react';
import {Box, List, ListItem,  SkeletonText, Text, useBoolean, useOutsideClick} from "@chakra-ui/react";
import {useV2ex} from "../../common/hook/useV2ex";
import parse from 'html-react-parser';

type props = {
    setActiveComment:Function,
    type:string
}

function V2ex({setActiveComment,type}:props) {
    const [tucaoFlag,setTucaoFlag] = useBoolean(false);
    const [activePost,setActivePost] = useState("");
    const listRef = useRef() as React.RefObject<HTMLLIElement>;
    const {v2ex,isV2exLoading,isV2exError} = useV2ex(type);

    useOutsideClick({
        ref: listRef,
        handler: () => {
            setTucaoFlag.off();
            setActivePost('');
        },
    })


    return (
        <List  spacing={4} >
            {
                isV2exLoading ?
                    <SkeletonText mt='4' noOfLines={4} spacing='4' />
                    : isV2exError || !v2ex ? <Box> error </Box>
                    : v2ex.map(item =>
                        <ListItem ref={listRef} key={item.guid} onClick={()=>{
                            setTucaoFlag.on();
                            setActivePost(item.guid);
                            setActiveComment(item.guid)
                        }}>
                            <Text color={tucaoFlag !== (item.guid === activePost) ? 'white' : 'blackAlpha.500'}>{item.title} by  {item.author}</Text>
                            <Box color={tucaoFlag !== (item.guid === activePost) ? 'white' : 'blue.900'}>{parse(item.content)}</Box>
                        </ListItem>
                    )
            }
        </List>

    );
}

export default V2ex;
