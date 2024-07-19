'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '../../../../utils/geminiAiModel';
  

function AddNewInterview() {

    const[openDialog,setOpenDialog]=useState(false);
    const[jobPosition,setJobPosition]=useState();
    const[jobDesc,setJobDesc]=useState();
    const[jobExp,setJobExp]=useState();

    const onSubmit=async (e)=>{
        const inputPrompt=`job Position: ${jobPosition}, Job description: ${jobDesc}, Years of experience:${jobExp}. depends upon this info give me 5 questions and answrs.give me question and answer in json format`
        const result=await chatSession.sendMessage(inputPrompt);
        const mockJsonResponse=result.response.text().replace('```json','').replace('```','')
        console.log(result.response.text())
    }

  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary 
        hover:scale-105 hover:shadow-sm cursor-pointer 
        transition-all'
        onClick={()=>setOpenDialog(true)}>
            <h2 className='text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDialog}>
  
  <DialogContent className="max-w-xl">
    <DialogHeader>
      <DialogTitle className="text-2xl">Tell us more about the job you are Interviewing</DialogTitle>
      <DialogDescription>
        <form action={onSubmit}>
        <div>
           
           <h2>Add details about your job position/role,job description and years of experience</h2>
            <div className='mt-7 my-2'>
               <label>Job Role/Job Position</label>
               <Input placeholder="Ex. Full Stack Developer" required
                onChange={(event)=>setJobPosition(event.target.value)}/>
            </div>

            <div className='my-3'>
               <label>Job Description/ Tech Stack (In short)</label>
               <Textarea placeholder="Ex. React,Angular,Nodejs etc" required
                onChange={(event)=>setJobDesc(event.target.value)}/>
            </div>

            <div className='my-3'>
               <label>Years of expeerience</label>
               <Input  type="number" placeholder="Ex.5" max="50" required
                onChange={(event)=>setJobExp(event.target.value)}/>
            </div>

       </div>
       <div className="flex gap-5 justify-end">
           <Button  type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
           <Button type="submit">Start Interview</Button>
       </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview