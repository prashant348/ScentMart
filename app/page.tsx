import Navbar from "@/components/Navbar/Navbar"
import Link from "next/link"
import ScentCollection from "@/components/ScentCollection/ScentCollection"
import { fetchProducts } from "./dashboard/actions"

export default async function page() {

  const products = (await fetchProducts()) ?? [];
  return (
    <div className="">
      <Navbar />

      <div className="w-full h-8 flex gap-1 justify-center items-center text-sm font-sans bg-[#161616]">
        New to ScentMart? 
        <Link href={"/signup"}>
          <span className="text-blue-500 underline">
            Sign up
          </span>
        </Link> 
        here
      </div>

      <ScentCollection products={products} />

    </div>
  )
}
