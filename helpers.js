let code = '(01)90658761590686(3202)005305(13)230607(21)017900044347';
let regex = /\(\d{0,5}\)/gm; // todo: expresion para extraer los datos del codigo de barras

const helper = {
    code,
    regex
}


export default helper;