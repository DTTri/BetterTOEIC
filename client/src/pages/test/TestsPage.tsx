// This is just a stub code (mock code)
import Logo from '../../assets/Logo_BetterTOEIC.png';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Part7QuestionGroup from '@/components/test/Part7QuestionGroup';
import Question from "@/components/test/Question";
import Timer from "@/components/test/Timer";
export default function TestsPage() {
  const headingText = "Thư viện đề thi theo đúng chuẩn ETS";
  return (
      <div className="bg-background flex flex-col gap-4 items-center py-8">
        <Part7QuestionGroup
          paragraphs={[
          `Summer Lecture Series
Sponsored by the Department of City Planning at Wurnster University

The Department of City Planning is excited to announce a summer lecture series that will be focusing on budgeting issues that concern local residents and municipalities. Financial management is one of the most important duties of local government's operations. We hope to improve the status of budgeting at the local government level across the nation through community involvement and participation. All lectures will be held in the Hayston Building on the Wurnster campus.

> Monday, February 1, 6:00 P.M., Room 401
Speaker:Tim Powell, Professor of Policy Analysis at Wurnster University
Strategic Planning —Learn how to develop budgets in order to monitor progress toward community goals and successful outcomes.

> Wednesday, February 3, 7:00 P.M., Room 305
Speaker: Melissa Simmons, Kennedy Institute for Policy Making
Focusing on Our Children —Studies show that building playgrounds and sports facilities for children helps make better communities.

> Monday, February 8, 6:00 P.M., Room 202
Speaker: Hank Ross, Michigan Municipal League
Managing Our County's Parks —Learn how to preserve our local parks as a valuable community resource.

> Wednesday, February 10, 5:30 P.M., Room 404
Speaker: Scott Watson, Executive Director, Local Government Academy
Economic Opportunities and Local Ecology —Economic opportunity is often accompanied by potential risks to the surrounding ecosystem, and balancing the two can be difficult.

Please contact Patricia Flores at pfloresiawurnster.edu for additional information.

==============================

To: Patricia Flores
From: Jake Pattersonjpatterson@wurnster.edu
Subject: Lecture Series
Date: January 24

Dear Ms. Flores,

I work for Facilities Management here at Wurnster University. It was recently brought to my attention that there is a scheduling conflict concerning one of your lecture dates. Room 305 has been reserved for every Wednesday this semester by the Wurnster Debate Club. Therefore, I’m sorry to inform you that you will need to move the location or the time of this talk. You can visit the facilities management website in order to check the availability of other room locations and reschedule the talk.`, 'heheehhe']}
          strImg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSjLQFw439cspPq0kd9y7sy67tczhL67tnhg&s'
          questions={[
            { questionNum: 1, questionText: 'câu 1', options: ["Option A", "Option B", "Option C", "Option D"] },
            { questionNum: 2, questionText: 'câu 2', options: ["Option A", "Option B", "Option C", "Option D"] },
          ]}
        />
    </div>
  );
}