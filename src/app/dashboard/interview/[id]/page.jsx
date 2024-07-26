'use client'
/* eslint-disable react/no-unescaped-entities */ 
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Lightbulb, LucideLoader2, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getInterviewDetails } from "../../../../../utils/db";

function Interview({ params }) {
  const [interViewDetails, setInterViewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
console.log(params.id)
  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        
        const result = await getInterviewDetails(params.id);
        
        // Assuming getInterviewDetails returns an array and you want the first item
        if (result) {
          
          setInterViewDetails(result);
        } else {
          console.error("No interview details found.");
        }
      } catch (error) {
        console.error("Error fetching interview details:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchInterviewData();
  }, [params.id]);
  
 
  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's get started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {loading ? (
          <div className="flex flex-col my-5 gap-5 justify-center">
            <LucideLoader2 className="mt-5 animate-spin" />
            <h2>Loading Details</h2>
          </div>
        ) : interViewDetails ? (
          <div className="flex flex-col my-5 gap-5">
            <div className="flex flex-col p-5 gap-5 rounded-lg border">
              <h2 className="text-lg">
                <strong>Job Role/Job Position:</strong> {interViewDetails.jobPosition}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description/Tech stack:</strong> {interViewDetails.jobDesc}
              </h2>
              <h2 className="text-lg">
                <strong>Years of experience:</strong> {interViewDetails.jobExperience}
              </h2>
            </div>

            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
              <h2 className="flex gap-2 items-center text-yellow-500">
                <Lightbulb />
                <strong>Information</strong>
              </h2>
              <h2 className="mt-3 text-yellow-700">
                Begin your AI mock interview by enabling your webcam and microphone. This interview consists of 5 questions designed to simulate a real interview experience. After answering the questions, you will receive a detailed report based on your responses. Rest assured, we prioritize your privacy: your video is never stored or recorded.
              </h2>
            </div>
          </div>
        ) : (
          <div className="flex flex-col my-5 gap-5 justify-center">
            <h2>Error fetching interview details.</h2>
            {/* Optionally add a retry button or error message handling */}
          </div>
        )}

        <div>
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button onClick={() => setWebcamEnabled(true)}>
                Enable Webcam and microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${params.id}/start`}>
          <Button className="bg-purple-800 hover:bg-purple-800">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;


