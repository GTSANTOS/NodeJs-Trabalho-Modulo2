var fs = require("fs");

// Implementar um método que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser o UF do estado, por exemplo: MG.json.
const Exer1_CriarJsonCidadePorEstado = () => {
    var estadoJson = JSON.parse(fs.readFileSync("../json/Estados.json", "utf8"));
    var cidadeJson = JSON.parse(fs.readFileSync("../json/Cidades.json", "utf8"));

    estadoJson.forEach(element => {
        const result = cidadeJson.filter((x) => x.Estado === element.ID);
        if(result){
            fs.writeFile(`../estados/${element.Sigla}.json`, JSON.stringify(result, null, 4),  'utf8', function(err) {
                if(err) {
                    console.log(err);
                }   
            }); 
        }
    });
    console.log("Arquivos gerados com sucesso!");

}

//Criar um método que recebe como parâmetro o UF do estado, realize a leitura do arquivo JSON correspondente e retorne a quantidade de cidades daquele estado
const Exer2_QuantidadeCidadesPorEstado = (estado) => {
    const ret = fs.readFileSync(`../estados/${estado.toUpperCase()}.json`);
    if(ret){
       return JSON.parse(ret).length;
    } else {
        resultadoNaoEncontrado();
    }
}


// Criar um método que imprima no console um array com o UF dos cinco estados que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. Exemplo de impressão: [“UF - 93”, “UF - 82”, “UF - 74”, “UF - 72”, “UF - 65”]
const Exer3_5EstadosComMaisCidades = () => {
    //Retorna as 5  primeiras cidades
    const retorno = retornaCidadesPorQuantidade(5);
    if(retorno){
        console.log(retorno);
    } else {
        resultadoNaoEncontrado();
    }
}


//Criar um método que imprima no console um array com o UF dos cinco estados que menos possuem cidades, seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. Exemplo de impressão: [“UF - 30”, “UF - 27”, “UF - 25”, “UF - 23”, “UF - 21”]
const Exer4_5EstadosComMenosCidades = () => {
    //Negativo retorna as ultima 5 cidades
    const retorno = retornaCidadesPorQuantidade(-5);
    if(retorno){
        console.log(retorno);
    } else {
        resultadoNaoEncontrado();
    } 
}



//Criar um método que imprima no console um array com a cidade de maior nome de cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
const Exer5_CidadeNomeMaiorPorCadaEstado  = () => {
    var estadoJson = JSON.parse(fs.readFileSync("../json/Estados.json", "utf8"));
    if (estadoJson) {
        let estados = [];
        estadoJson.forEach(element => {
            const retorno = BuscarTamanhoNomePorCidade(element.Sigla, true);
            estados.push(retorno);
        });
        console.log(estados);
    }
    else {
        resultadoNaoEncontrado();
    }
}



// Criar um método que imprima no console um array com a cidade de menor nome de cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retorne o primeiro. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
const Exer6_CidadeNomeMenorPorCadaEstado  = () => {
    var estadoJson = JSON.parse(fs.readFileSync("../json/Estados.json", "utf8"));
    if (estadoJson) {
        let estados = [];
        estadoJson.forEach(element => {
            const retorno = BuscarTamanhoNomePorCidade(element.Sigla, false);
            estados.push(retorno);
        });
        console.log(estados);
    }
    else {
        resultadoNaoEncontrado();
    }
}



//Criar um método que imprima no console a cidade de maior nome entre todos os estados, seguido do seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro.
const Exer7_CidadeNomeMaiorEntreTodosEstados  = () => {
    var cidadesJson = JSON.parse(fs.readFileSync("../json/Cidades.json", "utf8"));
    var estadosJson = JSON.parse(fs.readFileSync("../json/Estados.json", "utf8"));
    if (cidadesJson) {

        const arrayMaiorNome = OrdenarTamanhoMaiorNome(cidadesJson);
        const cidade =  arrayMaiorNome.slice(0, 1).map(function (item) {
            let estado = estadosJson.filter(x=> x.ID === item.Estado)
            return `${item.Nome} - ${estado[0].Sigla}`;
        });
       
        console.log(cidade);
    }
    else {
        resultadoNaoEncontrado();
    }
}


// Criar um método que imprima no console a cidade de menor nome entre todos os estados, seguido do seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro.
const Exer8_CidadeNomeMenorEntreTodosEstados  = () => {
    var cidadesJson = JSON.parse(fs.readFileSync("../json/Cidades.json", "utf8"));
    var estadosJson = JSON.parse(fs.readFileSync("../json/Estados.json", "utf8"));
    if (cidadesJson) {
         
        const arrayMenorNome = OrdenarTamanhoMenorNome(cidadesJson);
        const cidade =  arrayMenorNome.slice(0, 1).map(function (item) {
            let estado = estadosJson.filter(x=> x.ID === item.Estado)
            return `${item.Nome} - ${estado[0].Sigla}`;
        });
       
        console.log(cidade);
    }
    else {
        resultadoNaoEncontrado();
    }
}


// Funções compartilhadas


// Se quantidade positiva mostra as x primeiras, se quantidade negatica mostra x ultimas
function retornaCidadesPorQuantidade(qtde) {
    const arrayEstado = CriarArrayEstadosQuantidade();
    if(arrayEstado){   
        // Ordenação descrecente pelo segundo item do array [1]
        arrayEstado.sort(function(a, b) {
            return b[1] - a[1];
          });

        let retorno;
        if(qtde > 0){
          //pega os 5 primeiros e retorna o primeiro item do array[0]
            retorno = arrayEstado.slice(0,qtde).map(function(item){
               return item[0]; 
            });
        } else {
            retorno = arrayEstado.slice(qtde).map(function(item){
               return item[0]; 
             });
        }
        return retorno;
    }
}

function resultadoNaoEncontrado() {
    console.log("Resultado Não encontrado");
}

function CriarArrayEstadosQuantidade() {
    var estadoJson = JSON.parse(fs.readFileSync("../json/Estados.json", "utf8"));
    if (estadoJson) {
        let estados = [];
        estadoJson.forEach(element => {
            const total = Exer2_QuantidadeCidadesPorEstado(element.Sigla);
            estados.push([`${element.Sigla} - ${total}`, total]);
        });
        return estados;
    }
};

function BuscarTamanhoNomePorCidade(estado, maiorTamanho) {
    const retorno = fs.readFileSync(`../estados/${estado.toUpperCase()}.json`);
    if(retorno){
        const array = JSON.parse(retorno);
        let arrayOrdenado;
        if(maiorTamanho){
           arrayOrdenado = OrdenarTamanhoMaiorNome(array); 
        } else{
            arrayOrdenado = OrdenarTamanhoMenorNome(array); 
        }
        return retornarPrimeiraCidadeArray(arrayOrdenado, estado);
    }
}


function OrdenarTamanhoMaiorNome(array) {
    array.sort(function (a, b) {
        return b.Nome.length - a.Nome.length ||
            a.Nome.localeCompare(b.Nome);
    });
    return array;
}


function OrdenarTamanhoMenorNome(array) {
    array.sort(function (a, b) {
        return a.Nome.length - b.Nome.length ||
            a.Nome.localeCompare(b.Nome);
    });
    return array;
}

function retornarPrimeiraCidadeArray(array, estado) {
    return array.slice(0, 1).map(function (item) {
        return `${item.Nome} - ${estado.toUpperCase()}`;
    });
}


// Executar Exercicios

//console.log("                                                ");
//console.log("****************** Exercício 1 ****************");
//Exer1_CriarJsonCidadePorEstado();
//console.log("                                                ");

console.log("****************** Exercício 2 ****************");
console.log(Exer2_QuantidadeCidadesPorEstado('SP'));
console.log("                                                ");


console.log("****************** Exercício 3 ****************");
Exer3_5EstadosComMaisCidades();
console.log("                                                ");


console.log("****************** Exercício 4 ****************");
Exer4_5EstadosComMenosCidades();
console.log("                                                ");

console.log("****************** Exercício 5 ****************");
Exer5_CidadeNomeMaiorPorCadaEstado();
console.log("                                                ");


console.log("****************** Exercício 6 ****************");
Exer6_CidadeNomeMenorPorCadaEstado();
console.log("                                                ");


console.log("****************** Exercício 7 ****************");
Exer7_CidadeNomeMaiorEntreTodosEstados();
console.log("                                                ");


console.log("****************** Exercício 8 ****************");
Exer8_CidadeNomeMenorEntreTodosEstados();
console.log("                                                ");


