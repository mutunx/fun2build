import React from 'react';
import {
    Badge,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, Stack, Text,
    useDisclosure
} from "@chakra-ui/react";


function Comment(props) {
    const {comments,isOpen, onClose} = props;


    function getReply(comments,replyIdsStr) {
        const replyIds = replyIdsStr.split(',');
        const replyList = comments.filter(c =>  replyIds.includes(c.id));
        console.log(replyList,replyIdsStr);
        return (
            <Flex>
                {replyList.map(reply => {
                        getReply(comments, reply.reply_ids);
                        return (<Text> | {reply.author}:{reply.content}</Text>);
                    }
                )}

            </Flex>
        )
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>评论</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {comments.map(c =>
                            <Flex flexDirection={'column'}>
                                {getReply(comments,c.reply_ids)}
                                <Text>{c.content}</Text>
                                <Stack direction='row'>
                                    <Badge variant='outline' alignSelf={'center'} fontSize='0.8em' colorScheme='red'>&#9650; {c.vote}</Badge>
                                    <Badge variant='outline' alignSelf={'center'} fontSize='0.8em'>by {c.author}</Badge>
                                </Stack>
                            </Flex>
                        )}
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

export default Comment;