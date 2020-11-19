export interface Quiz {
    uuid?: string,
    creator: string,
    questions: Array<Question>,
    timestamp?: string,
}

export interface Question {
    uuid?: string,
    text: string,
}

export interface Answer {
    uuid?: string,
    quizUuid?: string,
    questionUuid: string,
    text: string,
    username: string,
}