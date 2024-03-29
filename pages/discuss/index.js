import Layout from "../../components/layout.js";
import {listPill} from "../../lib/pills.js";
import Pill from "../../components/pill.js";
export async function getStaticProps() {
    // Add the "await" keyword like this:
    const discuss = await listPill('discuss','');
    return {
        props: {
            discuss,
        },
    };
}

export default function Discuss({discuss}) {

    return (
        <Layout current={'discuss'}>
            {discuss.map(d =>
                <Pill key={d.id} {...d} />
            )}
        </Layout>
    );
}
