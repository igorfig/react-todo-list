import { useRef, useState } from "react";
import { TaskProvider } from "./hooks/useTask";
import { ModalProvider } from "./hooks/useModal";
import { Header } from "./Components/Header/index";
import { TaskBoard } from "./Components/TaskBoard";

import { GlobalStyles } from "./styles/global";
import "react-toastify/dist/ReactToastify.css";
import { SearchProvider } from "./hooks/useSearch";

export function App() {
  const [isPendingTasksSelected, setIsPendingTasksSelected] = useState(true);

  // Input Ref
  const ref = useRef<HTMLInputElement>({} as HTMLInputElement);
  return (
    <>
      <GlobalStyles />
      <TaskProvider>
        <SearchProvider>
          <Header
            inputRef={ref}
            isPendingTasksSelected={isPendingTasksSelected}
            toggleTasksStatus={setIsPendingTasksSelected}
          />
          <ModalProvider>
            <TaskBoard
              inputRef={ref}
              isPendingTasksSelected={isPendingTasksSelected}
            />
          </ModalProvider>
        </SearchProvider>
      </TaskProvider>
    </>
  );
}
