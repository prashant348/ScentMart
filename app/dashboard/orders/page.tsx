import { fetchOrders } from "../actions"
import DashboardOrdersContent from "@/components/DashboardOrdersContent"

export default async function page() {

  const orders = (await fetchOrders()) ?? []
  console.log("orders: ", orders)
  return (
    <div>
      <DashboardOrdersContent orders={orders} />
    </div>
  )
}
