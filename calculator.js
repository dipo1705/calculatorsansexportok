let inputValue = document.getElementById("input");
const values = document.querySelectorAll(".numpad");
const displayCalcul = document.getElementById("calcul");
const equalSign = document.getElementById("equals");
const tansformInPercent = document.getElementById("percentage");
const clearInput = document.getElementById("clear");
const resetAll = document.getElementById("reset");
const plusOuMoin = document.getElementById("plusoumoins");

// Suppression de valeur par défaut sur l'ecran de la calculatrice
inputValue.value = "";
displayCalcul.innerText = "";
let preventAlotEqual = 0;
let continueComputationIndex = 0;

// Ce tableau contient les operateurs
const keys = ['plus', 'minus', 'times', 'divideby'];
const operators = [];
keys.forEach(function(key) {
  operators.push(document.getElementById(key));
})

// Cette fonction permet d'effacer le contenu de l'ecan de la calculate
function reinitializeInput() {
  doubleDotTable = []
  otherListe = []
}
// cette fonction réinitialise la calculate après une opération
function reinitializeAll() {
  if (displayCalcul.innerText.includes("=")) {
    reinitializeInput()
    inputValue.value = "";
    displayCalcul.innerText = "";
  }
}

// Ce tableau contient toutes les valeurs à entrer
let doubleDotTable = [];
let otherListe = [];

// Cette fonction permet de supprimer les "." et les "0"
function removeDot(table) {
  let withoutDoubleDot = []
  table.forEach((item) => {
    switch (item) {
      case '0':
        if (withoutDoubleDot.length >= 1 || displayCalcul.innerText !== "") {
          withoutDoubleDot.push(item)
        }
        break;
      case '.':
        if (withoutDoubleDot.length >= 1 && !withoutDoubleDot.includes(".")) {
          withoutDoubleDot.push(".")
        } else if (withoutDoubleDot.length === 0) {
          withoutDoubleDot.push("0")
          withoutDoubleDot.push(".")
        }
        break;
      default:
        withoutDoubleDot.push(item);
    }
  })
  return withoutDoubleDot
}
// Cette fonction permet d'effacer l'ecan de la calculate lorsque "C" est cliquer
function clearTheInput() {
  reinitializeInput()
  inputValue.value = "";
}

// Cette fonction permet de tout réinitialiser lorsque "AC" est cliquer
function clearAll(event) {
  event.preventDefault();
  reinitializeInput()
  inputValue.value = "";
  displayCalcul.innerText = "";
}

// Cette fonction permet de faire les opérations
function computation() {
  let newLabel = displayCalcul.innerText;
  let newLabelValue = newLabel.replace("×", "*").replace("÷", "/").replace("=", "");
  // displayCalcul.innerText = `${displayCalcul.innerText} ${inputValue.value} =`
  inputValue.value = `${eval(newLabelValue + inputValue.value)}`
}

//Cette fonction permet de faire des opérations lorsque les opérateurs sont cliqués
function changeLabelText(event, param) {
  event.preventDefault();
  if (displayCalcul.innerText !== "" || inputValue.value !== "") {
    continueComputationIndex += 1
    if (continueComputationIndex > 1) {
      computation()
    }
    displayCalcul.innerText = inputValue.value + " " + param.innerText
  }
  reinitializeInput()
  preventAlotEqual = 0
}

// Cette fonction permet de changer la valeur entreé
function changeInputValue(event) {
  reinitializeAll()
  if (displayCalcul.innerText === "") {
    doubleDotTable.push(event.target.innerText);
    inputValue.value = removeDot(doubleDotTable).join("");
  } else {
    otherListe.push(event.target.innerText);
    inputValue.value = removeDot(otherListe).join("")
  }
}

// Cette opération permet de modifier la valeur entrée
function displayInputValue(event) {
  event.addEventListener("click", changeInputValue);
}

// Cette fonction permet d'afficher le resultat lors qu'on clique sur "="
function give_result(event) {
  event.preventDefault();
  preventAlotEqual += 1;
  continueComputationIndex = 0;
  if (preventAlotEqual > 1) {
    return
  }
  displayCalcul.innerText = `${displayCalcul.innerText} ${inputValue.value} =`
  inputValue.value = ""
  computation()
}

// Cette fonction permet de transformer le resultat affiché en pourcentage"%"
function transformInPercent(event) {
  event.preventDefault();
  inputValue.value = Number(inputValue.value) / 100
}

// Cette fonction permet d'additionner ou de soustraire
function plus_moin() {
  inputValue.value = `${inputValue.value * (-1)}`
}
plusOuMoin.addEventListener("click", plus_moin)
values.forEach((value) => displayInputValue(value));
operators.forEach((operator) => operator.addEventListener("click", () => {
  changeLabelText(event, operator)
}))
equalSign.addEventListener("click", give_result);
tansformInPercent.addEventListener("click", transformInPercent);
clearInput.addEventListener("click", clearTheInput);
resetAll.addEventListener("click", clearAll);