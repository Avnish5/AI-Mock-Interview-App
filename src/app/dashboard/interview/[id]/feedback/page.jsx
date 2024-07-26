'use client'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../../utils/db'
import { UserAnswer } from '../../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'


function Feedback({params}) {
  
  const[feedbackList,setfeedbackList]=useState(null);
  useEffect(()=>{
    getFeedback();
  },[])

  const getFeedback=async()=>{
    const result=await db.select()
                         .from(UserAnswer)
                         .where(eq(UserAnswer.mockIdRef,params.id))
                         .orderBy(UserAnswer.id)

    console.log(result)
    setfeedbackList(result)
  }

  
  return (
    <div className='p-10'>
       {feedbackList && feedbackList.length > 0 && (
        <>
          <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
          <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
          <h2 className='text-lg my-3 text-purple-800'>Your overall rating:<strong>7/10</strong></h2>
          <h2 className='text-sm text-gray-500'>Find below interview questions with correct answers, your answers, and feedback for improvement</h2>

        </>
      )}

     
      {feedbackList && feedbackList.length > 0 ? (
        feedbackList.map((item, index) => (
          <Collapsible className="mt-7" key={index}>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-10 w-full'>{item.question} <ChevronsUpDown className='h-5 w-5'/></CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
                <h2 className='bg-red-50 p-2 border rounded-lg text-sm text-red-900'><strong>User Answer:</strong>{item.userAns}</h2>
                <h2 className='bg-green-50 p-2 border rounded-lg text-sm text-green-900'><strong>Correct Answer:</strong>{item.correctAns}</h2>
                <h2 className='bg-blue-50 p-2 border rounded-lg text-sm text-purple-800'><strong>Feedback:</strong>{item.feedback}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))
       
       
      ) : (
        <div className="mt-7 text-center text-gray-500">
          <p>Sorry, you have not submitted any answers for this interview yet, so there is no feedback available.</p>
        </div>
      )}
      <Link href={'/dashboard'}>
      <Button>Go Home</Button>
      </Link>
    </div>
  )
}

export default Feedback