import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import SocialLinks from './social-links/social-links'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { GA_TRACKING_ID } from '../lib/gtag'

import profilePicture from '../public/images/profile.jpg'

export const name = 'Martin Solev'
export const siteTitle = 'Martin Solev - Personal Website'

export default function Layout({ children, home }) {
  const router = useRouter()
  return (
    <>
    <div className={home ? styles.container : styles.containerMargin}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Martin Solev - Software and Cloud engineer building scalable cloud applicaitons"
        />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
                    src={profilePicture}
                    width={108}
                    height={108}
                    className={`${utilStyles.borderCircle}`}
                    alt={name}
                    placeholder='blur'
                    alt='Profile image'
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
    
    <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy='afterInteractive'
      />
      <Script
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
        }}
      />
    </>
  )
}