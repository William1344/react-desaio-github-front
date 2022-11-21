import React from "react";
import api from "../services/api";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = React.useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [load, setLoad]   = React.useState(true);
  const [token, seToken] = React.useState(
    JSON.parse(localStorage.getItem("token")) || ""
  );

  React.useEffect(() => {
    setLoad(false);
  }, []);

  async function login(email, password, created) {
    
    setLoad(true);
    // verifica se o email e senha estão preenchidos
    if (email === "" || password === "") {
      window.alert("Aviso\n"+"Preencha todos os campos!");
      return 0;
    } else {
      //window.alert("Campos\n"+"Email: "+email+"\nSenha: "+password);
      const us = await api.createSession(email, password, created);
      console.log("Login", us);
      setUser(us.user);
      seToken(us.token);
      localStorage.setItem("token", JSON.stringify(us.token));
      localStorage.setItem("user",  JSON.stringify(us.user));
      // ir para a página principal
      setLoad(false);
      return window.location.href = "/";
    }
  }

  async function logout() {
    setLoad(true);
    setUser(null);
    seToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // ir para a página de login
    window.location.href = "/login";
    setLoad(false);
  }

  return (
    <AuthContext.Provider 
      value = {{ 
        authenticated: !!user, // !! converte para boolean
        user,
        load,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};