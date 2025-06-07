import Link from "next/link";

export default function Navbar() {
    return (
        <div className="w-full sticky top-0 flex justify-between items-center py-4 px-8 bg-background z-10">
            <div className="text-text text-2xl">
                Health Tech Initiative
            </div>
            <div className="space-x-4">
                <Link href="/" className="text-text hover:text-primary transition">Home</Link>
                <Link href="/data" className="text-text hover:text-primary transition">Data</Link>
                <Link href="/report" className="text-text hover:text-primary transition">Report</Link>
                <Link href="/testkits" className="text-text hover:text-primary transition">Test Kits</Link>
                <Link href="/data" className="text-text hover:text-primary transition">Resources</Link>
            </div>
        </div>
    )
}