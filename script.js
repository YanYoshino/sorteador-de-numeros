let ultimosParametros = null; // para guardar os últimos valores usados
let contadorResultados = 0;

document.getElementById("sortearBtn").addEventListener("click", () => {
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const inicio = parseInt(document.getElementById("inicio").value);
  const fim = parseInt(document.getElementById("fim").value);
  const naoRepetir = document.getElementById("naoRepetir").checked;

  // validações
  if (inicio > fim) {
    alert("O valor inicial deve ser menor ou igual ao final.");
    return;
  }
  if (quantidade < 1) {
    alert("A quantidade deve ser pelo menos 1.");
    return;
  }
  if (naoRepetir && quantidade > (fim - inicio + 1)) {
    alert("Quantidade maior que o intervalo disponível sem repetição.");
    return;
  }

  ultimosParametros = { quantidade, inicio, fim, naoRepetir }; // salva

  sortear(quantidade, inicio, fim, naoRepetir);
});

// Segundo botão
document.getElementById("sortearBtn-2").addEventListener("click", () => {
  if (!ultimosParametros) return; // se nunca foi sorteado antes
  sortear(
    ultimosParametros.quantidade,
    ultimosParametros.inicio,
    ultimosParametros.fim,
    ultimosParametros.naoRepetir
  );
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function sortear(quantidade, inicio, fim, naoRepetir) {
  contadorResultados++; // soma 1 a cada sorteio

  // Atualiza o texto "Xº resultado"
  document.querySelector(".new-form p").textContent = `${contadorResultados}º resultado`;

  let resultados = [];

  if (naoRepetir) {
    const pool = [];
    for (let i = inicio; i <= fim; i++) pool.push(i);
    for (let i = 0; i < quantidade; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      resultados.push(pool[idx]);
      pool.splice(idx, 1);
    }
  } else {
    for (let i = 0; i < quantidade; i++) {
      resultados.push(getRandomInt(inicio, fim));
    }
  }

  document.querySelector(".content-form").style.display = "none";
  const newForm = document.querySelector(".new-form");
  newForm.style.display = "flex";

  await mostrarResultados(resultados);
}


function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function mostrarResultados(numeros) {
  const container = document.getElementById("container-resultados");
  container.innerHTML = "";

  const botao2 = document.getElementById("sortearBtn-2");
  const newForm = document.querySelector(".new-form");

  // esconde o botão
  botao2.style.display = "none";

  // desce a new-form
  newForm.classList.add("deslocada");

  for (let i = 0; i < numeros.length; i++) {
    const num = numeros[i];

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper-resultado");

    const divResultado = document.createElement("div");
    divResultado.classList.add("resultado");

    const spanNum = document.createElement("span");
    spanNum.textContent = num;

    wrapper.appendChild(divResultado);
    wrapper.appendChild(spanNum);
    container.appendChild(wrapper);

    await esperar(4000); // tempo da animação de cada número
  }

  // volta para posição original
  newForm.classList.remove("deslocada");

  // espera o movimento voltar antes de mostrar o botão
  await esperar(500);

  // mostra o botão novamente
  botao2.style.display = "flex";
}
