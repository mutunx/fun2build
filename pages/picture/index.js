import Layout from "../../components/layout.js";
import {listPill} from "../../lib/pills.js";
import Pill from "../../components/pill.js";
export async function getStaticProps() {
    // Add the "await" keyword like this:
    const picture = await listPill('picture','');
    return {
        props: {
            picture,
        },
    };
}

export default function Discuss({picture}) {

    return (
        <Layout current={'picture'}>
            {picture.map(d =>
                <Pill key={d.id} {...d} />
            )}
        </Layout>
    );
}
