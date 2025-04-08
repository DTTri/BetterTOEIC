import TestNavigator from '@/components/SWtest/TestNavigator'
import templateSWTestData from '@/data/SWTestData';

export default function TakingSWTest() {
    const testData = templateSWTestData;
    const handleComplete = (results: {
        speakingRecordings: Blob[];
        writingAnswers: string[];
    }) => {
        console.log(results);
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
  )
}
