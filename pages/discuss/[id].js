import {listPill, listPillBelongs} from "../../lib/pills.js";
import Pill from "../../components/pill.js";
import Layout from "../../components/layout.js";

export async function getStaticProps(context) {
    const { params } = context;
    const id = params.id;
    const discuss = await listPill('discuss',id);
    return {
        props: {
            discuss,
        },
    };
}
export async function getStaticPaths() {
    const paths = await listPillBelongs();
    return {
        paths,
        fallback: false,
    };
}
export default function Discuss({discuss}) {

    return (
        <Layout current='discuss'>
            {discuss.map(d =>
                <Pill key={d.id} {...d} />
            )}
        </Layout>
    );
}
