import Question from "../Question";

type CreateTestDTO = {
    title: string;
    description: string;
    main_audio: string;
    difficulty: string;
    questions: Question[];
    isMiniTest?: boolean | false;
    created_by: string;
}

export default CreateTestDTO;