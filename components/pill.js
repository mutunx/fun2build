import React, { useState } from 'react';
import {Badge, Box, Flex, Stack, Text, useDisclosure} from "@chakra-ui/react";
import Comment from "./comment.js";
import htmlParse from 'html-react-parser';
function Pill(props) {
    const {source,pub_date,author,id,title,content,comments} = props;
    const emptyComment = comments.length === 0;
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex key={id} onClick={onOpen} boxShadow={emptyComment ? '':'2px 2px #719096'}  flexDirection={'column'} marginY={'1rem'} padding={'1rem'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Flex justify={'space-between'}>
                <Flex>
                    <Stack direction='row'>
                        <Badge variant='subtle' alignSelf={'center'} fontSize='0.8em'>{source}</Badge>
                    </Stack>
                </Flex>
                <Text color={'gray.50'} fontSize={'xs'} title={pub_date}>{pub_date}</Text>
                <Text fontSize={'xs'} title={id} color={'gray.400'}> {author}</Text>
            </Flex>
            <Flex marginY={'1rem'}>
                {title === '' ?
                    <Text>{htmlParse(content)}</Text>
                    : <Text>{title}</Text>
                }
            </Flex>
        





            <Comment comments={comments} isOpen={isOpen && !emptyComment} onClose={onClose} />
        </Flex>
    );
}

export default Pill;