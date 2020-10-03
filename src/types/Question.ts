import { nullLiteral } from "@babel/types";

export interface QuestionResponse {
  response_code: number;
  results?: (Question)[] | null;
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers?: (string)[] | null;
}

interface EditQuestionData extends Question {
  index: number,
  edited: boolean
}

export type EditQuestion = EditQuestionData | null


