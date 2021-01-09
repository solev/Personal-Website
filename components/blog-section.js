import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from './date'


export default function BlogSection({ posts }) {
    return (
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} posts-container`} style={{ marginTop: '35px' }}>
            <h2 className={utilStyles.headingLg}>Blog</h2>
            <ul className={utilStyles.list}>
                {posts.map(({ id, published_at, title, slug }) => (
                    <li className={utilStyles.listItem} key={id}>
                        <Link href={`/posts/${slug}`}>
                            <a>{title}</a>
                        </Link>
                        <br />
                        <small className={utilStyles.lightText}>
                            <Date dateString={published_at} />
                        </small>
                    </li>
                ))}
            </ul>

            <style jsx>{`
                .posts-container {
                    min-height: 400px;
                }
            `}</style>
        </section>
    )
}