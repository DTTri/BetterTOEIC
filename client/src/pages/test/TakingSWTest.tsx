import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sUser, swTestStore } from "@/store";
import { swTestService } from "@/services";
import { toast } from "react-toastify";
import LoadingProgress from "@/components/LoadingProgress";
import TestNavigator from "@/components/SWtest/TestNavigator";

import http from "@/services/http";

export default function TakingSWTest() {
  const { id } = useParams();
  const userId = sUser.use((state) => state.info._id);
  const nav = useNavigate();
  const testData = swTestStore
    .use((pre) => pre.swTestList)
    .find((test) => test._id === id);
  const [isLoading, setIsLoading] = useState(false);

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const blobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: blob.type });
  };

  const handleComplete = async (results: {
    speakingRecordings: Blob[];
    writingAnswers: string[];
  }) => {
    if (!id || !userId) {
      toast.error("Missing test ID or user ID");
      return;
    }

    try {
      setIsLoading(true);
      toast.info("Processing your answers...");

      const audioUploadPromises = results.speakingRecordings.map(
        async (blob, index) => {
          try {
            const fileName = `speaking_q${index + 1}_${Date.now()}.webm`;
            const file = blobToFile(blob, fileName);

            const response = await http.get(
              `file/presigned-url?fileName=${file.name}&contentType=${file.type}`
            );

            if (!response || !response.presignedUrl) {
              throw new Error("Failed to get presigned URL");
            }

            const result = await fetch(response.presignedUrl, {
              method: "PUT",
              headers: {
                "Content-Type": file.type,
              },
              body: file,
            });

            if (!result.ok) {
              throw new Error("Failed to upload audio file");
            }

            return "https://seuit-qlnt.s3.amazonaws.com/" + response.key;
          } catch (error) {
            console.error(`Error uploading audio file ${index + 1}:`, error);
            return convertBlobToBase64(blob);
          }
        }
      );

      const audioUrls = await Promise.all(audioUploadPromises);

      const answers = [...audioUrls, ...results.writingAnswers];

      const completeSWTestDTO = {
        testId: id,
        answers: answers,
      };

      const response = await swTestService.completeSWTest(
        userId,
        completeSWTestDTO
      );

      if (response.EC === 0) {
        toast.success("Test submitted successfully!");
        nav(`/test`);
      } else {
        toast.error(response.EM || "Failed to submit test");
      }
    } catch (error) {
      console.error("Error completing test:", error);
      toast.error("Failed to submit test");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingProgress />;
  }

  if (!testData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Test not found or failed to load</p>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="max-w-[1500px] content py-2 px-10 m-auto overflow-hidden">
        <TestNavigator
          questions={testData.questions}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
