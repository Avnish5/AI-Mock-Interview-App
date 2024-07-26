"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../../../../../utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "../../../../../../utils/schema";
import QuetionSection from "./_components/QuetionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";


function StartInterview({ params }) {
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [interViewDetails, setInterViewDetails] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  useEffect(() => {
    console.log(params.id);
    GetInterviewDetails();
  }, [params.id]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.id));

    const temp = JSON.parse(result[0].jsonMockResp);
    setInterViewDetails(result[0]);
    setMockInterviewQuestion(temp);
    //   setMockInterviewQuestion(result[0].map(jsonString => JSON.parse(jsonString)))
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <QuetionSection
          activeQuestion={activeQuestion}
          mockInterviewQuestion={mockInterviewQuestion}
        />
        <RecordAnswerSection
          activeQuestion={activeQuestion}
          mockInterviewQuestion={mockInterviewQuestion}
          interViewDetails={interViewDetails}
        />
      </div>

      <div className="flex justify-end gap-6">
       {activeQuestion>0&& <Button onClick={()=>setActiveQuestion(activeQuestion-1)}>Previous Question</Button>}
       {activeQuestion!=mockInterviewQuestion?.length-1&&<Button onClick={()=>setActiveQuestion(activeQuestion+1)}>Next Question</Button>}
        <Link href={'/dashboard/interview/'+interViewDetails?.mockId+"/feedback"}>
        {activeQuestion==mockInterviewQuestion?.length-1&&<Button>End Interview</Button>}
        </Link>
      </div>
    </div>
  );
}

export default StartInterview;
