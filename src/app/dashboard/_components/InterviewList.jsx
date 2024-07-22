'use client'
import React from 'react'
import { getInterviewDetails, getInterviewList } from '../../../../utils/db'
import { useUser } from '@clerk/nextjs';
function InterviewList() {

    const user=useUser();
    const userEmail=user?.user?.primaryEmailAddress?.emailAddress;
    console.log(userEmail)
    const interViewList= getInterviewList(userEmail);
    console.log(interViewList);
  return (
    <div>
        <h2 className='font-bold text-lg'>Previous Mock Interview</h2>
    </div>
  )
}

export default InterviewList