const ISR_MENSUAL = [
{li:0.01,ls:746.04,cuota:0,porcentaje:1.92},
{li:746.05,ls:6332.05,cuota:14.32,porcentaje:6.40},
{li:6332.06,ls:11128.01,cuota:371.83,porcentaje:10.88},
{li:11128.02,ls:12935.82,cuota:893.63,porcentaje:16},
{li:12935.83,ls:15487.71,cuota:1182.88,porcentaje:17.92},
{li:15487.72,ls:31236.49,cuota:1639.32,porcentaje:21.36},
{li:31236.50,ls:49233.00,cuota:4005.46,porcentaje:23.52},
{li:49233.01,ls:93993.90,cuota:8237.45,porcentaje:30},
{li:93993.91,ls:125325.20,cuota:21665.72,porcentaje:32},
{li:125325.21,ls:375975.61,cuota:31691.85,porcentaje:34},
{li:375975.62,ls:Infinity,cuota:116912.87,porcentaje:35}
];

const ISR_QUINCENAL = [
{li:0.01,ls:373.02,cuota:0,porcentaje:1.92},
{li:373.03,ls:3166.03,cuota:7.16,porcentaje:6.40},
{li:3166.04,ls:5564.01,cuota:185.92,porcentaje:10.88},
{li:5564.02,ls:6467.91,cuota:446.82,porcentaje:16},
{li:6467.92,ls:7743.86,cuota:591.44,porcentaje:17.92},
{li:7743.87,ls:15618.25,cuota:819.66,porcentaje:21.36},
{li:15618.26,ls:24616.50,cuota:2002.73,porcentaje:23.52},
{li:24616.51,ls:46996.95,cuota:4118.73,porcentaje:30},
{li:46996.96,ls:62662.60,cuota:10832.86,porcentaje:32},
{li:62662.61,ls:187987.81,cuota:15845.93,porcentaje:34},
{li:187987.82,ls:Infinity,cuota:58456.44,porcentaje:35}
];

function obtenerISR(ingreso, tabla){

    const rango = tabla.find(r =>
        ingreso >= r.li &&
        ingreso <= r.ls
    );

    const excedente = ingreso - rango.li;

    return rango.cuota +
        (excedente * rango.porcentaje / 100);
}

function formato(valor){

    return valor.toLocaleString('es-MX',{
        style:'currency',
        currency:'MXN'
    });

}

function calcular(){

    const sueldo =
        parseFloat(
            document.getElementById('sueldo').value
        );

    if(!sueldo || sueldo <= 0){

        alert("Ingresa un sueldo válido");

        return;
    }

    const periodo =
        document.getElementById('periodo').value;

    const tabla =
        periodo === 'mensual'
        ? ISR_MENSUAL
        : ISR_QUINCENAL;

    let subsidio = 0;

    if(
        periodo === 'mensual' &&
        sueldo <= 9081
    ){
        subsidio = 406.83;
    }

    if(
        periodo === 'quincenal' &&
        sueldo <= 4540.50
    ){
        subsidio = 203.42;
    }

    let isr =
        obtenerISR(
            sueldo,
            tabla
        );

    if(subsidio > isr){
        subsidio = isr;
    }

    const isrFinal =
        isr - subsidio;

    const neto =
        sueldo - isrFinal;

    document.getElementById('isr').innerText =
        formato(isrFinal);

    document.getElementById('subsidio').innerText =
        formato(subsidio);

    document.getElementById('neto').innerText =
        formato(neto);

    // Animación visual al actualizar resultados

    document.querySelectorAll('.card').forEach(card => {

        card.style.transform = 'scale(1.05)';

        setTimeout(() => {

            card.style.transform = 'scale(1)';

        }, 300);

    });

}