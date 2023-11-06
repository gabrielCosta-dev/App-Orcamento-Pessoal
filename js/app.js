//Variáveis Eventos
let cadastrarDespesa = document.getElementById('cadastrarDespesa')

class Despesa{
    constructor(ano, mês, dia, tipo, descrição, valor){
       this.ano = ano 
       this.mês = mês
       this.dia = dia
       this.tipo = tipo
       this.descrição = descrição
       this.valor = valor
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
   
    gravar(despesa)
})

//Função Registro na Memória Local
function gravar(d) {
    localStorage.setItem('despesa', JSON.stringify(d))
}