import API from './api';
import { Chapter } from '../types/chapter';
import { GetUserProgressResponse } from '../types/progress';

export const getChapters = async (): Promise<{ chapters: Chapter[] }> => {
  const response = await API.get('/chapters');
  return response.data;
};

export const getUserProgress = async (): Promise<GetUserProgressResponse> => {
    const response = await API.get('/progress');
    return response.data;
  };

  type MarkProgressPayload = {
    chapterId: string;
    problemId: string;
    isCompleted: boolean;
  };
  
  export const markProgress = async (payload: MarkProgressPayload): Promise<any> => {
    const response = await API.post('/progress', payload);
    return response.data;
  };
  