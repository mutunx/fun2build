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