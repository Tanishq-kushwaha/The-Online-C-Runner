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


   // 1. Textarea se user ka likha hua C code nikalna
   // Dhyan rahe, humne tumhari 'editor' class ko yahan select kiya hai
   const userCode = document.querySelector('.editor').value;

   // 2. Fetch API ka use karke Wandbox ko data bhejna
   fetch("https://wandbox.org/api/compile.json", {
      method: "POST", // Hum data bhej rahe hain, isliye POST
      headers: {
         "Content-Type": "application/json" // Server ko bata rahe hain ki humara packet JSON format me hai
      },
      body: JSON.stringify({
         // JSON.stringify tumhare JS object ko ek text string me badal deta hai taaki wo internet par travel kar sake
         compiler: "gcc-head",
         code: code,
         save: false
      })
   })
      .then(response => response.json()) // Jab server jawab dega, toh usko wapas JSON me parse karna
      .then(data => {
         // 3. API ka response yahan aayega
         console.log("Wandbox API Response:", data);

         // Yahan tumhara code aayega jahan tum output ko apne '.terminal-body' me display karaoge
         // Example: document.querySelector('.terminal-body').innerText = data.program_message;
      })
      .catch(error => {
         // Agar internet nahi hai ya API down hai, toh ye block chalega
         console.error("Execution Error:", error);
      });

});

