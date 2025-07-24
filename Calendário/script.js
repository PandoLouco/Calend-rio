const pessoas = ["Rodrigo", "Renata", "Juliana", "Marcelo", "Paula", "Lara", "Victor"];
const calendarioEl = document.getElementById("calendario");
const mesAnoEl = document.getElementById("mesAno");
const feriadosEl = document.getElementById("feriados");

const hoje = new Date();
const mesAtual = hoje.getMonth(); // 0-11
const anoAtual = hoje.getFullYear();
const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

const nomesDiasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

// Exemplo de feriados (você pode alterar ou carregar dinamicamente)
const feriados = {
  7: "Dia da Independência da Bolívia",
  15: "Assunção de Nossa Senhora"
};

// estadoDia[pessoa][dia] = 0: home, 1: presencial, 2: férias, 3: folga compensativa
const estadoDia = [];
for (let i = 0; i < pessoas.length; i++) {
  estadoDia.push(new Array(diasNoMes).fill(0));
}

function trocarPessoa(index) {
  calendarioEl.innerHTML = "";

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const div = document.createElement("div");
    div.className = "dia";

    // Obter o dia da semana
    const diaSemana = new Date(anoAtual, mesAtual, dia).getDay();

    // Montar elementos internos
    const spanSemana = document.createElement("span");
    spanSemana.className = "semana";
    spanSemana.textContent = nomesDiasSemana[diaSemana];

    const spanNumero = document.createElement("span");
    spanNumero.className = "numero";
    spanNumero.textContent = dia;

    div.appendChild(spanSemana);
    div.appendChild(spanNumero);

    // Sábados e domingos são folga fixa e não clicáveis
    if (diaSemana === 0 || diaSemana === 6) {
      div.classList.add("folga");
      div.title = "Folga fixa (sábado/domingo)";
    } 
    // Feriado (não clicável)
    else if (feriados[dia]) {
      div.classList.add("feriado");
      div.title = feriados[dia];
    }
    else {
      // Status clicáveis: home, presencial, férias, folga compensativa
      atualizarClasse(div, estadoDia[index][dia - 1]);
      div.onclick = () => {
        estadoDia[index][dia - 1] = (estadoDia[index][dia - 1] + 1) % 4;
        atualizarClasse(div, estadoDia[index][dia - 1]);
      };
    }

    calendarioEl.appendChild(div);
  }

  // Atualiza título com mês/ano
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  mesAnoEl.innerText = `${meses[mesAtual]} de ${anoAtual}`;

  // Atualiza lista de feriados
  feriadosEl.innerHTML = "";
  for (const [dia, nome] of Object.entries(feriados)) {
    const item = document.createElement("li");
    item.innerText = `${dia}/${mesAtual + 1}: ${nome}`;
    feriadosEl.appendChild(item);
  }
}

function atualizarClasse(div, estado) {
  div.classList.remove("home", "presencial", "ferias", "compensativa");
  if (estado === 0) div.classList.add("home");
  else if (estado === 1) div.classList.add("presencial");
  else if (estado === 2) div.classList.add("ferias");
  else if (estado === 3) div.classList.add("compensativa");
}

// Iniciar com Rodrigo selecionado
trocarPessoa(0);
