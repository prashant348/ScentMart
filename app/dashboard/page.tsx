import { ProtectedRoute } from "@/routes/ProtectedRoute"

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <div>
                <h1>Dashboard</h1>
            </div>
        </ProtectedRoute>
    )
}