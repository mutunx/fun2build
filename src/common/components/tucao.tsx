import React from 'react';
import {Box, List, ListItem, SkeletonText, Text} from "@chakra-ui/react";
import {useTucao} from "../hook/useTucao";

type props = {
    id:string
}

function Tucao(props:props) {

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
                                <Text color={'blue.400'}>{item.comment_author}</Text>
                                <Text color={'blue.900'}>{item.comment_content}</Text>
                            </ListItem>)
            }
        </List>

    );
}

export default Tucao;
