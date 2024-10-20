import Question from "./Question";

type Practice = {
    _id: string;
    questions: Question[];
    created_at: string;
    updated_at: string;
}

export default Practice;