import Layout from "../../components/layout.js";
import {listPill} from "../../lib/pills.js";

export async function getStaticProps() {
    // Add the "await" keyword like this:
    const discuss = await listPill('discuss','');
    console.log(discuss);
    return {
        props: {
            discuss,
        },
    };
}

export default function Discuss({discuss}) {

    return (
        <Layout>
            {discuss.map(d => <p>{d.title}</p>)}
        </Layout>
    );
}
