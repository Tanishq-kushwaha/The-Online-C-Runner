// Selected the Run button
const runBtn = document.getElementById("runBtn");
// Selected the terminal
const terminal = document.getElementById("terminal");

const textArea = document.querySelector("textarea");

const terminalText = document.querySelector("pre");

// When the button is clicked
runBtn.addEventListener("click", async () => {

   // 1. Extracting the code written by the user from the textarea
   const userCode = document.querySelector('.editor').value;

   // 2. Sending data to Wandbox using the Fetch API
   fetch("https://wandbox.org/api/compile.json", {
      method: "POST",// We are sending data, so post
      headers: {
         "Content-Type": "application/json" // Informing the server that our packet is in JSON format.
      },
      body: JSON.stringify({
         //   JSON.stringify converts your JSON object into a text string so that it can travel across the internet.
         compiler: "gcc-head",
         code: userCode,
         save: false
      })
   })
      .then(response => response.json()) // When the server responds, parse it back into JSON.
      .then(data => {
         // 3. The API response will appear here.
         if (data.compiler_error) {
            terminalText.innerText = data.compiler_error;
         }
         else if (data.program_error) {
            terminalText.innerText = data.program_error;
         }
         else {
            terminalText.innerText = data.program_output;
         }
      })
      .catch(error => {
         // If there is no internet or the API is down, this block will execute.
         console.error("Execution Error:", error);
      });

});


window.addEventListener("load", () => {

   const modal = new bootstrap.Modal(
      document.getElementById("devModal")
   );

   modal.show();

});

