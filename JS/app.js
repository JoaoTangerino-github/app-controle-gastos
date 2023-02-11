class Despesa {
    constructor (ano , mes , dia , tipo , descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        //O Método this dentro de for in vai pegar todos os valores da classe despesa
        for(let indice in this){
            if(this[indice] == undefined || this[indice] == '' || this[indice] == null){
                return false
            }
        }
        return true
    }
}

class Bd{

    //criando ids dinamimo
constructor(){
    let id = localStorage.getItem('id')

    if(id === null) {
        localStorage.setItem('id' , 0)
    }
}

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1    
    }
    gravar(despesa){
        
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(despesa))
        localStorage.setItem('id',id)
    }
    recuperarDespesa(){
        let despesas = Array()

        let id = localStorage.getItem('id')
        for(let indice = 1; indice <= id; indice++){
            
            let despesa = JSON.parse(localStorage.getItem(indice))
            
            //verificando se á indices removidos
            if(despesa === null){
                continue
            }
            despesa.id = indice
            despesas.push(despesa)
        }
        return despesas
    }
    pesquisar(despesa){
        
        let filtroDespesa = Array()

        filtroDespesa = this.recuperarDespesa()
        // se os valores contido dentro da classe Despesa estiver vazio não será aplicado o filtro
        if(despesa.ano != ''){
            filtroDespesa = filtroDespesa.filter(d => d.ano == despesa.ano)
        }
        if(despesa.mes != ''){
            filtroDespesa = filtroDespesa.filter(d => d.mes == despesa.mes)
        }
        if(despesa.dia != ''){
            filtroDespesa = filtroDespesa.filter(d => d.dia == despesa.dia)
        }
        if(despesa.tipo != ''){
            filtroDespesa = filtroDespesa.filter(d => d.tipo == despesa.tipo)
        }
        if(despesa.descricao != ''){
            filtroDespesa = filtroDespesa.filter(d => d.descricao == despesa.descricao)
        }
        if(despesa.valor != ''){
            filtroDespesa = filtroDespesa.filter(d => d.valor == despesa.valor)
        }
        return filtroDespesa
    }
    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesa(){

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano ,mes , dia , tipo ,descricao, valor)
    
    if(despesa.validarDados()){
        bd.gravar(despesa)
        document.getElementById('titulo_msg').innerHTML = 'Dados salvos com sucesso'
        document.getElementById('color').className = 'modal-header text-success'
        document.getElementById('text_div').innerHTML = 'Seus dados foram inseridos no local storage do navegador'
        document.getElementById('btn').innerHTML = 'Voltar'
        document.getElementById('btn').className = 'btn btn-success'
        $('#msg').modal('show')

        //limpando os campos do formulario
        let limpar_form = Array('ano','mes','dia','tipo','descricao','valor')
        for(let i in limpar_form){
            document.getElementById(limpar_form[i]).value = ''
        }

    } else {
        document.getElementById('titulo_msg').innerHTML = 'Dados invalidos'
        document.getElementById('color').className = 'modal-header text-danger'
        document.getElementById('text_div').innerHTML = 'Preencha todos os campos corretamente'
        document.getElementById('btn').innerHTML = 'Corrigir'
        document.getElementById('btn').className = 'btn btn-danger'
        $('#msg').modal('show')
    }
}

function listaDespesa(){
    let despesas = Array()
    despesas =  bd.recuperarDespesa()

    // inserindo os valores na tabela
    let tabela = document.getElementById('tabela')

    despesas.forEach(function(despesa) {
        //criando as linhas
        let linha = tabela.insertRow()
        
        // criando as colunas
        linha.insertCell(0).innerHTML = `${despesa.dia}/${despesa.mes}/${despesa.ano}`
        linha.insertCell(1).innerHTML = `${despesa.tipo}`
        linha.insertCell(2).innerHTML = `${despesa.descricao}`
        linha.insertCell(3).innerHTML = `${despesa.valor}`

        // Criando botão de excluir
        let botao = document.createElement("button")
        botao.className = 'btn btn-danger'
        botao.innerHTML = '<i class="fas fa-times"></i>'
        botao.id = `id_${despesa.id}`
        botao.onclick = function(){
            
            let id = this.id.replace('id_', '')
            //alert(id)
            //chamando o método remover da classe Bd
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(botao)
        //console.log(despesa)
    })
}

function pesquisaDespesa(){

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let d = new Despesa(ano,mes,dia,tipo,descricao,valor)
    let despesas = bd.pesquisar(d) 

    let tabela = document.getElementById('tabela')
    tabela.innerHTML = ''

    despesas.forEach(function(despesa) {
        
        let linha = tabela.insertRow()
        
        
        linha.insertCell(0).innerHTML = `${despesa.dia}/${despesa.mes}/${despesa.ano}`
        linha.insertCell(1).innerHTML = `${despesa.tipo}`
        linha.insertCell(2).innerHTML = `${despesa.descricao}`
        linha.insertCell(3).innerHTML = `${despesa.valor}`

        
    })
    console.log(despesas)

}

