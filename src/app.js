import { promises } from "fs";
const { readFile, writeFile } = promises

// Variaveis Globais
global.cidadeJson = "";
global.estadoJson = "";

// Executar Exercicios
init();

async function init() {

    global.estadoJson = await carregarEstadoJson();
    global.cidadeJson = await carregarCidadeJson();

    console.log("                                                ");
    console.log("****************** Exercício 1 ****************");
    await CriarArquivosJsonPorEstado();

    //console.log("                                                ");
    console.log("****************** Exercício 2 ****************");
    console.log(await RetornarQuantidadeCidadesPorEstado('SP'));
    console.log("                                                ");

    // Para primeiras Maiores x cidades, qtde positivo mostra maiores cidades
    console.log("****************** Exercício 3 ****************");
    await RetornarEstadosComMaisCidadesOuMenosCidades(5);
    console.log("                                                ");

   // Para primeiras Menores x cidades, qtde negativo mostra menores cidades
    console.log("****************** Exercício 4 ****************");
    await RetornarEstadosComMaisCidadesOuMenosCidades(-5);
    console.log("                                                ");

    console.log("****************** Exercício 5 ****************");
    // Para Maior Cidade parametro true
    await BuscarMaiorOuMenorCidade(true);
    console.log("                                                ");

    // Para Menor Cidade parametro false
    console.log("****************** Exercício 6 ****************");
    await BuscarMaiorOuMenorCidade(false);
    console.log("                                                ");

    console.log("****************** Exercício 7 ****************");
    await RetornarNomeCidadeMaiorOuMenorEntreTodosEstados(true);
    console.log("                                                ");

    console.log("****************** Exercício 8 ****************");
    await RetornarNomeCidadeMaiorOuMenorEntreTodosEstados(false);
    console.log("                                                ");
}

async function carregarEstadoJson()  {
    try {
        const dataEstado = await readFile("./json/Estados.json", "utf-8");
        return JSON.parse(dataEstado);
    } catch (error) {
        console.log(error)
    }
}

async function carregarCidadeJson(){
    try {
        const dataCidade = await readFile("./json/Cidades.json", "utf-8");
        return JSON.parse(dataCidade);
    } catch (error) {
        console.log(error)
    }
}

//Exercicio 1
// Implementar um método que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser o UF do estado, por exemplo: MG.json.
async function CriarArquivosJsonPorEstado() {
    try {
        const estado = global.estadoJson;
        const cidade = global.cidadeJson;
        estado.forEach(async element => {
            const result = cidade.filter((x) => x.Estado === element.ID);
            if (result) {
                await writeFile(`./estados/${element.Sigla}.json`, JSON.stringify(result, null, 4), 'utf8')
            }
        });
        console.log("Arquivos gerados com sucesso!");

    } catch (error) {
        console.log(error)
    }
}

//Exercicio 2
//Criar um método que recebe como parâmetro o UF do estado, realize a leitura do arquivo JSON correspondente e retorne a quantidade de cidades daquele estado
async function RetornarQuantidadeCidadesPorEstado(estado) {
    try {
        const retorno = await readFile(`./estados/${estado.toUpperCase()}.json`);
        if (retorno) return JSON.parse(retorno).length;
        else ResultadoNaoEncontrado();
    } catch (error) {
        console.log(error)
    }
}


//Exercicio 4 e 4
//Exercicio 3 - Parametro maior = true -  Criar um método que imprima no console um array com o UF dos cinco estados que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. Exemplo de impressão: [“UF - 93”, “UF - 82”, “UF - 74”, “UF - 72”, “UF - 65”]
//Exercicio 4 - Parametro maior = false - //Criar um método que imprima no console um array com o UF dos cinco estados que menos possuem cidades, seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. Exemplo de impressão: [“UF - 30”, “UF - 27”, “UF - 25”, “UF - 23”, “UF - 21”]
async function RetornarEstadosComMaisCidadesOuMenosCidades(qtde) {
    //Retorna as  x qtdes das primeiras cidades
    try {
        const retorno = await RetornarArrayEstadosQuantidade(qtde);
        if (retorno) console.log(retorno);
        else ResultadoNaoEncontrado();
    } catch (error) {
        console.log(error)
    }

}

//Exercicio 5 e 6
//Exercicio 5 - Parametro maior = true - Criar um método que imprima no console um array com a cidade de maior nome de cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
//Exercicio 6 - Parametro maior = false - Criar um método que imprima no console um array com a cidade de menor nome de cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retorne o primeiro. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
async function BuscarMaiorOuMenorCidade(maior) {
    try {
        if (global.estadoJson) {
            let estados = [];
            for (const estado of global.estadoJson) {
                const retorno = await BuscarTamanhoNomePorCidade(estado.Sigla, maior);
                estados.push(retorno);
            }
            console.log(estados);
        }
        else ResultadoNaoEncontrado();
    } catch (error) { console.log(error); }
}

//Exercicio 7 e 8
//Exercicio 7 - Parametro maior = true - Criar um método que imprima no console a cidade de maior nome entre todos os estados, seguido do seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro.
//Exercicio 8 - Parametro maior = false - Criar um método que imprima no console a cidade de menor nome entre todos os estados, seguido do seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro.

async function RetornarNomeCidadeMaiorOuMenorEntreTodosEstados(maior) {
    try {
        if (global.cidadeJson) {
            const retorno = maior ? OrdenarTamanhoMaiorNome(global.cidadeJson) : OrdenarTamanhoMenorNome(global.cidadeJson);
            const cidade = retorno.slice(0, 1).map(function (item) {
                let estado = global.estadoJson.filter(x => x.ID === item.Estado)
                return `${item.Nome} - ${estado[0].Sigla}`;
            });

            console.log(cidade);
        }
        else {
            ResultadoNaoEncontrado();
        }
    } catch (error) {
        console.log(error)
    }

}


// Funções compartilhadas
function ResultadoNaoEncontrado() {
    console.log("Resultado não encontrado");
}

// Retorna array de qtde cidades
async function RetornarArrayEstadosQuantidade(qtde) {
    try {
        if (global.estadoJson) {
            let estados = [];
            for (const estado of global.estadoJson) {
                const total = await RetornarQuantidadeCidadesPorEstado(estado.Sigla);
                estados.push(([`${estado.Sigla} - ${total}`, total]));
            };
            estados.sort(function (a, b) {
                return b[1] - a[1];
            });

            let dados = qtde > 0 ? estados.slice(0, qtde).map(function (item) { return item[0]; }) : estados.slice(qtde).map(function (item) { return item[0]; });
            return dados;
            //pega os qtde primeiros e retorna o primeiro item do array[0]
        }
    } catch (error) {
        console.log(error)
    }

};

async function BuscarTamanhoNomePorCidade(estado, maiorTamanho) {
    try {
        const retorno = await readFile(`./estados/${estado.toUpperCase()}.json`);
        if (retorno) {
            const array = JSON.parse(retorno);
            let arrayOrdenado = maiorTamanho ? OrdenarTamanhoMaiorNome(array) : OrdenarTamanhoMenorNome(array);
            return RetornarPrimeiraCidadeArray(arrayOrdenado, estado);
        }
    } catch (error) {
        console.log(error)
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

function RetornarPrimeiraCidadeArray(array, estado) {
    return array.slice(0, 1).map(function (item) {
        return `${item.Nome} - ${estado.toUpperCase()}`;
    });
}



