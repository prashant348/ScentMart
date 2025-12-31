"use client";

// import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { addProduct } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";

interface Product {
    id: string
    name: string
    price: number
}

export default function DashboardContent({ products }: { products: Product[] }) {

    // const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    const { user } = useUser();
    if (!user) return;
    const fullName = `${user.firstName} ${user.lastName}`;
    const router = useRouter();

    return (
        <div>
            <div>
                <h1>Welcome to Dashboard, {fullName}</h1>
            </div>
            <div>
                <form action={addProduct}>
                    <input type="text" placeholder="scent name" name="name" />
                    <input type="number" placeholder="scent price" name="price" />
                    <button>Add</button>
                </form>
            </div>
            <div className="h-50 w-75 bg-[#0f0f0f]">
                <h2>Products</h2>
                <button 
                onClick={() => {
                    // Refreshes the current route, making a new request to the server, re-fetching data, and re-rendering server components, while attempting to preserve client-side React state (e.g., useState hooks).
                    router.refresh()
                }} 
                className="cursor-pointer"
                >
                    Refresh
                </button>
                <ul className="w-full overflow-y-auto">
                    {products?.map((product: Product) => (
                        <li key={product.id} className="h-12 w-full bg-[#1f1f1f] flex justify-between">
                            <span>{product.name}</span>
                            <span>{product.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}