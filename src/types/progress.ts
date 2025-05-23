export interface ProblemProgress {
    status: boolean;
  }
  
  export interface ChapterProgress {
    progress: {
      [problemId: string]: ProblemProgress;
    };
  }
  
  export interface UserProgressData {
    [chapterId: string]: ChapterProgress;
  }
  
  export interface UserProgress {
    _id: string;
    userId: string;
    data: UserProgressData;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface GetUserProgressResponse {
    success: boolean;
    progress: UserProgress;
  }
  