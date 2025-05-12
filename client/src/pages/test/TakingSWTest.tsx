import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sUser } from "@/store";
import { swTestService } from "@/services";
import { toast } from "react-toastify";
import { SWTest } from "@/entities";
import LoadingProgress from "@/components/LoadingProgress";
import TestNavigator from "@/components/SWtest/TestNavigator";

import http from "@/services/http";

export default function TakingSWTest() {
  const { id } = useParams();
  const userId = sUser.use((state) => state.info._id);
  const nav = useNavigate();
  const [testData, setTestData] = useState<SWTest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestData = async () => {
      if (!id) return;
      try {
        const response = await swTestService.getSWTestById(id);
        if (response.EC === 0) {
          setTestData(response.DT);
        } else {
          toast.error(response.EM || "Failed to fetch test data");
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
        toast.error("Failed to fetch test data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestData();
  }, [id]);

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Convert Blob to File for upload
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

      // Upload audio recordings to S3
      const audioUploadPromises = results.speakingRecordings.map(
        async (blob, index) => {
          try {
            // Convert Blob to File with a unique name
            const fileName = `speaking_q${index + 1}_${Date.now()}.webm`;
            const file = blobToFile(blob, fileName);

            // Get presigned URL from server
            const response = await http.get(
              `file/presigned-url?fileName=${file.name}&contentType=${file.type}`
            );

            if (!response || !response.presignedUrl) {
              throw new Error("Failed to get presigned URL");
            }

            // Upload file to S3
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

            // Return the S3 URL
            return "https://seuit-qlnt.s3.amazonaws.com/" + response.key;
          } catch (error) {
            console.error(`Error uploading audio file ${index + 1}:`, error);
            // Fallback to base64 if upload fails
            return convertBlobToBase64(blob);
          }
        }
      );

      // Wait for all uploads to complete
      const audioUrls = await Promise.all(audioUploadPromises);

      // Combine speaking and writing answers
      const answers = [...audioUrls, ...results.writingAnswers];

      // Create the DTO
      const completeSWTestDTO = {
        testId: id,
        answers: answers,
      };

      // Submit the test
      const response = await swTestService.completeSWTest(
        userId,
        completeSWTestDTO
      );

      if (response.EC === 0) {
        toast.success("Test submitted successfully!");
        nav(`/swtest/${id}`); // Navigate to test details page
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
