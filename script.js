// Run Button ko select kiya
const runBtn = document.getElementById("runBtn");

// Terminal ko select kiya
const terminal = document.getElementById("terminal");


// Button click hone par
runBtn.addEventListener("click",()=>{

    // Agar terminal band hai
    // to show class add ho jayegi

    terminal.classList.toggle("show");

});