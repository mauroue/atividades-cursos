"use strict";
// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
 * Não utilizei nenhuma biblioteca ou framework adicional pois
 * acredito que o objetivo seria utilizar o Typescript e se
 * familizarizar com ele.
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
var apiKey;
let requestToken;
let username;
let password;
let sessionId;
let listId;
let accountId;
let listData;
let listOfLists;
let imgBaseUrl = "https://image.tmdb.org/t/p/w92";
// armazenando elementos em variaveis para facil acesso
const loginButton = document.getElementById('login-button');
const searchButton = document.getElementById('search-button');
const searchContainer = document.getElementById('search-container');
const listButton = document.getElementById('get-list-button');
// adiciona eventlistener em cada item da lisa de filmes.
loginButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield criarRequestToken();
    yield logar();
    yield criarSessao();
    yield pegarDetalhesConta();
    yield pegarListaDeLista(accountId, sessionId);
}));
// adiciona eventlistener no botao de pesquisa
searchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    let lista = document.getElementById('lista');
    if (lista) {
        lista.outerHTML = '';
    }
    let query = document.getElementById('search');
    cartaoFilme(query);
}));
// gerando card para cada filme da lista e adicionando ao DOM
const cartaoFilme = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let listaDeFilmes = yield procurarFilme(query.value);
    let div = document.createElement('div');
    div.id = 'card-container';
    let ul = document.createElement('ul');
    ul.id = 'lista';
    div.appendChild(ul);
    for (const item of listaDeFilmes.results) {
        let li = document.createElement('li');
        let img = li.appendChild(document.createElement('img'));
        li.appendChild(document.createTextNode(item.original_title));
        img.src = imgBaseUrl + item.poster_path;
        ul.appendChild(li);
        li.addEventListener('click', (e) => {
            adicionarFilmeNaLista(item.id, listId);
        });
    }
    searchContainer.appendChild(ul);
    const lista = document.getElementById('lista');
});
// validação de senha para exibir botão
const preencherSenha = () => {
    var _a;
    password = (_a = document.getElementById('senha')) === null || _a === void 0 ? void 0 : _a.value;
    validateLoginButton();
};
const preencherLogin = () => {
    var _a;
    username = (_a = document.getElementById('login')) === null || _a === void 0 ? void 0 : _a.value;
    validateLoginButton();
};
const preencherApi = () => {
    var _a;
    apiKey = (_a = document.getElementById('api-key')) === null || _a === void 0 ? void 0 : _a.value;
    validateLoginButton();
};
const validateLoginButton = () => {
    if (password && username && apiKey) {
        loginButton.disabled = false;
    }
    else {
        loginButton.disabled = true;
    }
};
class HttpClient {
    static get({ url, method, body = null }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open(method, url, true);
                request.onload = () => {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(JSON.parse(request.responseText));
                    }
                    else {
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
        });
    }
}
const procurarFilme = (query) => __awaiter(void 0, void 0, void 0, function* () {
    query = encodeURI(query);
    let result = yield HttpClient.get({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
        method: 'GET',
    });
    return result;
});
const adicionarFilme = (filmeId) => __awaiter(void 0, void 0, void 0, function* () {
    var result = yield HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
        method: 'GET',
    });
    console.log(result); //TODO: terminar funcao
});
const criarRequestToken = () => __awaiter(void 0, void 0, void 0, function* () {
    var result = yield HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: 'GET',
    });
    requestToken = result.request_token;
});
const logar = () => __awaiter(void 0, void 0, void 0, function* () {
    yield HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        method: 'POST',
        body: {
            username: `${username}`,
            password: `${password}`,
            request_token: `${requestToken}`,
        },
    });
});
const criarSessao = () => __awaiter(void 0, void 0, void 0, function* () {
    var result = yield HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        method: "GET"
    });
    sessionId = result.session_id;
});
const criarLista = (nomeDaLista, descricao) => __awaiter(void 0, void 0, void 0, function* () {
    var result = yield HttpClient.get({
        url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
        method: 'POST',
        body: {
            name: nomeDaLista,
            description: descricao,
            language: 'pt-br',
        },
    });
});
const adicionarFilmeNaLista = (filmeId, listaId) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: 'POST',
        body: {
            media_id: filmeId,
        },
    });
    pegarLista();
});
const pegarLista = () => __awaiter(void 0, void 0, void 0, function* () {
    var selectBox = document.getElementById('list-selector');
    listId = selectBox.options[selectBox.selectedIndex].value;
    let result = yield HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
        method: 'GET',
    });
    let div = document.getElementById('minha-lista');
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
    let listContainer = document.createElement('div');
    listContainer.id = listId;
    div.appendChild(listContainer);
    console.log(result);
    for (let i = 0; i < result.items.length; i++) {
        let card = document.createElement('div');
        let p = document.createElement('p');
        let img = document.createElement('img');
        if (result.items[i].title) {
            p.innerText = result.items[i].title;
        }
        else {
            p.innerText = result.items[i].name;
        }
        card.setAttribute('class', 'card-list');
        img.setAttribute('src', imgBaseUrl + result.items[i].poster_path);
        listContainer.appendChild(card);
        card.appendChild(img);
        card.appendChild(p);
    }
});
const pegarListaDeLista = (accountId, sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield HttpClient.get({
        url: `https://api.themoviedb.org/3/account/${accountId}/lists?api_key=${apiKey}&session_id=${sessionId}`,
        method: 'GET',
    });
    listOfLists = result.results;
    var select = document.getElementById("list-selector");
    for (let i = 0; i < listOfLists.length; i++) {
        let item = document.createElement("option");
        item.value = listOfLists[i].id;
        item.text = listOfLists[i].name;
        select.add(item);
    }
});
const pegarDetalhesConta = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield HttpClient.get({
        url: `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`,
        method: 'GET',
    });
    accountId = result.id;
});
//# sourceMappingURL=desafio4-feito.js.map