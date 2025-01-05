import Link from "next/link"
import { UserButton } from "@clerk/nextjs"

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
      <nav className="space-y-4">
        <Link href="/dashboard" className="block py-2.5 px-4 rounded hover:bg-gray-800">
          Dashboard
        </Link>
        <Link href="/dashboard/courses" className="block py-2.5 px-4 rounded hover:bg-gray-800">
          Courses
        </Link>
        <div className="absolute bottom-4 left-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </aside>
  )
}