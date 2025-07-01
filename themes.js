document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("rider-theme");
  const body = document.body;

  // Carregar tema salvo OU aplicar o padrão
  const savedTheme = localStorage.getItem("rider-theme") || "default";
  body.classList.add(`${savedTheme}-theme`);
  select.value = savedTheme;

  select.addEventListener("change", () => {
    // Remove qualquer classe de tema atual
    body.className = body.className
      .split(" ")
      .filter(c => !c.endsWith("-theme"))
      .join(" ");

    const theme = select.value;

    // Adiciona o tema selecionado
    if (theme !== "default") {
      body.classList.add(`${theme}-theme`);
    } else {
      body.classList.add("default-theme"); // <- ESSA LINHA FAZ A MÁGICA VOLTAR
    }

    // Salva no localStorage
    localStorage.setItem("rider-theme", theme);
  });
});
