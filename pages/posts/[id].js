
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getDevPost, getDevPosts, getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
                <link rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/darkula.css"></link>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.published_at} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const posts = await getDevPosts();
    const paths = posts.map(post => {
        return {
            params: {
                id: post.slug
            }
        }
    });

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getDevPost(params.id);
    return {
        props: {
            postData
        }
    }
}