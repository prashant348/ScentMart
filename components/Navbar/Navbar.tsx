"use client"

import { Menu } from "lucide-react"
import { ArrowDownToLineIcon } from "lucide-react"
import { LogIn, ShoppingBag, ArrowUpRightFromSquareIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useState } from "react"
import { LayoutDashboard } from "lucide-react"
interface SidebarButton {
    name: string
    icon: React.ReactNode
    onClick?: () => void
}
export default function Navbar() {

    const [windowInnerWidth, setWindowInnerWidth] = useState<number>(window.innerWidth);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const SidebarButtons: SidebarButton[] = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard size={18} />,
            onClick: () => redirect("/dashboard")
        },
        {
            name: "Log In",
            icon: <LogIn size={18} />,
            onClick: () => redirect("/signin")
        },
        {
            name: "Shop Now",
            icon: <ShoppingBag size={18} />,
            onClick: () => redirect("/signin")
        },
        {
            name: "Download App",
            icon: <ArrowDownToLineIcon size={18} />,
        },
        {
            name: "About Us",
            icon: <ArrowUpRightFromSquareIcon size={18} />,
            onClick: () => redirect("/about")
        },
    ]


    useEffect(() => {

        const handleResize = () => {
            setWindowInnerWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return (
        <div className="relative w-full h-16 bg-[#0f0f0f] flex items-center px-10 justify-between">
            <div className="font-bold text-2xl">
                ScentMart
            </div>

            {windowInnerWidth > 640 ? <div className="flex gap-4">
                <div className="">
                    <button
                        className="flex gap-1 items-center p-2 border cursor-pointer"
                        onClick={() => redirect("/signin")}
                    >
                        <span>
                            <LogIn size={18} />
                        </span>
                        <span className="font-bold">
                            Log In
                        </span>
                    </button>
                </div>
                <div>
                    <button className="flex gap-1 items-center p-2 border cursor-pointer">
                        <span>
                            <ArrowDownToLineIcon size={18} />
                        </span>
                        <span className="font-bold">
                            Download App
                        </span>
                    </button>
                </div>
            </div>
                :
                <div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu />
                    </button>
                </div>
            }

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="sidebar-wrapper h-full w-full bg-transparent fixed top-0 left-0 flex justify-end"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <div
                        className="sidebar py-10 w-60 h-full bg-[#1f1f1f]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col">
                            {SidebarButtons.map((btn, idx) => (
                                <button
                                    key={idx}
                                    className="w-full h-10 flex gap-3 justify-start items-center cursor-pointer pl-3 hover:bg-[#2f2f2f] font-semibold active:bg-[#2f2f2f]"
                                    onClick={btn.onClick}
                                >
                                    <span>{btn.icon}</span>
                                    <span>{btn.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
