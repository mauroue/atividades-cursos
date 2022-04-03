import readLine from "readline";
import {stdin as input, stdout as output} from 'process';

const rl = readLine.createInterface({ input, output });

const answer = rl.question('Qual caminho você quer seguir? FrontEnd (1) ou BackEnd (2)? ', function (answer) {
    console.log(answer);
    if (answer == 1) {
        const answer = rl.question('Qual tecnologia gostaria de aprender? React (1) ou Vue (2)? ', function (answer) {
            const isitok = rl.question('Digite OK se quiser adicionar mais linguagens para aprender.', techQuestions(isitok))
            console.log('funcionou ate aqui')
            }            
        )
    } else { const answer = rl.question('Qual tecnologia gostaria de aprender? C# (1) ou Java (2)? ')};
});

function techQuestions(answer) {
    while (answer == 'ok') {
        const newtech = rl.question('Qual linguagem gostaria de aprender? ', function (newtech) {

        })
    }
}


