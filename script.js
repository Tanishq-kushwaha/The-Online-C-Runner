// Selected the Run button
const runBtn = document.getElementById("runBtn");
// Selected the terminal
const terminal = document.getElementById("terminal");

const heading = document.querySelector("#editor");

const textArea = document.querySelector("textarea");

const terminalText = document.querySelector("p");

// When the button is clicked
runBtn.addEventListener("click", async () => {
   let code = textArea.value;
   terminalText.innerText = code;
});