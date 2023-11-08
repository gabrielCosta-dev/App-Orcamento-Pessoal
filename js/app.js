//Variáveis Eventos
let cadastrarDespesa = document.getElementById('cadastrarDespesa')

//Objetos Dinâmicos
class Bd{
    constructor(){
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    //Infere um novo índice
    getPróximoID(){
        let próximoID = localStorage.getItem('id')
        return Number(próximoID) + 1
    }

    //Função Registro na Memória Local
    gravar(d) {
        let id = this.getPróximoID()

        localStorage.setItem(id, JSON.stringify(d))
        
        localStorage.setItem('id', id)
    }

    //
    carregarTodosRegistros(){
        let lista_despesas = []

        let id = localStorage.getItem('id')

        for(let x = 1; x <= id; x++){
            let despesa = JSON.parse(localStorage.getItem(x))

            if (despesa === null) {
                continue
            }

            lista_despesas.push(despesa)
        }

        return lista_despesas
    }
}

let bd = new Bd()

class Despesa{
    constructor(ano, mês, dia, tipo, descrição, valor){
       this.ano = ano 
       this.mês = mês
       this.dia = dia
       this.tipo = tipo
       this.descrição = descrição
       this.valor = valor
    }

    validarDados(){
        for (const i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
            return true
        }
    }
}

//Registrar Nova Despesa
cadastrarDespesa.addEventListener('click',()=>{
    let ano = document.getElementById('ano')
    let mês = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descrição = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mês.value, dia.value, tipo.value, descrição.value, valor.value)

    //Modal
    let modal_título = document.querySelector('#modal-título')
    let modal_conteúdo = document.querySelector('#modal-conteúdo')
    let modal_botão = document.querySelector('#modal-button')
   
    if (despesa.validarDados()) {
        bd.gravar(despesa)

        //Dialog Sucesso
        $('#modalRegistraDespesa').modal('show')

        //Título
        modal_título.innerHTML = `Registro inserido com sucesso`
        modal_título.className = `text-success`
        //Conteúdo
        modal_conteúdo.innerHTML = `Despesa foi cadastrada com sucesso!`
        //Botão
        modal_botão.innerHTML = `Voltar`
        modal_botão.className = 'btn btn-success'
    } else {
        //Dialog Erro
        $('#modalRegistraDespesa').modal('show')
        
        //Título
        modal_título.innerHTML = `Erro na gravação!`
        modal_título.className = `text-danger`
        //Conteúdo
        modal_conteúdo.innerHTML = `Existem campos obrigatórios que não foram preenchidos.`
        //Botão
        modal_botão.innerHTML = `Voltar e corrigir`
        modal_botão.className = `btn btn-danger`

    }
})

//Página Consulta
function carregaListaDespesas() {
    let lista_despesas = bd.carregarTodosRegistros()

    console.log(lista_despesas);
}

