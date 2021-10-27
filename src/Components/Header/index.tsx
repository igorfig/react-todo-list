import { Container } from "./styles";

import lightImg from '../../assets/light.svg';
import darkImg from '../../assets/dark.svg'
import logoImg from '../../assets/logo.svg';
import searchImg from '../../assets/search.svg'

interface HeaderProps {
    isDarkTheme: boolean;
    switcher: () => void;
}

export function Header({ switcher, isDarkTheme }: HeaderProps) {
    return (
        <Container>
            <div>
                <div>
                    <img src={logoImg} alt="Get It Done!" />
                    <h1>Get It Done!</h1>
                </div>
                
                <button 
                    type="button"
                    onClick={switcher}
                    >
                    <img src={isDarkTheme ? lightImg : darkImg } alt="Alterar para tema claro" />
                </button>
            </div>
            
           <div>
                <div className="input-container">
                        <img src={searchImg} alt="Lupa Imagem" />
                        <input 
                            type="text" 
                            placeholder="Procurar por tarefas"
                        />
                </div>
           </div>

         
        </Container>
    )
}