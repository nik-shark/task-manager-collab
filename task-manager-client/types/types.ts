export type BoardType = {
    id: string;
    user_id: string;
    title: string;
    tasks: TaskType[];
}

export type TaskType = {
  title: string;
  id: string;
  board_id: string;
  description: string;
  created_at: string;
  changed_at: string;
  status: string;
  deadline: string;
};

