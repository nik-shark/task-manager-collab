import { api } from './instance';
import {type TaskType }from '../types/types'

export async function getTasksByBoard(boardId: string): Promise<TaskType[]> {
    const response = await api.get(`api/v1/tasks`, { params: { board_id: boardId } });
    return response.data;
}