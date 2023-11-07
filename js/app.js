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
   
    if (despesa.validarDados()) {
        //bd.gravar(despesa)
        //Dialog Sucesso
        console.log('Dados válidos');
    } else {
        //Dialog Erro
        console.log('Dados inválidos');
    }
})

