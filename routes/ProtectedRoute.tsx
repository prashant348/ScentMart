"use client"

import React from "react"
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ProtectedRouteProps {
    children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn } = useUser()

  if (!isSignedIn) redirect("/signin")

  return (
    <div>
      {children}
    </div>
  )
}