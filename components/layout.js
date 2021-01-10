import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import SocialLinks from './social-links/social-links'
import Image from 'next/image'

export const name = 'Martin Solev'
export const siteTitle = 'Martin Solev'

export default function Layout({ children, home }) {
  return (
    <div className={home ? styles.container : styles.containerMargin}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Martin Solev - Software and Cloud engineer building scalable apps"
        />
        <meta
          property="og:image"
          content={`/images/profile.jpg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {!home ? (
          <>
            <>
              <Link href="/">
                <a>
                  <Image
                    src="/images/profile.jpg"
                    width={108}
                    height={108}
                    className={`${utilStyles.borderCircle}`}
                    alt={name}
                  />
                </a>
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{name}</a>
                </Link>
              </h2>
            </>
          </>
        ) : (
            <></>
          )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}

      <SocialLinks />

    </div>
  )
}