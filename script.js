// Selected the Run button
const runBtn = document.getElementById("runBtn");
// Selected the terminal
const terminal = document.getElementById("terminal");

const textArea = document.querySelector("textarea");

const terminalText = document.querySelector("p");

// When the button is clicked
runBtn.addEventListener("click", async () => {
   let code = textArea.value;
   terminalText.innerText = code;
});


const url = fetch("(https://wandbox.org/api/compile.json)")

.then(response => response.json())
.then(data => {

    console.log(data);

})
.catch(error => {

    console.error(error);

});