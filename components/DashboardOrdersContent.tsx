
interface Order {
    id: string
    status: string
    total_amount: number
    created_at: string
}

export default function DashboardOrdersContent(
    { orders }: { orders: Order[] }
) {
    return (
        <div>
            <div>
                Your Orders
            </div>
            <ul>
                {orders.map(order => {
                    return (
                        <li key={order.id} className="flex gap-2 p-1">
                            <span>{order.id}</span>
                            <span>{order.status}</span>
                            <span>{order.total_amount}</span>
                            <span>{order.created_at}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
