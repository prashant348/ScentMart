import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { currentUser } from "@clerk/nextjs/server";
// import { addProduct } from "./actions";
import { fetchProduts } from "./actions";
import DashboardContent from "@/components/DashboardContent";

// interface Product {
//     id: string;
//     name: string;
//     price: number;
// }

export default async function Dashboard() {

   const user = await currentUser();

   if (!user) return <p>You are not signed in</p>

//    const fullName = `${user.firstName} ${user.lastName}`;
    const products = (await fetchProduts()) ?? [];
    return (
        <ProtectedRoute>
            {/* <div>
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
                <button onClick={fetchProduts} className="cursor-pointer">Refresh</button>
                <ul className="w-full overflow-y-auto">
                    {(await fetchProduts() as unknown as any[])?.map((product: Product) => (
                        <li key={product.id} className="h-12 w-full bg-[#1f1f1f] flex justify-between">
                            <span>{product.name}</span>
                            <span>{product.price}</span>    
                        </li>
                    ))}
                </ul>
            </div> */}
            <DashboardContent products={products} />
        </ProtectedRoute>
    )
}