import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getDevPosts, getSortedPostsData } from '../lib/posts'
import layoutStyles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Typewriter from 'typewriter-effect';
import BlogSection from '../components/blog-section'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="hero">
        <img
          src="/images/profile.jpg"
          className={`${layoutStyles.headerHomeImage} ${utilStyles.borderCircle}`}
        />
        <h1 className={utilStyles.heading2Xl}>Martin Solev</h1>
        <p className={utilStyles.headingLg}>
          <Typewriter
            options={{
              strings: ['Software Engineer', 'Cloud Engineer'],
              autoStart: true,
              loop: true
            }}
          />
        </p>
        <p>
          I'm a Software Engineer specializing in Web and Cloud systems and applications. I enjoy building web apps, mobile apps and backends that use the power of the cloud.
        </p>

        <a href="mailto:martin_solev@hotmail.com" className="btn btn-primary">
          Get in touch
        </a>
      </section>

      <BlogSection posts={allPostsData} />
      

      
    </Layout>
  )
}

export async function getStaticProps() {
  const devposts = await getDevPosts();
  return {
    props: {
      allPostsData: devposts
    }
  }
}