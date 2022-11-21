import { Link } from "react-router-dom";

export function NavBar(props){
  return (
    <div className="nav">
      <h1>Sistema de Repositórios</h1>
      <button
        type="button"
        onClick={props.onClick}
      >Sair</button>
    </div>
  )
}

export function Search(props){
  return(
    <div className="search">
      <label htmlFor="query">Procurar</label>
      <input 
        id          = "query"
        name        = "query"
        type        = "text"
        value       = {props.state}
        onChange    = {props.onChange}
        placeholder = {props.placeholder}
      />
      <button
        onClick = {props.onClickClear}
      >Limpar</button>
      <button
        onClick={props.onClick}
      >Buscar</button>
    </div>
  );
}

export function Item(props){
  return(
    <li className="item">
      <div className="info">
        <div className="name">{props.name}</div>
        <Link  
          className = "owner"
          to        = {props.url}
        >{props.url}</Link>
      </div>
      <button 
        className = "btt"
        onClick   = {props.onClick}
      >Apagar</button>
    </li>
  );
}

export function NewRepo(props){
  return (
    <div className="new">
      <div className="divUrl">
        <label htmlFor="new-repo">Novo repositório</label>
        <input 
          className = "inputUrl"
          type      = "url"
          name      = "new-repo"
          value     = {props.state}
          onChange  = {props.onChange}
        /> 
      </div>
      <button
        onClick ={props.onClick}
      >Adicionar</button>
    </div>
  );
}