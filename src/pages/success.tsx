import Image from 'next/image'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Head from 'next/head'

interface SuccessProps {
   customerName: string
   product: {
      name: string
      imageUrl: string
   }
}

export default function Success({ customerName, product }: SuccessProps) {
   return (
      <>
         <Head>
            <title>Compra efetuada | Ignite Shop</title>

            <meta name="robots" content="noindex" />
         </Head>
         <div className="flex flex-col items-center justify-center py-16">
            <h1 className="text-2xl font-bold text-gray-100">Compra efetuada!</h1>
            <div className="rounded-lg bg-gradient-to-b from-[#1EA483] to-[#7465D4] py-[1.25rem] flex items-center justify-center flex-1 max-w-full mt-16">
               <Image src={product.imageUrl} width={127} height={145} alt="" />
            </div>
            <p className="mt-8 text-gray-100 text-xl text-center w-full max-w-[36.875rem]">
               Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
            </p>
            <Link
               href="/"
               className="mt-[5.5rem] text-green-500 text-lg hover:text-green-300 font-bold"
               prefetch={false}>
               Voltar ao catálogo
            </Link>
         </div>
      </>
   )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   if (!query.session_id) {
      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      }
   }
   try {
      const sessionId = String(query.session_id)

      const session = await stripe.checkout.sessions.retrieve(sessionId, {
         expand: ['line_items', 'line_items.data.price.product'],
      })

      const customerName = session.customer_details?.name
      const product = session.line_items?.data[0].price?.product as Stripe.Product
      return {
         props: {
            customerName,
            product: {
               name: product.name,
               imageUrl: product.images[0],
            },
         },
      }
   } catch (err) {
      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      }
   }
}
