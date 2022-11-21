import React from "react";
import { AuthContext } from "../../contexts/auth";
import api from "../../services/api";
import "./styles.css";

export default function Login() {
  const context = React.useContext(AuthContext);
  const [email, setEmail]       = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleLogin() {
    await context.login(email, password, false);
    console.log("Login", context);
    //return window.location.href = "/";
  }

  async function handleRegister() {
    // verifica se o email e senha estão preenchidos
    if (email !== "" || password !== "") {
      await context.login(email, password, true);
    } else window.alert("Campos não preenchidos!");
  }

  return (
    <div id = "login">
      <h1 className="title">Login</h1>
      {/*<label>
        
      Email: {context.user.email}{"\n"}
        Password: {context.user.id}
      </label>*/}
      <div className="form">
        <div className= "field">
          <label htmlFor="email">Email:</label>
          <input 
            id          = "email" 
            type        = "email" 
            name        = "email" 
            value       = {email}
            placeholder = "exemple@email.com"
            onChange    = {e => setEmail(e.target.value)}
          />
        </div>
        <div className= "field">
          <label htmlFor="password">Password:</label>
          <input 
            id="password" 
            type="password" 
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <div className="actions">
          <button 
            type="submit"
            onClick={handleLogin}
          >Entrar</button>
          <button 
            type="submit"
            onClick={handleRegister}
          >Cadastrar</button>
        </div>
      </div>
    </div>
  );
}