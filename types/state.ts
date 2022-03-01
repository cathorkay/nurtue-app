export interface User {
  id: string;
  name: string;
  description: string;
  photo: string | null;
  expert: boolean;
}
export interface Profile {
  user: User;
  role: string;
}

export interface Reply {
  id: string;
  author: User;
  content: string;
  likeCount: number;
  likers: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}
export interface Post {
  id: string;
  title: string;
  author: User;
  content: string;
  image: string | null;
  likeCount: number;
  likers: string[];
  replies: Reply[];
  topics: string[];
  anonymous: boolean;
  expertsOnly: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Question {
  question: string;
  source: string;
  choices: {
    content: string;
    explanation: string;
  }[];
  answerIndex: number;
}
export interface Practice {
  id: string;
  topic: string;
  description: string;
  source: string;
  questions: Question[];
}

export interface Agreement {
  id: string;
  title: string;
  emoji: string;
  summary: string;
  people: [string, string];
  createdAt: Date | string;
  updatedAt: Date | string;
}
