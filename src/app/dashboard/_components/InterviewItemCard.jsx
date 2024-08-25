import { Button } from "@/components/ui/button";
import { Delete, DeleteIcon, LucideDelete, RemoveFormatting, RemoveFormattingIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { toast } from "sonner";

function InterviewItemCard({ interview,onDelete }) {
  
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

 

  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };
  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-purple-900">{interview?.jobPosition}</h2>
      <h2 className="text-gray-500">
        {interview?.jobExperience} Years of experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At: {interview.createdAt}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <Button
          onClick={onFeedback}
          size="sm"
          variant="outline"
          className="w-full"
        >
          Feedback
        </Button>
        <Button onClick={onStart} size="sm" className="w-full">
          Start
        </Button>

        <Button onClick={()=>onDelete(interview.id)} size="sm" className=" bg-red-500 hover:bg-red-600">
          Remove
        </Button>

        
      </div>
    </div>
  );
}

export default InterviewItemCard;
