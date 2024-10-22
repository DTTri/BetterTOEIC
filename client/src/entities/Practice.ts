import Question from "./Question";

type Practice = {
    _id: string;
    questions: Question[];
    part: number;
    practice_audio?: string;
    created_at: string;
    updated_at: string;
}

export default Practice;