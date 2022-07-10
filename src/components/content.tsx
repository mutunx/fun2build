import React, {useEffect, useRef, useState} from 'react';
import {List} from "antd";
import {tucaoData} from './data.js'
import Parser from "rss-parser";
import useSWR from 'swr'

type tucao = {
    "comment_ID": number,
    "comment_post_ID": number,
    "comment_author": string,
    "comment_date": string,
    "comment_date_int": number,
    "comment_content": string,
    "comment_parent": number,
    "comment_reply_ID": number,
    "is_jandan_user": number,
    "is_tip_user": number,
    "vote_positive": number,
    "vote_negative": number,
    "sub_comment_count": number,
    "images": string | null,
    "ip_location": string
}
type comment = {
    author: string,
    content: string,
    contentSnippet: string,
    creator: string,
    guid: string,
    isoDate: string,
    link: string,
    pubDate: string,
    title: string,
    active: string,
}
function Content() {

    const defaultData = [
        {
            author: "lode",
            content: "loading",
            contentSnippet: "",
            creator: "",
            guid: "",
            isoDate: "",
            link: "",
            pubDate: "",
            title: "",
            active: '',
        },
    ]
    const defaultTucao = [
        {
            "comment_ID": -1,
            "comment_post_ID": -1,
            "comment_author": "",
            "comment_date": "",
            "comment_date_int": -1,
            "comment_content": "",
            "comment_parent": -1,
            "comment_reply_ID": -1,
            "is_jandan_user": -1,
            "is_tip_user": -1,
            "vote_positive": -1,
            "vote_negative": -1,
            "sub_comment_count": -1,
            "images": null,
            "ip_location": ""
        },
    ]
    const [data,setData] = useState<comment[]>(defaultData)
    const [tucao,setTucao] = useState(defaultTucao)
    const [tucaoShow,setTucaoShow] = useState('')
    const [listMask,setListMask] = useState('')
    const [init,setInit] = useState(false)
    const sectionRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    useEffect(()=>{
        const fetchComment = async () => {
            const parser = new Parser();


            const feed:any = await parser.parseURL('https://spac4fun.herokuapp.com/jandan/top-comments');
            const data:comment[] = feed.items
            setData(data)
            window.addEventListener('click',(e)=> {
                if(sectionRef !== null && sectionRef.current !== null && sectionRef.current && !sectionRef.current.contains(e.target as HTMLDivElement)){
                    setListMask('');
                    setTucaoShow('');
                    setInit(true)
                }
            })
        }


        fetchComment().catch((err) => {
            console.log(err)
        })


    },[])


    if(init) {
        const newList = [...data];
        newList.forEach(x=>x.active = '');
        setInit(false);
        setData(newList);
    }
    async function itemClick(item:comment) {
        // url "http://i.jandan.net/t/5269905"
        // tucao api http://i.jandan.net/api/tucao/all/5269905
        console.log(item.link)
        item.active = 'active';

        const tucaoId = item.link.substring(item.link.lastIndexOf('/'));
        let tucaoRespon;
        let tucao;
        try {
            tucaoRespon = await fetch('https://tucao.space4fun.workers.dev' + tucaoId);
            tucao = await tucaoRespon.json();
        } catch (e) {
            console.error(e);
            tucao = tucaoData;
        }

        // tucao = tucaoData;
        setTucao(tucao.hot_tucao ?? tucao.tucao);
        setTucaoShow('display-tucao');
        setListMask('mask')

        const nData = data.map(x => {
            x.active = '';
            return x
        });
        const activeData:comment | undefined = nData.find(x => x.guid === item.guid)
        if(activeData) activeData.active = 'active'
        setData(nData);


    }

    return (
        <div  className={'content'}>

            <div ref={sectionRef} className={'section'}>
                <div className={"list-main "+tucaoShow}>
                    <List
                        className={'mainList '+ listMask}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item onClick={()=>itemClick(item)} className={'item '+ item.active}>
                                <List.Item.Meta
                                    className={'item-value'}
                                    title={item.author}
                                    description={item.contentSnippet}
                                />
                            </List.Item>
                        )}
                    />
                </div>
                <div className={"list-tucao "+tucaoShow}>
                    <List
                        itemLayout="horizontal"
                        dataSource={tucao}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    className={'item-value'}
                                    title={<a href="https://ant.design">{item.comment_author}</a>}
                                    description={item.comment_content}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>

        </div>
    );
}

export default Content;
