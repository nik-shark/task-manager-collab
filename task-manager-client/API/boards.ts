import { type BoardType } from '../types/types';

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})

// let MOCK_BOARDS:BoardType[] = [
//   {
//     id: "1",
//     user_id: "1",
//     title: 'Store'
//   },
//   {
//     id: "2",
//     user_id: "1",
//     title: 'Chores'
//   },
//   {
//     id: "3",
//     user_id: "1",
//     title: 'Work'
//   }
// ]


export async function getAllBoards(user_id: number): Promise<BoardType[]> {

    // await new Promise(resolve => setTimeout(resolve, 1000));

    // return [...MOCK_BOARDS]

    const response = await api.get(`api/v1/boards/`, {params: {user_id}});
    return response.data

}


export async function createNewBoard(user_id: number, boardTitle: string):Promise<BoardType> {
  // await new Promise(resolve => setTimeout(resolve, 1000))
  // const newBoard = {id: crypto.randomUUID(), user_id: "1", title: boardTitle}  
  // MOCK_BOARDS.push(newBoard)

  const response = await api.post(`api/v1/boards/`, {user_id, title: boardTitle});
  return response.data;
}

export async function deleteBoard( boardId: string) {
  // await new Promise(resolve => setTimeout(resolve, 1000))
  // MOCK_BOARDS = [...MOCK_BOARDS].filter(board => board.id !== boardId);
  
  const response = await api.delete(`api/v1/boards/${boardId}`);
  return response.data
}

export async function editBoard( boardId: string, newTitle: string): Promise<BoardType> {
  // await new Promise(resolve => setTimeout(resolve, 1000));
  // MOCK_BOARDS = MOCK_BOARDS.map(board => {
  //   if (board.id === boardId) {
  //     return { ...board, title: newTitle };
  //   }
  //   return board;
  // })

  const response = await api.put(`api/v1/boards/${boardId}`, { title: newTitle });
  return response.data;
}