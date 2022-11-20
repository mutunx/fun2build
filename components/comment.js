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
import htmlParse from 'html-react-parser';


function Comment(props) {
    const {comments,isOpen, onClose,pill} = props;

    function SingleComment(props) {
        const {author, vote,content,id} = props;
        const displayLikes = vote.toString() !== '-1';
        return (
            <Flex key={id} flexDirection={"column"}>
                <Stack direction='row'>
                    <Badge  alignSelf={'center'} fontSize='0.8em' >{author} {displayLikes ? `\u25B2${vote}`: '' }:</Badge>
                </Stack>
                <Text>{htmlParse(content)}</Text>
            </Flex>
        )
    }

    function ReplyComments(props) {
        const {comment,comments} = props;
        const {reply_ids} = comment;
        const replyIds = reply_ids.split(',');
        let replyList = comments.filter(c =>  replyIds.includes(c.id));
        if (replyIds.length > 0 && replyList.length === 0) {
            replyList = comments.filter(c => {
                if (c.author === comment.author) return false;
                return replyIds.includes(c.author);

            });
        }
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
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flexDirection={"column"} mb={"2"}>
                            <Stack direction='row' mb={"1"}>
                                <Badge  alignSelf={'center'} fontSize='0.8em' >{pill.author}:</Badge>
                            </Stack>
                            {htmlParse(pill.content??'')}
                        </Flex>
                        {comments.map(c =>
                            <Flex marginBottom={'1rem'}>
                                <ReplyComments key={c.id} comment={c} comments={comments} />
                            </Flex>
                        )}
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

export default Comment;