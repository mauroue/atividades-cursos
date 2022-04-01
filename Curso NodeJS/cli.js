import pegaArquivo from './aula02.js';
import chalk from 'chalk';
import validaURLs from './http-validacao.js';

const caminho = process.argv;

async function processaTexto(caminhoDoArquivo){
    const resultado = await pegaArquivo(caminhoDoArquivo[2]);
    if (caminho[3] === 'validar') {
        console.log(chalk.yellow('links validados'), await validaURLs(resultado));
    } else {
        console.log(chalk.yellow('lista de links', resultado))
    }
}


processaTexto(caminho)