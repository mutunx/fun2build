import React from 'react';
import {Box, List, ListItem, SkeletonText, Text} from "@chakra-ui/react";
import {useTucao} from "../hook/useTucao";
import {tucao} from "../type";

type props = {
    id:string
}

function Tucao(props:props) {

    const TucaoItem = (props: { item: tucao; }) => {
        const item = props.item;
        return (
            <Box paddingLeft={'0.7rem'} borderLeftStyle={'solid'} borderLeftWidth={'0.5rem'} borderLeftColor={'blackAlpha.500'}>
                <Text color={'blackAlpha.500'}>{item.comment_author}</Text>
                {item.comment_reply  && <TucaoItem  item={item.comment_reply}/>}
                <Text color={'blue.900'}>{item.comment_content}</Text>
            </Box>
        )
    }

    const {tucao,isTucaoError,isTucaoLoading} = useTucao(props.id);
    if (isTucaoError) console.error(isTucaoError)

    return (
        <List spacing={4}>
            {
                isTucaoLoading ?
                    <SkeletonText mt='4' noOfLines={4} spacing='4' />
                        : isTucaoError || !tucao ? <Box> error </Box>
                        : tucao.map(item =>
                            <ListItem key={item.comment_ID.toString()}>
                                <TucaoItem item={item} />
                                {/*<Text color={'blackAlpha.500'}>{item.comment_author}</Text>*/}
                                {/*<Text color={'blue.900'}>{item.comment_content}</Text>*/}
                            </ListItem>)
            }
        </List>

    );
}

export default Tucao;
