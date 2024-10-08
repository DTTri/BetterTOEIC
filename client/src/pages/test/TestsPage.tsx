// This is just a stub code (mock code)
import Logo from '../../assets/Logo_BetterTOEIC.png';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Question from "@/components/test/Question";
import Timer from "@/components/test/Timer";
export default function TestsPage() {
  const headingText = "Thư viện đề thi theo đúng chuẩn ETS";
  return (
    <div className="bg-background flex flex-col gap-4 items-center py-8">
      <Question strImg='https://s3-alpha-sig.figma.com/img/c5d6/8db4/44921c26dafe9eabb4301d60860fde72?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BPAynaxS57p-moEPI7K1~OivmyKsph15UCNlBqEP~iiIP3JmUhrAxS-GPA3XNTQBqV6mPW8V~08pdhyG6Kkl5S78YL7l9xeohI03iF65mt3FORc1job6QHVQHe7R6JWoCfb2yzM-IRaYDN~DeO7FZUzQ5Rg3xRWzfsqtyFGwRafM9qZTMbmE3bkM~9ubes3kfocRIHBZGep-7Ez0FiUnqRuRknAN5jxbID-TYcG2KwT2EU6wGVyrPWxx0Pg0MjZGTQSsuzxt1spizNXRRY~1fMLw4I3CeuyR46v~oiSDvl2WYqD-8ELOCqZ9mBQhSqkcaLFp3IYFJLUnzNt051LdBQ__' questionNum={1}/>
    </div>
  );
}