"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession, generateResponse } from "../../../../utils/geminiAiModel";
import { LoaderCircle } from "lucide-react";
import { json } from "drizzle-orm/mysql-core";
import { useEffect } from "react";
import { db, submitDataToDatabase } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import Error from "next/error";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExp, setJobExp] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState();
  const user = useUser();
  const email = user?.user?.primaryEmailAddress?.emailAddress;
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const inputPrompt = `job Position: ${jobPosition}, Job description: ${jobDesc}, Years of experience:${jobExp}. depends upon this info give me 5 questions and answrs.give me question and answer in json format`;
      const result = await generateResponse(inputPrompt);
      console.log(result);
      setJsonResponse(result);

      const res = await submitDataToDatabase(
        email,
        result,
        jobPosition,
        jobDesc,
        jobExp
      );
      console.log("id= ", res);

      router.push(`/dashboard/interview/${res[0]?.mockId}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error.message);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary 
        hover:scale-105 hover:shadow-sm cursor-pointer 
        transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about the job you are Interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your job position/role,job description and
                    years of experience
                  </h2>
                  <div className="mt-7 my-2">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label>Job Description/ Tech Stack (In short)</label>
                    <Textarea
                      placeholder="Ex. React,Angular,Nodejs etc"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label>Years of expeerience</label>
                    <Input
                      type="number"
                      placeholder="Ex.5"
                      max="50"
                      required
                      onChange={(event) => setJobExp(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
