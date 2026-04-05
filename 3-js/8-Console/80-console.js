export function gameLog(msg, type = '') {
    const output = document.getElementById('console-output');
    if (output) {
        const div = document.createElement('div');
        div.className = type ? `log-${type}` : '';
        div.innerText = `> ${new Date().toLocaleTimeString().split(' ')[0]} - ${msg}`;
        output.prepend(div); 
    }
    console.log(msg);
}

// Ensure backward compatibility since the entire system references window.gameLog
window.gameLog = gameLog;

// Initialize the console system properly
gameLog("SYSTEM: Console Initialized", "system");
