
export type PracticeTest = {
    practice_test_id: string;
    choices: number[];
    total_correct_number: number;
}

export type PracticePart = {
    part: number;
    practice_tests: PracticeTest[];
}

export type PracticeHistory = {
    _id: string;
    practice_id: string;
    user_id: string;
    part: PracticePart[];
}
