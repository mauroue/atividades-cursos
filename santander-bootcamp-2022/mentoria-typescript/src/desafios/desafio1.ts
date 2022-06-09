// Como podemos rodar isso em um arquivo .ts sem causar erros? 

let employee = {} as employee;
employee.code = 10;
employee.name = "John"

interface employee {
    code: number;
    name: string;
}