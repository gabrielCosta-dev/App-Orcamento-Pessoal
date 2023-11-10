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

    pesquisar(despesa){
        let despesasFiltradas = []
        despesasFiltradas = this.carregarTodosRegistros()

        //Ano
        if (despesa.ano !== '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        //Mês
        if (despesa.mês !== '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mês == despesa.mês)
        }
        //Dia
        if (despesa.dia !== '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        //Tipo
        if (despesa.tipo !== '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        //Valor
        if (despesa.valor !== '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        
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

        //Limpando Campos
        ano.value = ''; mês.value = ''; dia.value = ''; tipo.value = ''; descrição.value = ''; valor.value= ''
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

    //Tabela De Despesas
    let tabela = document.getElementById('tabela-despesas')
    lista_despesas.forEach((d)=>{
        //TR
        let linha = tabela.insertRow()

        //TD
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mês}/${d.ano}`

        //Ajuste Tipo
        switch (d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break;
            
            case '2': d.tipo = 'Educação'
                break;

            case '3': d.tipo = 'Lazer'
                break;

            case '4': d.tipo = 'Saúde'   
                break;
                
            case '5': d.tipo = 'Transporte' 
                break;
        }
        linha.insertCell(1).innerHTML = `${d.tipo}`

        linha.insertCell(2).innerHTML = `${d.descrição}`
        linha.insertCell(3).innerHTML = `${d.valor}`
    })
}



function pesquisar() {
    let ano = document.getElementById('ano')
    let mês = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descrição = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mês.value, dia.value, tipo.value, descrição.value, valor.value)

    bd.pesquisar(despesa)
}