import { TaskProvider } from "./hooks/useTask";
import { ModalProvider } from "./hooks/useModal";
import { Header } from "./Components/Header/index";
import { TaskBoard } from "./Components/TaskBoard";

import { GlobalStyles } from "./styles/global";
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
      <GlobalStyles />
      <TaskProvider>
        <Header />
        <ModalProvider>
          <TaskBoard />
        </ModalProvider>
      </TaskProvider>
    </>
  );
}
