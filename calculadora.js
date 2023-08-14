const btnNumeros = document.querySelectorAll('.numero');
const btnOperadores = document.querySelectorAll('.operador');
const textoValorAnterior = document.getElementById('valor-anterior');
const textoValorActual = document.getElementById('valor-actual');
tipoOperacion = undefined;
var valorActual = "";
var valorAnterior = "";
signos = {
    sumar: '+',
    dividir: '/',
    multiplicar: 'x',
    restar: '-', 
}

btnNumeros.forEach(boton => {
    boton.addEventListener('click', () =>   
    agregarNumero(boton.innerHTML)
    );
});

btnOperadores.forEach(boton => {
    boton.addEventListener('click', () => 
    operacion(boton.value)
    );    
});

function agregarNumero(numero) {
    if(numero === '.' && valorActual.includes('.')) return
    valorActual = valorActual.toString() + numero.toString();
    imprimirValores();
}

function operacion(tipo) {
    tipoOperacion !== 'igual' && realizarCalculo();
    tipoOperacion = tipo;
    valorAnterior = valorActual || valorAnterior;
    valorActual = '';
    imprimirValores();
}

function imprimirValores() {
    textoValorActual.textContent = valorActual;
    textoValorAnterior.textContent = `${valorAnterior} ${signos[tipoOperacion] || ''}`;
}

function borrar() {        
        valorActual = valorActual.toString().slice(0,-1);
        imprimirValores();
    }

function  borrarTodo() {        
        valorActual = '';
        valorAnterior = '';
        tipoOperacion = undefined;
        imprimirValores();
    }

 function realizarCalculo() {
        let resultado
        let conversionValorSuperior = parseFloat(this.valorAnterior)
        let conversionValorInferior = parseFloat (this.valorActual)
        if(isNaN(conversionValorSuperior) || isNaN(conversionValorInferior)) return
        switch (this.tipoOperacion) {
            case 'sumar':
            resultado = conversionValorSuperior + conversionValorInferior
            break
            case 'restar':
            resultado = conversionValorSuperior - conversionValorInferior
            break
            case 'multiplicar':
            resultado = conversionValorSuperior * conversionValorInferior
            break
            case 'dividir':
            resultado = conversionValorSuperior / conversionValorInferior
            break
            default: return
        }
        
        valorActual = resultado
        this.tipoOperacion = undefined
        valorAnterior= ''
        imprimirValores();
    }



