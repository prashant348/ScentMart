import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { currentUser } from "@clerk/nextjs/server";
import { fetchProducts } from "./actions";
import DashboardContent from "@/components/DashboardContent";
import Link from "next/link";

export default async function Dashboard() {

   const user = await currentUser();

   if (!user) return (
    <div className="w-full h-full flex gap-2">
      <h1>You are not signed in!</h1>
      <div>
        <Link 
            href={"/dashboard"} 
             className="text-blue-500 active:underline hover:underline"
        >
            Sign in
        </Link>
      </div>
    </div>
   )

    const products = (await fetchProducts()) ?? [];
    return (
        <ProtectedRoute>
            <DashboardContent products={products} />
        </ProtectedRoute>
    )
}