"use client"

import Image from 'next/image'
import dirhamScentImage from "@/assets/dirham-scent.jpeg";
import gucciScentImage from "@/assets/gucci-scent.jpeg";
import jaguarScentImage from "@/assets/jaguar-scent.jpeg";
import noirScentImage from "@/assets/noir-scent.jpeg";
import Footer from '../Footer/Footer';
import { redirect } from 'next/navigation';

interface Product {
    id: string
    name: string
    price: number
}

export default function ScentCollection(
    { products }: { products: Product[] }
) {
    const dummyProducts = [
        {
            name: "Dirham",
            price: 199,
            img: dirhamScentImage
        },
        {
            name: "Jaguar",
            price: 99,
            img: jaguarScentImage
        },
        {
            name: "Gucci",
            price: 299,
            img: gucciScentImage
        },
        {
            name: "Noir",
            price: 149,
            img: noirScentImage
        }
    ]

    return (
        <div className=' overflow-y-auto h-[calc(100vh-96px)]'>
            <div className='p-4 flex flex-wrap gap-4 justify-center'>
                {products.map((product, index) => (
                    <div
                        key={index}
                        className='h-90 w-90 rounded-2xl p-5 bg-[#1f1f1f] flex flex-col gap-2'
                    >
                        <div className='bg-[#2f2f2f] rounded-xl h-full w-full overflow-hidden'>
                            <Image
                                src={dirhamScentImage}
                                alt='dirhma-scent-image'
                                className='h-full w-full'
                            />
                        </div>
                        <div className='flex justify-between font-bold text-xl'>
                            <span>{product.name}</span>
                            <span>{product.price} ₹</span>
                        </div>
                        <div className='flex gap-2 justify-between w-full font-semibold'>
                            {/* <button 
                            className='p-2 rounded-lg bg-amber-700 w-full'
                        >
                            Add to cart
                        </button> */}
                            <button
                                className='p-2 rounded-lg bg-amber-600 w-full active:bg-amber-700'
                                onClick={() => redirect("/signin")}
                            >
                                Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />

        </div>
    )
}
