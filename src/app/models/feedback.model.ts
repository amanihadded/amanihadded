import { User } from './user.model'; 
export interface Feedback {
  id?: number;
  content: string;
  date?: string;
  user: User; 
}
