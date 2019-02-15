export interface Question {
  // API wrapper for questions data
  response_code: number;
  results?: Result[];
}

export interface Result {
  // The meat of the trivia question functionality
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  response?: string;
}

export interface GlobalState {
  loading: boolean;
  errors: Array<{ name: string; message: string }>;
  updateGlobalState: (ProviderState: GlobalState) => void;
  correctAnswers: number;
  totalAnswers: number;
};
