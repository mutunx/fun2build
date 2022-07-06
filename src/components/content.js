import React, {useEffect, useRef, useState} from 'react';
import {List} from "antd";
import {xml,tucaoData} from './data.js'
import Parser from "rss-parser";




function Content(props) {

    const defaultData = [
        {
            author: "哥谭市革委会主任",
            content: "<small><b>@树洞</b></small>\n<p>老婆开始给我下猛药了，经常点生蚝要我吃，哎，已婚男人的压力就是大</p>\n",
            contentSnippet: "@树洞\n老婆开始给我下猛药了，经常点生蚝要我吃，哎，已婚男人的压力就是大",
            creator: "哥谭市革委会主任",
            guid: "http://i.jandan.net/t/5269905",
            isoDate: "2022-07-02T21:58:47.000Z",
            link: "http://i.jandan.net/t/5269905",
            pubDate: "Sat, 02 Jul 2022 21:58:47 GMT",
            title: "哥谭市革委会主任: @树洞 老婆开始给我下猛药了，经常点生蚝要我吃，哎，已婚男人的压力就是大",
            active: '',
        },
    ]
    const defaultTucao = [
        {
            "comment_ID": 10718033,
            "comment_post_ID": 102312,
            "comment_author": "臭臭鼠",
            "comment_date": "2022-07-02 22:21:05",
            "comment_date_int": 1656771665,
            "comment_content": "去练负重深蹲吧。\n坚实有力的大腿四头肌、臀肌能在打桩时为你带来源源不断的充沛动力。",
            "comment_parent": 5269905,
            "comment_reply_ID": 0,
            "is_jandan_user": 0,
            "is_tip_user": 0,
            "vote_positive": 91,
            "vote_negative": 1,
            "sub_comment_count": 0,
            "images": null,
            "ip_location": "福建省泉州市"
        },
    ]
    const [data,setData] = useState(defaultData)
    const [tucao,setTucao] = useState(defaultTucao)
    const [tucaoShow,setTucaoShow] = useState('')
    const [listMask,setListMask] = useState('')
    const [init,setInit] = useState(false)
    const sectionRef = useRef();
    useEffect(()=>{
        const parser = new Parser();



        parser.parseURL('https://spac4fun.herokuapp.com/jandan/top-comments',(err, feed)=> {
            console.log(err,feed)
            const data = feed.items
            setData(data)

        })

        window.addEventListener('click',(e)=> {
            if(sectionRef.current && !sectionRef.current.contains(e.target)){
                setListMask('');
                setTucaoShow('');
                setInit(true)
            }
        })
    },[])


    if(init) {
        const newList = [...data];
        newList.forEach(x=>x.active = '');
        setInit(false);
        setData(newList);
    }
    async function itemClick(item) {
        // url "http://i.jandan.net/t/5269905"
        // tucao api http://i.jandan.net/api/tucao/all/5269905
        console.log(item.link)
        item.active = 'active';

        const tucaoId = item.link.substring(item.link.lastIndexOf('/'));

        const tucaoRespon = await fetch('https://tucao.space4fun.workers.dev' + tucaoId);
        const tucao = await tucaoRespon.json();

        setTucao(tucao.hot_tucao ?? tucao.tucao);
        setTucaoShow('show');
        setListMask('mask')

        const nData = data.map(x => {
            x.active = '';
            return x
        });
        nData.find(x => x.guid === item.guid).active = 'active'
        setData(nData);


    }

    return (
        <div  className={'content'}>

            <div ref={sectionRef} className={'section'}>
                <div className="list-main">
                    <List
                        className={'mainList '+ listMask}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item onClick={()=>itemClick(item)} className={'item '+ item.active}>
                                <List.Item.Meta
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
