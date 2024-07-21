import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuetionSection({ mockInterviewQuestion, activeQuestion }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry your browser does not support text to speech");
    }
  };
  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                className={`p-2 bg-secondary rounded-full cursor-pointer 
                text-center text-xs md:text-sm
                ${activeQuestion == index && ` bg-purple-800 text-white`}`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-sm md:text-lg">
          {mockInterviewQuestion[activeQuestion]?.question}
        </h2>

        <Volume2 className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestion]?.question)
          }
        />

        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
          <h2 className="flex gap-2 items-center text-blue-700">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm my-2 text-purple-800">
            Click on 'Record Answer' when you're ready to respond to each
            question. At the conclusion of the interview, we'll provide
            feedback, including the correct answer for each question and a
            comparison between your answer and the correct one
          </h2>
        </div>
      </div>
    )
  );
}

export default QuetionSection;
