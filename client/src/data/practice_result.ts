import { PracticePart, PracticeHistory, PracticeTest } from '@/entities/PracticeHisotry'

const practiceResult: PracticeHistory = 
    {
        _id: '1',
        practice_id: '1',
        user_id: '1',
        part: [
            {
                part: 1,
                practice_tests: [
                    {
                        practice_test_id: '1',
                        choices: [0, 1, 2, 3],
                        total_correct_number: 5
                    },
                    {
                        practice_test_id: '2',
                        choices: [0, 1, 2, 3, 0],
                        total_correct_number: 5
                    },
                    {
                        practice_test_id: '3',
                        choices: [0, 1, 2, 3],
                        total_correct_number: 5
                    }
                ]
            },
            {
                part: 2,
                practice_tests: [
                    {
                        practice_test_id: '4',
                        choices: [0, 1, 2, 3],
                        total_correct_number: 5
                    },
                    {
                        practice_test_id: '5',
                        choices: [0, 1],
                        total_correct_number: 5
                    },
                    {
                        practice_test_id: '6',
                        choices: [0],
                        total_correct_number: 5
                    }
                ]
            },
            {
                part: 3,
                practice_tests: [
                    {
                        practice_test_id: '7',
                        choices: [0, 1, 2, 3, ],
                        total_correct_number: 5
                    },
                    {
                        practice_test_id: '8',
                        choices: [0, 1, 2, 3, ],
                        total_correct_number: 5
                    },
                    {
                        practice_test_id: '9',
                        choices: [0, 1, 2, 3],
                        total_correct_number: 5
                    }
                ]
            },
            {
                part: 4,
                practice_tests: [
                    {
                        practice_test_id: '10',
                        choices: [1, 2, 3, 0, 1],
                        total_correct_number: 5
                    },
                    {
                        practice_test_id: '11',
                        choices: [1, 2, 3, 0, 1],
                        total_correct_number: 5
                    },
                    {
                        practice_test_id: '12',
                        choices: [1, 2, 3, 0, 1],
                        total_correct_number: 5
                    }
                ]
            },
            {
                part: 5,
                practice_tests: [
                    {
                        practice_test_id: '13',
                        choices: [1, 2, 3, 0, 1],
                        total_correct_number: 5
                    },
                    {
                        practice_test_id: '14',
                        choices: [1, 2, 3, 0, 1],
                        total_correct_number: 5
                    },
                    {
                        practice_test_id: '15',
                        choices: [1, 2, 3, 0, 1],
                        total_correct_number: 5
                    }
                ]
            }
        ]
    }

export default practiceResult;