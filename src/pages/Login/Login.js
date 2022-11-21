import React from "react";
import "./styles.css";

export default function Login() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLogin() {
    // verifica se o email e senha estão preenchidos
    if (email === "" || password === "") {
      window.alert("Aviso\n"+"Preencha todos os campos!");
      return 0;
    } else {
      window.alert("Campos\n"+"Email: "+email+"\nSenha: "+password);
    }
  }

  return (
    <div id = "login">
      <h1 className="title">Login</h1>
      <div className="form">
        <div className= "field">
          <label htmlFor="email">Email:</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
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
        </div>
      </div>
    </div>
  );
}