browser.action.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, {action: "toggle"}).catch((error) => {
        console.log("Injecting content scripts");
        browser.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["./scripts/calcula-horas-estagio.js", "./scripts/sinaliza-conflitos-horario.js"]
        });
  });
});