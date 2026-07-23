// Selected the Run button
const runBtn = document.getElementById("runBtn");
// Selected the terminal
const terminal = document.getElementById("terminal");

// When the button is clicked
runBtn.addEventListener("click", async () => {

    // Adds/removes the terminal's show class
    terminal.classList.toggle("show");

    if (terminal.classList.contains("show")) {
        runBtn.innerText = "✖ Close";
        runBtn.classList.remove("btn-success");
        runBtn.classList.add("btn-danger");
    }else{
        runBtn.innerText = "▶ Run Code";
        runBtn.classList.remove("btn-danger");
        runBtn.classList.add("btn-success");

    }
});