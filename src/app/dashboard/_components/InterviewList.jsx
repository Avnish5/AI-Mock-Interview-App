"use client";
import React, { useState, useEffect } from "react";
import { getInterviewDetails } from "../../../../utils/db";
import { useUser } from "@clerk/nextjs";
import InterviewItemCard from "./InterviewItemCard";
import { db } from "../../../../utils/db";
import { eq, desc } from "drizzle-orm";
import { MockInterview } from "../../../../utils/schema";
function InterviewList() {
  const user = useUser();
  const userEmail = user?.user?.primaryEmailAddress?.emailAddress;
  const [interviewList, setInterviewList] = useState();
  console.log(userEmail);

  useEffect(() => {
    user && getInterviewList();
  }, [userEmail]);

  const getInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, userEmail))
      .orderBy(desc(MockInterview.id));

    setInterviewList(result);

    console.log(result);
  };
  return (
    <div>
      <h2 className="font-bold text-lg">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
      {interviewList &&
        interviewList.map((interview, index) => <InterviewItemCard interview={interview} key={index}/>)}
      </div>
    </div>
  );
}

export default InterviewList;
