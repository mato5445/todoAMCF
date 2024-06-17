export interface TodoItemInterface {
  id: string;
  text: string;
  isCompleted: boolean;
  description?: string;
  date?: Date,
  time?: number
}
