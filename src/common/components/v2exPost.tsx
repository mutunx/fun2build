import React from 'react';
import {Box, List, ListItem, SkeletonText, Text} from "@chakra-ui/react";
import {rssItem} from "../type";
import {useV2exPost} from "../hook/useV2exPost";

type props = {
    id:string
}

function V2exPost({id}:props) {

    const PostItem = (props: { item: rssItem; }) => {
        const item = props.item;
        return (
            <Box paddingLeft={'0.7rem'} borderLeftStyle={'solid'} borderLeftWidth={'0.5rem'} borderLeftColor={'blackAlpha.500'}>
                {item.reply  && item.reply.map(r => <PostItem key={item.guid+r.guid}  item={r}/>)}
                <Text color={'blackAlpha.500'}>{item.author}</Text>
                <Text color={'blue.900'}>{item.contentSnippet}</Text>
            </Box>
        )
    }
    const {v2exPost,isV2exPostLoading,isV2exPostError} = useV2exPost(id);

    return (
        <List spacing={4}>
            {
                isV2exPostLoading ?
                    <SkeletonText mt='4' noOfLines={4} spacing='4' />
                        : isV2exPostError || !v2exPost ? <Box> error </Box>
                        : v2exPost.map(item =>
                            <ListItem key={item.guid}>
                                <PostItem key={item.guid} item={item} />
                            </ListItem>)
            }
        </List>

    );
}

export default V2exPost;
