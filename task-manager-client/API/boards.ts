// import axios from 'axios'
import { type BoardType } from '../types/types';

// const api = axios.create({
//     baseURL: 'http://127.0.0.1:8000/'
// })

const MOCK_BOARDS:BoardType[] = [
  {
    id: "1",
    user_id: "1",
    title: 'Store'
  },
  {
    id: "2",
    user_id: "1",
    title: 'Chores'
  },
  {
    id: "3",
    user_id: "1",
    title: 'Work'
  }
]


export async function getAllBoards() {

    await new Promise(resolve => setTimeout(resolve, 1000));

    return [...MOCK_BOARDS]

    // const response = await api.get('api/v1/boards/')
    // return response.data

}


export async function createNewBoard(boardTitle: string) {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const newBoard = {id: crypto.randomUUID(), user_id: "1", title: boardTitle}
  
  MOCK_BOARDS.push(newBoard)

  // const response = await api.post("api/v1/boards", boardTitle);
  // return response.data;
}
