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


    function SingleComment(props) {
        const {author, vote,content} = props;
        return (
            <Flex flexDirection={"column"}>
                <Stack direction='row'>
                    <Badge  alignSelf={'center'} fontSize='0.8em' >{author} &#9650;{vote}:</Badge>
                </Stack>
                <Text>{content}</Text>
            </Flex>
        )
    }

    function ReplyComments(props) {
        const {comment,comments} = props;
        const {reply_ids} = comment;
        const replyIds = reply_ids.split(',');
        const replyList = comments.filter(c =>  replyIds.includes(c.id));
        return (
            <Flex 
            borderLeft={".25rem"} 
            paddingLeft={'.25rem'}
            marginLeft={'.25rem'} 
            marginBottom={'.5rem'}
            flexDirection={'column'} 
            borderStyle={"solid"}
            borderColor={'gray.500'}
            >
                {replyList.map(reply => {
                        return (<ReplyComments comment={reply} comments={comments} />)
                    }
                )}
                <SingleComment {...comment} />
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
                            <Flex marginBottom={'1rem'}>
                                <ReplyComments comment={c} comments={comments} />
                            </Flex>
                        )}
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

export default Comment;