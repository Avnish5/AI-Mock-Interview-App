import React, { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import {
  generateResponse,
  generateFeedbackResponse,
} from "../../../../../../../utils/geminiAiModel";
import { db } from "../../../../../../../utils/db";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import { UserAnswer } from "../../../../../../../utils/schema";
function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestion,
  interViewDetails,
}) {
  const [userAnswer, setUserAnswer] = useState("");

  const [loading,setLoading]=useState(false);
  const user = useUser();
  const email = user?.user?.primaryEmailAddress?.emailAddress;
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result.transcript)
    );
  }, [results]);

  useEffect(()=>{
    if(!isRecording&&userAnswer.length>10)
    {
      updateUserAnserIndb();
    }
  },[userAnswer])

  const startStopRecording = async () => {
    if (isRecording) {
     
      stopSpeechToText();
      //   if (userAnswer?.length < 10) {
      //     toast("There is an error while saving your answer.Please try again");
      //     return;
      //   }

      const feedbackPrompt =
        "Question: " +
        mockInterviewQuestion[activeQuestion]?.question +
        ", User Answer:" +
        userAnswer +
        ",Depends on question and user answer for the given interview question.Please give us rating for answer and feedback as area of improvment if any.In just 3-5 lines to improve it in JSON fromat with rating filed and feedback field";

      const result = await generateResponse(feedbackPrompt);
      const jsonResult=JSON.parse(result);
      console.log(jsonResult)
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interViewDetails?.mockId,
        question: mockInterviewQuestion[activeQuestion]?.question,
        correctAns: mockInterviewQuestion[activeQuestion]?.answer,
        userAns: userAnswer,
        feedback: jsonResult?.feedback,
        rating: jsonResult?.rating,
        userEmail: email,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      if (resp) {
        toast("User answer recorded successfully");
      }
  
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnserIndb=async()=>{
    setLoading(true)
    const feedbackPrompt =
        "Question: " +
        mockInterviewQuestion[activeQuestion]?.question +
        ", User Answer:" +
        userAnswer +
        ",Depends on question and user answer for the given interview question.Please give us rating for answer and feedback as area of improvment if any.In just 3-5 lines to improve it in JSON fromat with rating filed and feedback field";

      const result = await generateResponse(feedbackPrompt);
      const jsonResult=JSON.parse(result);
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interViewDetails?.mockId,
        question: mockInterviewQuestion[activeQuestion]?.question,
        correctAns: mockInterviewQuestion[activeQuestion]?.answer,
        userAns: userAnswer,
        feedback: jsonResult?.feedback,
        rating: jsonResult?.rating,
        userEmail: email,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      if (resp) {
        toast("User answer recorded successfully");
        setUserAnswer('')
        setResults([])
      }
      setResults([])

      setLoading(false)

  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt={"webcam"}
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button disabled={loading} onClick={startStopRecording} variant="outline" className="my-10">
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2 animate-pulse ">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          "Start Recording"
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show answer</Button>
    </div>
  );
}

export default RecordAnswerSection;
