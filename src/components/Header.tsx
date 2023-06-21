"use client"
import { useState } from "react"
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Header () {
    
    const [open, setOpen] = useState<boolean>(false);

    return (
        <header className="border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <button type="button" className="p-2 lg:hidden" onClick={()=>setOpen(!open)}>
                    { open ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>                  
                    :
                    <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    </svg>                 
                    }
                </button>
                <Link href="/" className="flex">
                    <span className="sr-only">Logo</span>
                    <span className="inline-block h-10 w-32 rounded-lg bg-orange-500 text-white pl-10 pt-2">ACME</span>
                </Link>
                </div>

                <div className="flex flex-1 items-center justify-end gap-8">
                <nav
                    aria-label="Global"
                    className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-500"
                >
                    <a
                    href="#"
                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-orange-500"
                    >
                    About
                    </a>

                    <a
                    href="#"
                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-orange-500"
                    >
                    News
                    </a>

                    <a
                    href="/products"
                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-orange-500"
                    >
                    Products
                    </a>

                    <a
                    href="#"
                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-orange-500"
                    >
                    Contact
                    </a>
                </nav>

                <div className="flex items-center">
                    <div className="flex items-center border-x border-gray-100">
                    <span className="border-e border-e-gray-100">
                        <a
                        href="#"
                        className="grid h-16 w-16 place-content-center border-b-4 border-transparent hover:border-orange-500"
                        >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>

                        <span className="sr-only">Cart</span>
                        </a>
                    </span>

                    <span className="border-e border-e-gray-100">
                        <a
                        href="#"
                        className="grid h-16 w-16 place-content-center border-b-4 border-transparent hover:border-orange-500"
                        >
                        <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>

                        <span className="sr-only"> Account </span>
                        </a>
                    </span>

                    <span className="hidden sm:block">
                        <a
                        href="#"
                        className="grid h-16 w-16 place-content-center border-b-4 border-transparent hover:border-orange-500"
                        >
                        <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>

                        <span className="sr-only"> Search </span>
                        </a>
                    </span>
                    </div>
                </div>
            </div>
        </div>
        <MobileMenu open={open} />
    </header>
    )
}