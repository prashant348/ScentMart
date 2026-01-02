"use client"

import { Menu } from "lucide-react"
import { ArrowDownToLineIcon, ShoppingCart, LogOut, } from "lucide-react"
import { ArrowUpRightFromSquareIcon, User } from "lucide-react"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useState } from "react"
import { UserButton } from "@clerk/nextjs"

interface SidebarButton {
    name: string
    icon: React.ReactNode
    onClick?: () => void
}
export default function DashboardNavbar() {

    const [windowInnerWidth, setWindowInnerWidth] = useState<number>(window.innerWidth);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const sidebarButtons: SidebarButton[] = [
        {
            name: "My Orders",
            icon: <ShoppingCart size={18} />,
            onClick: () => redirect("/dashboard/orders")
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

    const navbarButtons = sidebarButtons;


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

            {windowInnerWidth > 640 ?
                <div className="flex gap-4">
                    {navbarButtons.map((button, index) => (
                        <button
                            key={index}
                            className="flex gap-1 items-center p-2 border cursor-pointer"
                            onClick={button.onClick}
                        >
                            <span>
                                {button.icon}
                            </span>
                            <span className="font-bold">
                                {button.name}
                            </span>
                        </button>
                    ))}
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
                        className="sidebar w-60 h-full bg-[#1f1f1f] border-l border-l-[#5f5f5f]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className=" flex items-center justify-end p-5 mb-1 border-b border-b-[#5f5f5f]">
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: {
                                            width: "48px",
                                            height: "48px"
                                        },
                                        popoverBox: {
                                            width: window.innerWidth <= 640 ? "274px" : ""
                                        },
                                    }
                                }} />
                        </div>
                        <div className="flex flex-col">
                            {sidebarButtons.map((btn, idx) => (
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
