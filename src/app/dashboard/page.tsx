import React from 'react'
import { auth, currentUser } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import DashboardContent from '@/components/modules/DashboardContent'

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    redirect('/sign-in')
  }

  // Obtener datos extendidos de nuestra DB Neon
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      orders: true,
      subscriptions: true
    }
  })

  const userData = {
    firstName: user.firstName,
    email: user.emailAddresses[0].emailAddress
  }

  return (
    <DashboardContent 
      user={userData} 
      userId={userId} 
      dbUser={dbUser} 
    />
  )
}
