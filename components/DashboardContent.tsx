"use client";

// import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { addProduct } from "@/app/dashboard/actions";
import { createOrder } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Product {
    id: string
    name: string
    price: number
}

export default function DashboardContent({ products }: { products: Product[] }) {

    // const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    // A Record type is a built-in utility that constructs a new object type with a specified key type and value type
    const [ counts, setCounts ] = useState<Record<string, number>>({ });
    const { user } = useUser();
    if (!user) return null;
    const fullName = `${user.firstName} ${user.lastName}`;
    const router = useRouter();

    const increment  = (id: string) => {
        setCounts(prev => ({...prev, [id]: (prev[id] || 0) + 1}));
    }

    const decrement = (id: string) => {
        setCounts(prev => ({...prev, [id]: Math.max(0, (prev[id] ?? 0) - 1)}));
    }
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
                <div className="flex gap-3">
                    <span>Name</span>
                    <span>Price</span>
                    <span>OrderBtn</span>
                </div>
                <ul className="w-full overflow-y-auto">
                    {products?.map((product: Product) => (
                        <li key={product.id} className="h-12 w-full bg-[#1f1f1f] flex justify-between">
                            <span>{product.name}</span>
                            <span>{product.price}</span>
                            <span className="flex items-center">
                                <button onClick={() => decrement(product.id)}>-</button>
                                <span>{counts[product.id] ?? 0}</span>
                                <button onClick={() => increment(product.id) }>+</button>
                            </span>
                            <span>
                                <button
                                    onClick={() => {
                                        if (!counts[product.id]) {
                                            console.log("plz select quantity to order");
                                            return;
                                        }
                                        createOrder(product.id, product.price, counts[product.id]);
                                    }}
                                    className="cursor-pointer"
                                >
                                    Order
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}