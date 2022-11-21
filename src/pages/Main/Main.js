import React from "react";
import { NavBar, Search, NewRepo, Item } from "./Components";
import api from "../../services/api";
import "./styles.css";

export default function Main() {
  const idUser = '6379c1b2ff9dff417c5b7cba';
  const [name, setName] = React.useState(""); // pesquisa repositorio
  const [url, setUrl]   = React.useState(""); // url do novo repositorio 
  const [load, setLoad] = React.useState(true);
  const [repos, setRepos] = React.useState([]); // lista de repositorios

  React.useEffect(() => {
    (async () =>{
      try {
        let data = await api.getRepos(idUser);
        setRepos(data);
        //console.log("Repositórios: ", repos);
        setLoad(false);
      } catch (e) {
        console.log("Erro: ", e);
      }
    })();
  }, []);

  function handleLogout() {
    window.alert("Logout");
  }

  function handleSearch(query){
    //console.log("Search: ", query);
  }

  async function handleDeleteRepo(userId, id){
    console.log("Delete: ", "UserId: "+userId, "RepoId: "+id);
    let data = await api.deleteRepo(userId, id);
    setRepos(repos.filter(repo => repo._id !== id));
  }

  async function handleNewRepo(){
    // verifica se o campo esta vazio
    setLoad(true);
    if(url.length == 0) return window.alert("Campo vazio");
    else {
      const name = url.split("/").pop();
      repos.push(await api.addRepo(idUser, name, url));
      setRepos(repos); 
      setUrl("");
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
      onChange      = {e => setName(e.target.value)}
      onClickClear  = {() => setName("")}
    />
      
      <div className  = "repositories">
        <h2 className = "title">Repositórios</h2>
        <ul className = "list">
          {repos.map(repo => {
            return (
              <Item 
                key     = {repo._id}
                name    = {repo.name}
                url     = {repo.url}
                onClick = {() => handleDeleteRepo(idUser, repo._id)}
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