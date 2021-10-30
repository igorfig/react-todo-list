import { useState } from 'react';
import { Provider } from './providers/TaskContext'
import { Header } from './Components/Header/index'
import { TaskModal } from './Components/TaskModal/index'
import { TaskBoard } from "./Components/TaskBoard";

import { GlobalStyles } from "./styles/global";
import { ThemeProvider } from "styled-components";
import { Dark, Light } from './styles/themes/themes'

export function App() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [ isDarkTheme, setIsDarkTheme ] = useState(false)

  const handleSwitcherTheme = () => setIsDarkTheme(prevState => !prevState)

  function handleOpenTaskModal() {
    setIsTaskModalOpen(true);
  }

  function handleCloseTaskModal() {
    setIsTaskModalOpen(false);
  }

  return (
    <ThemeProvider theme={isDarkTheme ? Dark : Light}>
      <GlobalStyles/>
      <Provider>
        <Header isDarkTheme={isDarkTheme}  switcher={handleSwitcherTheme}/>
        <TaskBoard modalOpener={handleOpenTaskModal}/>
        <TaskModal 
          isOpen={isTaskModalOpen}
          onRequestClose={handleCloseTaskModal}
          />
      </Provider>
    </ThemeProvider>
     
  );
}
