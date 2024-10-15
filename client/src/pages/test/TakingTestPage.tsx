// This is just a stub code (mock code)
import { useState } from "react";
import Header from "../../components/Header";
import Timer from "../../components/test/Timer";
import ListeningAudio from "../../components/test/ListeningAudio";
import QuestionsListContainer from "../../components/test/QuestionsListContainer";
import Part7QuestionGroup from "../../components/test/QuestionsGroup";
import Question from "../../components/test/Question";
import { Button } from "@mui/material";

export default function TakingTestPage() {
  const [part, setPart] = useState(1);
  return (
    <div className="bg-background">
      <Header></Header>
      <div className="content py-3 px-12 m-auto">
        <div className="info-test flex flex-row items-center justify-between mb-5">
          <Timer></Timer>
          <ListeningAudio></ListeningAudio>
          <Button style={{backgroundColor:"#00C552", padding: "7px 20px 7px", fontSize: "18px", fontWeight: "700", borderRadius:"10px", marginRight: "24px"}} variant="contained" color="success">
            Submit
          </Button>
        </div>
        <div className="test-ui flex flex-row gap-5 w-full ">
          <QuestionsListContainer></QuestionsListContainer>
          <div className="Question-lists w-full bg-[#ffffff] rounded-[20px] py-8 px-10">
            <div className="parts flex flex-row gap-4 mb-5">
              <Button onClick={() => setPart(1)} variant="contained" style={{backgroundColor: part === 1 ? "#0063F3" : "#EEE", color: part === 1 ? "#FFFFFF" : "#000000", padding: "5px 10px 5px", fontSize: "16px", fontWeight: "600", borderRadius:"10px", textWrap: "nowrap"}}>Part 1</Button>
              <Button onClick={() => setPart(2)} variant="contained" style={{backgroundColor: part === 2 ? "#0063F3" : "#EEE", color: part === 2 ? "#FFFFFF" : "#000000", padding: "5px 10px 5px", fontSize: "16px", fontWeight: "600", borderRadius:"10px", textWrap: "nowrap"}}>Part 2</Button>
              <Button onClick={() => setPart(3)} variant="contained" style={{backgroundColor: part === 3 ? "#0063F3" : "#EEE", color: part === 3 ? "#FFFFFF" : "#000000", padding: "5px 10px 5px", fontSize: "16px", fontWeight: "600", borderRadius:"10px", textWrap: "nowrap"}}>Part 3</Button>
              <Button onClick={() => setPart(4)} variant="contained" style={{backgroundColor: part === 4 ? "#0063F3" : "#EEE", color: part === 4 ? "#FFFFFF" : "#000000", padding: "5px 10px 5px", fontSize: "16px", fontWeight: "600", borderRadius:"10px", textWrap: "nowrap"}}>Part 4</Button>
              <Button onClick={() => setPart(5)} variant="contained" style={{backgroundColor: part === 5 ? "#0063F3" : "#EEE", color: part === 5 ? "#FFFFFF" : "#000000", padding: "5px 10px 5px", fontSize: "16px", fontWeight: "600", borderRadius:"10px", textWrap: "nowrap"}}>Part 5</Button>
              <Button onClick={() => setPart(6)} variant="contained" style={{backgroundColor: part === 6 ? "#0063F3" : "#EEE", color: part === 6 ? "#FFFFFF" : "#000000", padding: "5px 10px 5px", fontSize: "16px", fontWeight: "600", borderRadius:"10px", textWrap: "nowrap"}}>Part 6</Button>
              <Button onClick={() => setPart(7)} variant="contained" style={{backgroundColor: part === 7 ? "#0063F3" : "#EEE", color: part === 7 ? "#FFFFFF" : "#000000", padding: "5px 10px 5px", fontSize: "16px", fontWeight: "600", borderRadius:"10px", textWrap: "nowrap"}}>Part 7</Button>
            </div>
            <div className="questions">
              <Question strImg="https://images.unsplash.com/photo-1728931710220-45fa008628a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
                        options={["A", "B", "C", "D"]}
                        questionNum={1}
                        questionText="Who are you"
              ></Question>
              <Part7QuestionGroup 
              paragraphs={[`This truck is 3 years old and in excellent condition for its age. With less than 15z000 miles on the odometer, it has had quite an easy life transporting animals for an animal sanctuary, and it has been used by only one very careful owner.This vehicle averages around 18 miles per gallon on the highway and 13 miles per gallon in the city, which makes its fuel efficiency quite competitive. Price reduced for quick sale to $19,000 (or nearest offer).
                            Features: The truck is fitted with seat heaters for both the driver and front passenger. It also features dual and side airbags, satellite navigation, and a USB jack for any second- generation or higher smartphone. Finally, the warranty expires in just under two years.
                            The owner will arrange a test drive in the New Jersey area for serious buyers. Please call (201) 555-7586 and leave a message for Geraldine. All calls will be returned within 24 hours.`]} 
              questions={[{questionNum: 1, questionText: "What is your name", options: ["A", "B", "C", "D"]}, {questionNum: 2, questionText: "What is your age", options: ["A", "B", "C", "D"]}]}
              ></Part7QuestionGroup> 
            </div>
            <div className="w-full flex ">
              <Button style={{backgroundColor:"#0063F3", padding: "5px 15px 5px", fontSize: "18px", fontWeight: "500", borderRadius:"10px", marginTop: "24px", marginLeft: "auto"}} variant="contained" color="success" sx={{textTransform:'none'}}>Next part</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
