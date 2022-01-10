export interface Task {
    id: string;
    title: string;
    body: {
        id: string;
        task: string;
        isCompleted: boolean;
    }[];
    isAllCompleted: boolean;
    isHide: boolean;
      
}