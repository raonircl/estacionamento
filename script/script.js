'use strict'

document.getElementById("formulario").addEventListener("submit". cadastrarVeiculo)

function cadastrarVeiculo(e){

    const modeloVeiculo = document.getElementById("modeloVeiculo").value;
    const placaVeiculo = document.getElementById("placaVeiculo").value;
    const horaEntrada = new Date();

    if(!modeloVeiculo && !placaVeiculo){

        alert("Preencha todos os campos!");
        return false;
    }

    const veiculo = {
        modelo: modeloVeiculo,
        placa: placaVeiculo,
        hora: horaEntrada.getHours(),
        minutos: horaEntrada.getMinutes()
    };

    if(localStorage.getItem("patio") === null){
        const veiculos = [];
        veiculos.push(veiculo);
        localStorage.setItem("patio", JSON.stringify(veiculos));
    }else{
        const veiculos = JSON.parse(localStorage.getItem("patio"));
        veiculos.push(veiculo);
        localStorage.setItem("patio", JSON.stringify(veiculos));
    }

    document.getElementById("formulario").reset();

    mostraPatio();
    e.preventDefault();

}

function removeVeiculo(placa){
    var patio = JSON.parse(localStorage.getItem("patio"));
    console.log(patio);

        for( var i = 0; i < patio.length; i++){
            if(patio[i].placa == placa){
                patio.splice(i, 1);
            }

        }
        localStorage.setItem("patio", JSON.stringify(patio));
        mostraPatio();
}
function mostraPatio(){
    const veiculos = JSON.parse(localStorage.getItem("patio"));
    const patioResultado = document.getElementById("resultados");

    patioResultado.innerHTML = "";

    for( const i = 0; i < veiculos.length; i++){
        const modelo = veiculos[i].modelo;
        const placa = veiculos[i].placa;
        const hora = veiculos[i].hora;
        const minutos = veiculos[i].minutos;
            patioResultado.innerHTML += '<tr><td>'+ modelo + '</td>'+
            '<td>'+ placa + '</td>' +
            '<td>'+ hora + ':' + minutos + '</td>' +
            '<td><button onclick="removeVeiculo(\''+ placa +'\')" class="btn btn-danger">Remover</button></td>'+
      '</tr>'; 
    }
}
