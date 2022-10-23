import React from 'react';
import {Badge, Box, Flex, Stack, Text, useDisclosure} from "@chakra-ui/react";
import Comment from "./comment.js";
import htmlParse from 'html-react-parser';

function Pill(props) {
    const {source,pub_date,author,vote,title,content,comments} = props;

    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <Flex onClick={onOpen} flexDirection={'column'} marginY={'1rem'} padding={'1rem'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Flex justify={'space-between'}>
                <Flex>
                    <Stack direction='row'>
                        <Badge variant='outline' alignSelf={'center'} fontSize='0.8em' colorScheme='blue'>{source} by{author}</Badge>
                    </Stack>
                </Flex>
                <Text color={'gray.50'} title={pub_date}>{pub_date}</Text>
            </Flex>
            <Flex>
                {title === '' ?
                    <Text>{htmlParse(content)}</Text>
                    : <Text>{title}</Text>
                }
            </Flex>





            <Comment comments={comments} isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}

export default Pill;