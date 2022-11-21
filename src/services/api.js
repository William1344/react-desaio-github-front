
const baseUrl = 'http://localhost:3005/';

async function createSession(email, password, created){
  async function VerifySession(){
    let url = baseUrl+ 'session';
    let resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    });
    let data = await resp.json();
    return data;
  }
  if(created){
    let req = await fetch(baseUrl + 'users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    });
    let res = await req.json();
    console.log(res);
    return await VerifySession();
  } else return await VerifySession();
}

// Requisições para repositórios
async function getRepos(userId, query, token) {
  let url = baseUrl + `users/${userId}/repos/${query}`;
  console.log("token: ", token, "url: ", url);
  let resp = await fetch(url, {
    method: 'GET',
    // enviar token de autenticação
    headers: {
      authorization : "Bearer " + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
    
  let data = await resp.json();
  return data;
}
async function addRepo(userId, name, url_par, token){
  let url = baseUrl + `users/${userId}/repos`;
  let resp = await fetch(url, {
    method: 'POST',
    headers: {
      authorization : "Bearer " + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, url: url_par})
  });
  let data = await resp.json();
  return data;
}
async function deleteRepo(userId, id, token){
  let url = baseUrl + `users/${userId}/repos/${id}`;
  let resp = await fetch(url, {
    method: 'DELETE',
    headers: {
      authorization : "Bearer " + token,
      'Content-Type': 'application/json',
    }
  });
  let data = await resp.json();
  return data;
}

export default { createSession, getRepos, addRepo, deleteRepo };