import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import Image from 'next/image'

import LogoImg from '../assets/logo.svg'

export default function App({ Component, pageProps }: AppProps) {
   return (
      <>
         <div className="container mx-auto">
            <header className="w-full py-8 px-9 mx-auto">
               <Image width={129.74} height={52} src={LogoImg.src} alt="" />
            </header>
            <Component {...pageProps} />
         </div>
      </>
   )
}
