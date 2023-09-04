import Image from 'next/image'
import { stripe } from '@/lib/stripe'
import { GetStaticProps, GetStaticPaths } from 'next'
import Stripe from 'stripe'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState } from 'react'
import Head from 'next/head'

interface ProductProps {
   product: {
      id: string
      name: string
      imageUrl: string
      price: string
      description: string
      defaultPriceId: string
   }
}

export default function Product({ product }: ProductProps) {
   const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

   const { isFallback } = useRouter()

   if (isFallback) {
      return <p>Loading...</p>
   }

   async function handleByyProduct() {
      try {
         setIsCreatingCheckoutSession(true)

         const response = await axios.post('/api/checkout', {
            priceId: product.defaultPriceId,
         })

         const { checkoutUrl } = response.data

         window.location.href = checkoutUrl
      } catch (err) {
         setIsCreatingCheckoutSession(false)
         alert('Falha ao redirecionar ao checkout')
      }
   }

   return (
      <>
         <Head>
            <title>{product.name} | Ignite Shop</title>
         </Head>
         <div className="container">
            <div className="flex gap-[4.5rem] items-stretch flex-grow">
               <div className="rounded-lg bg-gradient-to-b from-[#1EA483] to-[#7465D4] py-[5rem] flex items-center justify-center flex-1 max-w-[35.9375rem] min-h-[41rem]">
                  <Image src={product.imageUrl} width={520} height={480} alt="" />
               </div>
               <div className="flex-1 flex flex-col">
                  <div>
                     <h1 className="text-gray-100 text-2xl font-bold">{product.name}</h1>
                     <span className="text-green-300 font-bold text-2xl mt-4">{product.price}</span>
                     <p className="text-gray-100 text-md leading-6 mt-10">{product.description}</p>
                  </div>
                  <button
                     disabled={isCreatingCheckoutSession}
                     onClick={handleByyProduct}
                     className="w-full bg-green-500 rounded-lg text-white text-md font-bold text-center p-5 block mt-auto disabled:cursor-not-allowed disabled:opacity-60 trainsition-all [&:not(:disabled)]:hover:bg-green-300">
                     Comprar agora
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}

export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: [
         { params: { id: 'prod_OZCyWtaw6mJ6qt' } },
         { params: { id: 'prod_OZCy6PmiOQUWTY' } },
         { params: { id: 'prod_OZCxbmpft6rcR3' } },
         { params: { id: 'prod_OZCxBp1CcD4CTw' } },
      ],
      fallback: true,
   }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
   const productId = params?.id

   if (!params || !params.id) {
      return {
         notFound: true,
      }
   }

   const product = await stripe.products.retrieve(productId!, {
      expand: ['default_price'],
   })

   const price = product.default_price as Stripe.Price

   return {
      props: {
         product: {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-BR', {
               style: 'currency',
               currency: 'BRL',
            }).format(price.unit_amount! / 100),
            description: product.description,
            defaultPriceId: price.id,
         },
      },
      revalidate: 60 * 60 * 1,
   }
}
