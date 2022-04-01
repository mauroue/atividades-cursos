import fetch from 'node-fetch'

function manejaErros(erro) {
    throw new Error(erro.message);
}

async function checaStatus(arrayLinks) {
    try{
        const arrayStatus = await Promise
            .all(arrayLinks
                .map(async url => {
                const res = await fetch(url);
                console.log(res)
                return `${res.status} - ${res.statusText}`;
        }))
    
    return arrayStatus;
    } catch(erro) {
        manejaErros(erro);
    }
}

function geraArrayDeURLs(arrayLinks) {
    return arrayLinks
        .map(objetoLink => Object
        .values(objetoLink).join());
}

async function validaURLs(arrayLinks) {
    const links = geraArrayDeURLs(arrayLinks);
    console.log(links)
    const statuslinks = await checaStatus(links);
    const resultados = arrayLinks.map((objeto, indice) => ({
         ...objeto, 
         status:statuslinks[indice]
    }))
    return resultados;
}

export default validaURLs;