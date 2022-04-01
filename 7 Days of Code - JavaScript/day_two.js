import readLine from "readline";

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Qual o seu nome? ', function (name) {
    rl.question('Qual a sua idade?', function (idade) {
        rl.question('Qual linguagem de programação você está estudando?', function (lang) {
            console.log(`Olá ${name}, você tem ${idade} anos e já está aprendendo ${lang}!`);
            rl.question(`Voce gosta de estudar ${lang}? Responda com o número 1 para SIM ou 2 para NÃO.`, function (answer){
                if(answer == 1) {
                    console.log('Muito bom! Continue estudando e você terá muito sucesso.')
                } else (console.log('Ahh que pena... Já tentou aprender outras linguagens?'))
                rl.close()
            })
        })
    })
});

