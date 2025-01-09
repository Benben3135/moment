import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { HomeContent } from "@/components/HomeContent"

export default async function Home() {
  const user = await currentUser()

  if (user) {
    redirect('/dashboard')
  }

  return <HomeContent />
}