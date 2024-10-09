// This is just a stub code (mock code)
import Logo from '../../assets/Logo_BetterTOEIC.png';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Part7QuestionGroup from '@/components/test/Part7QuestionGroup';
import Question from "@/components/test/Question";
import TestCard from '@/components/test/TestCard';
import Timer from "@/components/test/Timer";
export default function TestsPage() {
  const headingText = "Thư viện đề thi theo đúng chuẩn ETS";
  return (
      <div className="bg-background flex flex-col gap-4 items-center py-8">
        <TestCard imgTestCard='https://images.unsplash.com/photo-1726855500757-658894d298eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D' titleTestCard='New Economy TOEIC Test 1'></TestCard>
      </div>
  );
}