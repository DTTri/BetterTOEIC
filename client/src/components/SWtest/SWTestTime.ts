export type SWTestTime = {
    DirectionTime: number,
    PreparationTime?: number,
    RecordingTime?: number,
    question56?: {
        RecordingTime: number,
    },
    question7?: {
        RecordingTime: number,
    },
    question89?: {
        RecordingTime: number,
    },
    question10?: {
        RecordingTime: number,
    }
}

export const Part1SWTestTime : SWTestTime = {
    DirectionTime: 5,
    PreparationTime: 10,
    RecordingTime: 10,
}
export const Part2SWTestTime: SWTestTime = {
    DirectionTime: 5,
    PreparationTime: 10,
    RecordingTime: 10,
}

export const Part3SWTestTime: SWTestTime = {
    DirectionTime: 5,
    PreparationTime: 3,
    question56: {
        RecordingTime: 5,
    },
    question7: {
        RecordingTime: 5,
    }
}
export const Part4SWTestTime: SWTestTime = {
    DirectionTime: 5,
    PreparationTime: 3,
    question89: {
        RecordingTime: 5,
    },
    question10: {
        RecordingTime: 5,
    },
}

export const Part5SWTestTime: SWTestTime = {
    DirectionTime: 5,
    PreparationTime: 10,
    RecordingTime: 15,
}

export const Part6SWTestTime: SWTestTime = {
    DirectionTime: 5,
    RecordingTime: 10,
}

export const Part7SWTestTime: SWTestTime = {
    DirectionTime: 5,
    RecordingTime: 10,
}

export const Part8SWTestTime: SWTestTime = {
    DirectionTime: 5,
    RecordingTime: 20
}