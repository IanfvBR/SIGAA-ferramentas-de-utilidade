const caixa_total_horas = document.getElementById("form:cargaHorariaSemanal");
const caixa_total_minutos = document.getElementById("form:minutosCargaHoraria");
const tabela_horario = document.getElementById("form:t1d2horainicio").closest("table");
const horas_input = tabela_horario.getElementsByTagName("input");
let ativo = true;


function transforma_para_minutos(string_horario) {
    const horario = string_horario.split(":");

    if (horario.length > 0) {
        if (horario.length > 1) {
            return Number(horario[0]) * 60 + Number(horario[1]);
        }

        return Number(horario[0]) * 60; // Quando o usuario nao informa os minutos
    }    
}


function clicou_na_caixa(event) {
    if(ativo) {
        let total_minutos = 0;

        for (let index = 0; index < horas_input.length; index += 2) {
            const horario_entrada = horas_input[index].value;
            const horario_saida = horas_input[index + 1].value;

            if (horario_entrada.length > 0 && horario_saida.length > 0) {
                total_minutos += transforma_para_minutos(horario_saida)
                                - transforma_para_minutos(horario_entrada);
            }
        }

        caixa_total_horas.value = String(Math.floor(total_minutos / 60)).padStart(2, '0');
        caixa_total_minutos.value = String(total_minutos % 60).padStart(2, '0');
    }
}

// Listen for deactivation message
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "toggle") {
    ativo = !ativo;
  }
});


caixa_total_horas.addEventListener("mouseenter", clicou_na_caixa);
caixa_total_minutos.addEventListener("mouseenter", clicou_na_caixa);
