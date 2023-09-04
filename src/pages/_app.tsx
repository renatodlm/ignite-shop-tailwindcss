import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import Image from 'next/image'

import LogoImg from '../assets/logo.svg'
import Link from 'next/link'
import Head from 'next/head'

import favicon from '../assets/favicon.ico'

export default function App({ Component, pageProps }: AppProps) {
   return (
      <>
         <Head>
            <link rel="icon" type="image/png" sizes="16x16" href={favicon.src} />
         </Head>
         <div className="container mx-auto">
            <header className="w-full py-8 mx-auto">
               <Link href="/" prefetch={false}>
                  <Image width={129.74} height={52} src={LogoImg.src} alt="" />
               </Link>
            </header>
            <Component {...pageProps} />
         </div>
      </>
   )
}
