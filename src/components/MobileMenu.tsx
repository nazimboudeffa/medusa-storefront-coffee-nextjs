import Link from "next/link"

export default function MobileMenu ({ open }) {
    return (
        <div className={`${open? "block" : "hidden"} flex flex-col`}>
            <Link href="/products">
                <span className="block h-16 border-t border-gray-100 leading-[4rem] pl-3">
                Products
                </span>
            </Link>
            <Link href="">
                <span className="block h-16 border-t border-gray-100 leading-[4rem] pl-3">
                News
                </span>
            </Link>
        </div>
    )
}