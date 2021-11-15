import { useRef } from "react";
import ContentEditable from "react-contenteditable";

interface TaskProps {
    task: {
        id: number;
        task: string;
        isCompleted: boolean;
    };
    disabled: boolean
};

export function Task({ task, disabled }: TaskProps) {
    const taskRef = useRef(`<span>${task.task}</span>`)

    return (
        <span
            className={`row content-row ${task.isCompleted ? "checked" : ""}`}
        >
               <ContentEditable
                className="contentEditable-container"
                html={taskRef.current}
                disabled={task.isCompleted ? true : false || disabled}
                onChange={(event) => {
                  taskRef.current = event.target.value;
                }}
              />
      </span>
    )
}