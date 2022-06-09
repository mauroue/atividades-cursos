// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

var apiKey = '3f301be7381a03ad8d352314dcc3ec1d';
//let apiKey;
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId: string = '7101979';

let loginButton = document.getElementById('login-button')! as HTMLButtonElement;
let searchButton = document.getElementById('search-button')! as HTMLButtonElement;
let searchContainer = document.getElementById('search-container')! as HTMLInputElement;


interface searchMovieResponse {
  page?: number;
  results?: [MovieResult];
  total_results?: number;
  total_pages?: number;
}

interface MovieResult {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: [];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

loginButton.addEventListener('click', async () => {
  await criarRequestToken();
  await logar();
  await criarSessao();
})

// adiciona eventlistener no botao de pesquisa
searchButton.addEventListener('click', async () => {
  let lista = document.getElementById('lista');
  if (lista) {
      lista.outerHTML = '';
  }

  let query = document.getElementById('search') as HTMLInputElement;
  cartaoFilme(query)
});

// gerando card para cada filme da lista e adicionando ao DOM
const cartaoFilme = async (query: HTMLInputElement) => {
  let listaDeFilmes = await procurarFilme(query.value);
  let div = document.createElement('div');
  div.id = 'card-container'
  let ul = document.createElement('ul');
  ul.id = 'lista'
  div.appendChild(ul);

  for (const item of listaDeFilmes) {
      let li = document.createElement('li');
      let img = li.appendChild(document.createElement('img'))
      li.appendChild(document.createTextNode(item.original_title));
      img.src = imgBaseUrl + item.poster_path
      ul.appendChild(li);
      li.addEventListener('click', (e) => { 
          adicionarFilmeNaLista(item.id, listId)
      })
  }
  searchContainer.appendChild(ul)
  const lista = document.getElementById('lista') as HTMLUListElement;
}
function preencherSenha() {
  password = (<HTMLInputElement>document.getElementById('senha'))!.value;
  validateLoginButton();
}

function preencherLogin() {
  username =  (<HTMLInputElement>document.getElementById('login'))!.value;
  validateLoginButton();
}

function preencherApi() {
  apiKey = (<HTMLInputElement>document.getElementById('api-key'))!.value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

class HttpClient {
  static async get({url, method, body = null}: {url: string, method: string, body?: {} | null}) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

async function procurarFilme(query: string) {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  if(result === undefined) {
    throw 'Movie Search Failed'
  }
  return <MovieResult>result.results
}

async function adicionarFilme(filmeId) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: "GET"
  })
  console.log(result);
}

async function criarRequestToken () {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  })
  requestToken = result.request_token
}

async function logar() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

async function criarSessao() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  })
  sessionId = result.session_id;
}

async function criarLista(nomeDaLista, descricao) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId, listaId) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  console.log(result);
}

{/* <div style="display: flex;">
  <div style="display: flex; width: 300px; height: 100px; justify-content: space-between; flex-direction: column;">
      <input id="login" placeholder="Login" onchange="preencherLogin(event)">
      <input id="senha" placeholder="Senha" type="password" onchange="preencherSenha(event)">
      <input id="api-key" placeholder="Api Key" onchange="preencherApi()">
      <button id="login-button" disabled>Login</button>
  </div>
  <div id="search-container" style="margin-left: 20px">
      <input id="search" placeholder="Escreva...">
      <button id="search-button">Pesquisar Filme</button>
  </div>
</div>*/}