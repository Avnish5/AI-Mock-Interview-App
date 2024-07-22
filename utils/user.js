'use client'
import { useUser } from "@clerk/nextjs"

const user=useUser();

export const userEmail=user?.user?.primaryEmailAddress?.emailAddress;