import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { stripe } from '@/lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
   products: {
      id: string
      name: string
      imageUrl: string
      price: number
   }[]
}

export default function Home({ products }: HomeProps) {
   const [sliderRef] = useKeenSlider({
      slides: {
         perView: 3,
         spacing: 48,
      },
   })
   return (
      <>
         <div className="w-[calc(100vw-((100vw-100%)/2))]">
            <div className="keen-slider" ref={sliderRef}>
               {products.map((product) => {
                  return (
                     <div
                        key={product.id}
                        className="keen-slider__slide relative rounded-lg md:!min-w-[33.75rem] bg-gradient-to-b from-[#1EA483] to-[#7465D4] pb-[6.25rem]">
                        <Image
                           width={520}
                           height={480}
                           className="object-cover object-center"
                           src={product.imageUrl}
                           alt=""
                        />
                        <footer className="bg-[rgba(32,32,36,0.9)] bg-opacity-90 px-10 py-8 rounded-md absolute bottom-1 left-1 right-1 flex items-center justify-between translate-y-full transition-all opacity-0">
                           <strong>{product.name}</strong>
                           <span className="text-green-300 text-xl font-bold">{product.price}</span>
                        </footer>
                     </div>
                  )
               })}
            </div>
         </div>
      </>
   )
}
export const getStaticProps: GetStaticProps = async () => {
   const response = await stripe.products.list({
      expand: ['data.default_price'],
   })

   const products = response.data.map((product) => {
      const price = product.default_price as Stripe.Price

      return {
         id: product.id,
         name: product.name,
         imageUrl: product.images[0],
         price: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
         }).format(price.unit_amount! / 100),
      }
   })

   return {
      props: {
         products,
      },
      revalidate: 60 * 60 * 2,
   }
}
