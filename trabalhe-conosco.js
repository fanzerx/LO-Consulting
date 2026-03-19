const inputFile = document.getElementById("curriculo");
const fileName = document.getElementById("fileName");
const statusMsg = document.getElementById("statusMsg");

if (inputFile) {
    inputFile.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) {
            fileName.textContent = "Nenhum arquivo selecionado";
            return;
        }

        const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
        const maxSize = 5 * 1024 * 1024;

        if (!isPdf) {
            this.value = "";
            fileName.textContent = "Nenhum arquivo selecionado";
            statusMsg.className = "mensagem-status erro";
            statusMsg.innerHTML = "⚠️ Envie apenas arquivos PDF.";
            return;
        }

        if (file.size > maxSize) {
            this.value = "";
            fileName.textContent = "Nenhum arquivo selecionado";
            statusMsg.className = "mensagem-status erro";
            statusMsg.innerHTML = "⚠️ O PDF deve ter no máximo 5MB.";
            return;
        }

        statusMsg.className = "mensagem-status";
        statusMsg.innerHTML = "";
        fileName.textContent = "Arquivo selecionado: " + file.name;
    });
}

const params = new URLSearchParams(window.location.search);
const status = params.get("status");

if (statusMsg) {
    if (status === "sucesso") {
        statusMsg.className = "mensagem-status sucesso";
        statusMsg.innerHTML = "✅ Currículo enviado com sucesso!";
    }

    if (status === "erro") {
        statusMsg.className = "mensagem-status erro";
        statusMsg.innerHTML = "⚠️ Erro ao enviar o currículo. Tente novamente.";
    }
}