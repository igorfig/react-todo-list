import { TaskProvider } from "./hooks/useTask";
import { ModalProvider } from "./hooks/useModal";
import { Header } from "./Components/Header/index";
import { TaskBoard } from "./Components/TaskBoard";

import { GlobalStyles } from "./styles/global";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

export function App() {
  const [isPendingTasksSelected, setIsPendingTasksSelected] = useState(true);
  return (
    <>
      <GlobalStyles />
      <TaskProvider>
        <Header isPendingTasksSelected={isPendingTasksSelected} toggleTasksStatus={setIsPendingTasksSelected}/>
        <ModalProvider>
          <TaskBoard isPendingTasksSelected={isPendingTasksSelected}/>
        </ModalProvider>
      </TaskProvider>
    </>
  );
}
