import { Container } from "./styles";
import logoImg from "../../assets/logo.svg";
import searchImg from "../../assets/search.svg";


export function Header() {
  return (
    <Container>
      <div>
        <img src={logoImg} alt="Get It Done!" />
        <h1>Get It Done!</h1>
      </div>
      
      <div>
        <div className="input-container">
          <img src={searchImg} alt="Lupa Imagem" />
          <input type="text" placeholder="Procurar por tarefas" />
        </div>
      </div>
    </Container>
  );
}
