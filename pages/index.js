import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getDevPosts } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'
import Typewriter from 'typewriter-effect';
import BlogSection from '../components/blog-section'
import Image from 'next/image'

import profilePicture from '../public/images/profile.jpg'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="hero">
        <Image
          src={profilePicture}
          width={144}
          height={144}
          className={`${utilStyles.borderCircle}`}
          placeholder='blur'
          alt='Profile image'
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