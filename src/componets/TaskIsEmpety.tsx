import Logo from "../assets/Clipboard.png";
import styles from "./TaskIsEmpety.module.css";

export function TaskIsEmpety() {

  return(
    <div className={styles.taskIsEmpety}>
      <div className={styles.line}>
        <div className={styles.content}>
          <div>
            <img src={Logo} alt="logotipo do ingnite"></img>
          </div>
          <div>
            <h1> <strong>Você ainda não tem tarefas cadastradas</strong> </h1>
            <h1>Crie tarefas e organize seus itens a fazer</h1>
          </div>
        </div>
      </div>
    </div>
  )
}