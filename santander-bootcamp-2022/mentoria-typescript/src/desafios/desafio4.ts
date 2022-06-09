// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que:
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

/** Nota do estudante:
 * 
 * Após análise da página, decidi manter o projeto em um arquivo
 * único.
 *  
 * Evitei refatorar funções e mantive o design do projeto
 * mais ou menos como estava antes, com a mesma estética mas
 * adicionando novas funcionalides e alguns extras, tal como
 * exibição de posters dos filmes.
 * 
 * Changelog:
 * 
 * - atualizado código em typescript;
 * - adicionado exibição de posters na pesquisa de filmes e lista
 * - adicionado lista e seleção de listas salvas
 * - adição de filmes à lista ao clicar no filme 
 */

// inicializando variaveis de login e session


//TODO: add delete list
//TODO: fix spacing
var apiKey: string = "";
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId: string;
let accountId: string;
let listData: listData;
let listOfLists: [listData];

let imgBaseUrl: string = "https://image.tmdb.org/t/p/w500";

interface listData {
    name: string;
    id: string;

}

interface MovieResult {
    adult: boolean;
    backdrop_path: string;
    genre_ids: [];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;
}

interface MovieQuery {
    page: number;
    results: [MovieResult];
    total_pages: number;
    total_results: number;
}

interface SessionQuery {
    sucess: boolean;
    expires_at: string;
    request_token: string;
}

// armazenando elementos em variaveis para facil acesso
const loginButton = document.getElementById('login-btn') as HTMLButtonElement;
const searchButton = document.getElementById('search-button') as HTMLButtonElement;
const searchContainer = document.getElementById('search-container') as HTMLDivElement;
const listButton = document.getElementById('get-list-button') as HTMLButtonElement;
const formContainer = document.getElementById('form-container') as HTMLFormElement;
const searchInput = document.getElementById('search-box') as HTMLInputElement;

const triggerBtn = () => {
    document.getElementById('btn-trigger-modal')?.click()
}

function loginIn() {
    password = (document.getElementById('inputPassword')! as HTMLInputElement).value;
    username =  (document.getElementById('inputEmail')! as HTMLInputElement).value;
}

searchInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
})

// adiciona eventlistener no botao de login
loginButton.addEventListener('click', async (e) => {
    e.preventDefault();
    loginIn();
    await criarRequestToken();
    await logar();
    await criarSessao();
    await pegarDetalhesConta();
    await pegarListaDeLista(accountId, sessionId)
});

// adiciona eventlistener no botao de pesquisa
searchButton.addEventListener('click', async () => {
    let lista = document.getElementById('card--container');
    if (lista) {
        lista.innerHTML = '';
    }

    let query = document.getElementById('search-box') as HTMLInputElement;
    cartaoFilme(query);
    (document.getElementById('search-box') as HTMLInputElement).value = "";
});

// gerando card para cada filme da lista e adicionando ao DOM
const cartaoFilme = async (query: HTMLInputElement) => {
    let listaDeFilmes = await procurarFilme(query.value);
    let cardContainer = document.querySelector("#card--container");
    

    for (const item of listaDeFilmes.results) {
        let imgUrl = imgBaseUrl + item.poster_path
        if(!item.poster_path) {
            imgUrl = ""
        }

        const content = `
        <div class="card--effect card mb-3 position-relative" style="width: 540px; height:180px">
                <i onclick="adicionarFilmeNaLista(${item.id}, ${listId})" class="add-to-list bi bi-bookmark-plus fs-5 position-absolute"></i>
            <div class="row g-0 h-100">
                <div class="col-md-3 h-100 ">
                    <img src="${imgUrl}"
                        class="card--image h-100 rounded-start" alt="">
                    </img>
                </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${item.original_title}, (${item.release_date.substring(0, 4)})</h5>
                    <p class="card-text fw-light lh-1">${item.overview.toString()}</p>
                </div>
            </div>
            </div>
        </div>
        `
        cardContainer!.innerHTML += content;
        // let addToList = document.querySelector(".add-to-list");
        // addToList!.addEventListener('click', (e) => { 
        //     adicionarFilmeNaLista(item.id, listId)
        // })
    }
}


class HttpClient {
    static async get({ url, method, body = null }: { url: string; method: string; body?: any; }) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open(method, url, true);

            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText,
                    });
                }
            };
            request.onerror = () => {
                reject({
                    status: request.status,
                    statusText: request.statusText,
                });
            };

            if (body) {
                request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                body = JSON.stringify(body);
            }
            request.send(body);
        });
    }
}

const procurarFilme = async (query: string): Promise<MovieQuery> => {
    query = encodeURI(query);
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
        method: 'GET',
    });
    return result as MovieQuery;
}

const adicionarFilme = async (filmeId: number) => {
        var result = await HttpClient.get({
            url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
            method: 'GET',
        });
    
    console.log(result);
}

const criarRequestToken = async () => {
    var result: any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: 'GET',
    })
    requestToken = result.request_token;
}

const logar = async () => {
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        method: 'POST',
        body: {
            username: `${username}`,
            password: `${password}`,
            request_token: `${requestToken}`,
        },
    })
}

const criarSessao = async () => {
    var result: any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
    })
    sessionId = result.session_id;
}

const criarLista = async () => {
    var nomeDaLista = (document.getElementById("nome-lista") as HTMLInputElement)!.value
    console.log(nomeDaLista)
    var result: any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
        method: 'POST',
        body: {
            name: nomeDaLista,
            description: '',
            language: 'pt-br',
        },
    });
    pegarListaDeLista(accountId, sessionId);
    (document.getElementById('nome-lista') as HTMLInputElement).value = "";
}

const adicionarFilmeNaLista = async (filmeId: number, listaId: string) => {
    let result: any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: 'POST',
        body: {
            media_id: filmeId,
        },
    })
    pegarLista();
    (document.getElementById("list-selector") as HTMLSelectElement)!.selectedIndex = 1;
}

const pegarLista = async (listaId?: string) => {
    if(listaId) {
        listId = listaId;
    } else {
        var selectBox = document.getElementById('list-selector') as HTMLSelectElement;
        listId = selectBox.options[selectBox.selectedIndex].value;
    }

    let result: any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
        method: 'GET',
    })
    let div: any = document.getElementById('minha-lista') as HTMLDivElement;
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
    
    for(let i = 0; i < result.items.length; i++) {
        let movieTitle = ''
        const listContainer = document.querySelector("#minha-lista")
        if(result.items[i].title){
            movieTitle = result.items[i].title;
        } else {
            movieTitle = result.items[i].name;
        }
        let listPosterUrl = 'https://image.tmdb.org/t/p/w92' + result.items[i].poster_path
        const listContent = `
            <div class="mini-card border-bottom pb-3 d-flex mt-3 rounded-1">
                <img class="img-fluid float-center pe-2" src="${listPosterUrl}">
                <p class="list--title">${movieTitle}</p>
            </div>
        `
        listContainer!.innerHTML += listContent;
    } 
}

const pegarListaDeLista = async (accountId: string, sessionId: string) => {
    var select = document.getElementById("list-selector") as HTMLSelectElement;

    if(select) {
        document.getElementById("list-selector")!.innerHTML = "";
    }

    let result: any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/account/${accountId}/lists?api_key=${apiKey}&session_id=${sessionId}`,
        method: 'GET',
    });
    listOfLists = result.results
    for(let i = 0; i < listOfLists.length; i++) {
        let item = document.createElement("option");
        item.value = listOfLists[i].id
        item.text = listOfLists[i].name
        select.add(item)
    }
}

const pegarDetalhesConta = async () => {
    let result: any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`,
        method: 'GET',
    })
    accountId = result.id
}

