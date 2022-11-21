import React from "react";
import { NavBar, Search, NewRepo, Item, ItemPes } from "./Components";
import { AuthContext } from "../../contexts/auth";
import api from "../../services/api";
import "./styles.css";

export default function Main() {
  const context = React.useContext(AuthContext);
  const [name, setName] = React.useState(""); // pesquisa repositorio
  const [url, setUrl]   = React.useState(""); // url do novo repositorio 
  const [load, setLoad] = React.useState(true);
  const [repos, setRepos] = React.useState([]); // lista de repositorios
  const [item, setItem] = React.useState(); // repositorio pesquisado
  React.useEffect(() => {
    (async () =>{
      try {
        console.log("Context", context);
        let data = await api.getRepos(context.user.id, "", context.token);
        setRepos(data);
        //console.log("Repositórios: ", repos);
        setLoad(false);
      } catch (e) {
        console.log("Erro: ", e);
      }
    })();
  }, []);

  async function handleLogout() {
    if(window.confirm("Deseja sair?"))
      await context.logout();    
  }
  

  async function handleSearch(query){
    //console.log("Search: ", query);
    let item = await api.getRepos(context.user.id, query, context.token);
    //console.log("Item: ", item);
    setItem(item);
    setName("");
  }

  async function handleDeleteRepo(userId, id){
    setLoad(true);
    try {
      console.log("Delete: ", "UserId: "+userId, "RepoId: "+id);
      let data = await api.deleteRepo(userId, id, context.token);
      setRepos(repos.filter(repo => repo._id !== id));
    } catch (e) {
      console.log("Erro: ", e);
    }
    setLoad(false);
  }

  async function handleNewRepo(){
    // verifica se o campo esta vazio
    setLoad(true);
    if(url.length == 0) return window.alert("Campo vazio");
    else {
      const name = url.split("/").pop();
      try {
        let data = await api.addRepo(context.user.id, name, url, context.token);
        if(data.repo) {
          console.log("Repositório adicionado: ", data.repo);
          repos.push(data.repo);
          setRepos(repos); 
          setUrl("");
        } else window.alert("Repositório já existe: "+data.msg);
      } catch (e) {
        console.log("Erro: ", e);
      }
    }
    setLoad(false);
  }

  if(load) return <div className = "loading">Carregando...</div>;

  return (
    <div id="main">
    <NavBar onClick = {handleLogout}/>
    <Search 
      state         = {name}
      onClick       = {() => handleSearch(name)}
      onChange      = {(e) => {setName(e.target.value)}}
      onClickClear  = {() => setName("")}
    />
      {
        item && (
          <ItemPes
            name = {item.name}
            url  = {item.url}
            onClick = {() => setItem()}
          />
        )
      }
      <div className  = "repositories">
        <h2 className = "title">Repositórios</h2>
        <ul className = "list">
          {repos.map(repo => {
            return (
              <Item 
                key     = {repo._id}
                name    = {repo.name}
                url     = {repo.url}
                onClick = {() => handleDeleteRepo(context.user.id, repo._id)}
              />
            );
          })}
        </ul>
        <NewRepo
          state     = {url}
          onClick   = {handleNewRepo}
          onChange  = {e => setUrl(e.target.value)}
        />
      </div>
    </div>
  );
}