// Inicializaciones
const weapon = ["✊", "✋", "✌"];

/* LocalStorage: inicializo con lo que haya en el LS (me traigo lo que haya en el LS) o con 0 (si
no hay nada) para cada score.
const humanCounterScore = JSON.parse(localStorage.getItem("human")) || 0;
const computerCounterScore = JSON.parse(localStorage.getItem("computer")) || 0;
*/

let humanLocalScore = JSON.parse(localStorage.getItem("human")) || 0;
let computerLocalScore = JSON.parse(localStorage.getItem("computer")) || 0;

// Seleccionar elementos HTML
const humanScore = document.getElementById("humanScore");
humanScore.innerText = "0";

const computerScore = document.getElementById("computerScore");
computerScore.innerText = "0";

const info = document.getElementById("info");
info.innerText = "Elija su arma...";

const computerInfo = document.getElementById("computer");

const rock = document.getElementById("rock");
rock.addEventListener("click", () => play("✊")); //play(rock.innerText)

const paper = document.getElementById("paper");
paper.addEventListener("click", () => play(paper.innerText));

const scissor = document.getElementById("scissor");
scissor.addEventListener("click", () => play(scissor.innerText));

// Trabajo con la lógica
const randomWeapon = () => {
  const result = Math.floor(Math.random() * 3);
  console.log(weapon[result]);
  return weapon[result];
};

const play = (humanWeapon) => {
  const computerWeapon = randomWeapon();
  let result = "";
  // Casos en los que yo gano
  // humanWeapon === 0 computerWeapon === 2
  // humanWeapon === 1 computerWeapon === 0
  // humanWeapon === 2 computerWeapon === 1
  if (humanWeapon === computerWeapon) {
    result = "Empate !";
  } else if (
    (humanWeapon === "✊" && computerWeapon === "✌") ||
    (humanWeapon === "✋" && computerWeapon === "✊") ||
    (humanWeapon === "✌" && computerWeapon === "✋")
  ) {
    result = "Ud. es el ganador";
    humanLocalScore = parseInt(humanLocalScore) + 1;
    localStorage.setItem("human", JSON.stringify(humanLocalScore));

    /*Sumo al score que corresponde y puso el valor del LS con el nuevo. Cada vez que hago una 
    operación sobre ese dato, le tengo que hacer lo mismo al LS, piso con ese dato lo que haya en
    el LS, le sumo humanScore++...localStorage.setItem... y le meto el nuevo valor.
     */ //humanCounterScore++;
  } else {
    result = "Gana la computadora";
    computerLocalScore = parseInt(computerLocalScore) + 1;
    localStorage.setItem("computer", JSON.stringify(computerLocalScore));
  }

  computerInfo.innerText = "Su oponente está eligiendo el arma";
  info.innerHTML = "Procesando";

  setTimeout(() => {
    computerInfo.innerText = `La computadora eligió ${computerWeapon}`;
    info.innerHTML = result;

    if (result === "Ud. es el ganador") {
      humanScore.innerText = parseInt(humanScore.innerText) + 1;
    } else if (result === "Gana la computadora") {
      computerScore.innerText = parseInt(computerScore.innerText) + 1;
    }
  }, 1000);
};
