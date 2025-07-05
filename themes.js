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

    if (theme === "build") {
      carregarParticulasBuild();
    } else {
      const oldParticles = document.querySelector("#particles-js canvas");
      if (oldParticles) oldParticles.remove();
    }
  });
});

function carregarParticulasBuild() {
  const container = document.getElementById("particles-js");
  if (!container) return;

  // Evita carregar várias vezes
  if (container.querySelector("canvas")) return;

  particlesJS.load('particles-js', 'particles-config.json', function () {
    console.log('✨ Partículas estilo Build carregadas!');
  });
}