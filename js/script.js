let editor;

// Monaco Editor Initialize
require.config({
    paths: {
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs'
    }
});

require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('monaco-editor'), {
        value: `#include <stdio.h>

int main() {
    printf("Hello, World!");
    return 0;
}`,
        language: 'c',
        theme: 'vs-dark',
        automaticLayout: true,
        fontSize: 15,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        roundedSelection: true,
        padding: { top: 12 }
    });
});

// Elements
const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");
const output = document.getElementById("output");
const stdinInput = document.getElementById("stdinInput");

// Run Code
runBtn.addEventListener("click", async () => {

    // Smooth scroll to output terminal (especially useful on mobile)
    document.getElementById("terminal").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    // Loading state
    output.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <div class="spinner-border spinner-border-sm text-success"></div>
            <span>Compiling & Running...</span>
        </div>
    `;

    const userCode = editor.getValue();
    const stdin = stdinInput.value;

    try {
        const response = await fetch("https://wandbox.org/api/compile.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                compiler: "gcc-head",
                code: userCode,
                stdin: stdin,
                save: false
            })
        });

        const data = await response.json();

        if (data.compiler_error) {
            output.innerText = data.compiler_error;
        } else if (data.program_error) {
            output.innerText = data.program_error;
        } else {
            output.innerText = data.program_output || "(No output)";
        }

    } catch (error) {
        console.error("Execution Error:", error);
        output.innerText = "Error: Unable to connect to the compiler.\nPlease check your internet connection and try again.";
    }
});

// Clear Output
clearBtn.addEventListener("click", () => {
    output.innerText = "Your output will appear here...";
});