
export type PracticeTest = {
    practice_test_id: string;
    choices: number[];
    total_correct_number: number;
}

export type PracticePart = {
    practice_tests: PracticeTest[];
}

type PracticeHistory = {
    _id: string;
    practice_id: string;
    user_id: string;
    part: PracticePart[];
}

export default PracticeHistory;