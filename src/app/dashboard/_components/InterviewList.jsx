"use client";
import React, { useState, useEffect } from "react";
import { getInterviewList} from "../../../../utils/db";
import { useUser } from "@clerk/nextjs";
import InterviewItemCard from "./InterviewItemCard";
import { db } from "../../../../utils/db";
import { eq, desc } from "drizzle-orm";
import { MockInterview } from "../../../../utils/schema";
import { toast } from "sonner";
import { Loader2Icon, LoaderCircle, LoaderIcon } from "lucide-react";
import Loadable from "next/dist/shared/lib/loadable.shared-runtime";
import { deleteInterview } from "../../../../utils/db";
function InterviewList() {
  const user = useUser();
  const userEmail = user?.user?.primaryEmailAddress?.emailAddress;
  const [interviewList, setInterviewList] = useState();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (userEmail) {
      fetchInterviewList();
    }
  }, [userEmail]);

  const fetchInterviewList = async () => {
    try {
      setIsLoading(true);
      const list = await getInterviewList(userEmail);
      setInterviewList(list);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching interview list:", error);
      toast.error("There is some error.Please try again")
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInterview(id);
      setInterviewList(prevList => prevList.filter(interview => interview.id !== id));
      toast.success("Interview deleted successfully");
    } catch (error) {
      console.error("Failed to delete interview:", error);
      toast.error("Error while deleting the interview");
    }
  };
  
  return (
    <div >
      {isLoading ? (
        <h2 className="font-bold text-lg"><LoaderCircle className="animate-spin"/> Loading </h2>
      ) : interviewList&&interviewList.length === 0 ? (
        <h2 className="font-bold text-lg">Create your first Mock Interview</h2>
      ) : (
        <h2 className="font-bold text-lg">Previous Mock Interviews</h2>
      )}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
     {interviewList && interviewList.length > 0 && (
  interviewList.map((interview, index) => (
    <InterviewItemCard interview={interview} onDelete={handleDelete} key={index} />
  ))
)}
     </div>



    </div>
  );
}

export default InterviewList;
