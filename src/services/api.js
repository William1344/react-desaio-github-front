const baseUrl = 'http://localhost:3005/';


// Requisições para repositórios
async function getRepos(userId) {
  let url = baseUrl + `users/${userId}/repos`;
  let resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  let data = await resp.json();
  return data;
}
async function addRepo(userId, name, url_par){
  let url = baseUrl + `users/${userId}/repos`;
  let resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, url: url_par})
  });
  let data = await resp.json();
  return data.repo;
}
async function deleteRepo(userId, id){
  let url = baseUrl + `users/${userId}/repos/${id}`;
  let resp = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  let data = await resp.json();
  return data;
}

export default { getRepos, addRepo, deleteRepo };