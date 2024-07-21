"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../../../../../utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "../../../../../../utils/schema";
import QuetionSection from "./_components/QuetionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

function StartInterview({ params }) {
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [interViewDetails, setInterViewDetails] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  useEffect(() => {
    console.log(params.id);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.id));
    console.log(result[0]);
    setInterViewDetails(result[0]);
    setMockInterviewQuestion(JSON.parse(result[0].jsonMockResp));
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <QuetionSection
          activeQuestion={activeQuestion}
          mockInterviewQuestion={mockInterviewQuestion}
        />
        <RecordAnswerSection />
      </div>
    </div>
  );
}

export default StartInterview;
