const seriesIcons = {
  "Kamen Rider": "Series Icons/SHOWA/KR Icon.webp",
  "Kamen Rider V3": "Series Icons/SHOWA/V3 Icon.webp",
  "Kamen Rider X": "Series Icons/SHOWA/X Icon.webp",
  "Kamen Rider Amazon": "Series Icons/SHOWA/AMAZON Icon.webp",
  "Kamen Rider Stronger": "Series Icons/SHOWA/STRONGER Icon.webp",
  "Kamen Rider (Skyrider)": "Series Icons/SHOWA/SKYRIDER Icon.webp",
  "Kamen Rider Super-1": "Series Icons/SHOWA/SUPER-1 Icon.webp",
  "Kamen Rider Black": "Series Icons/SHOWA/BLACK Icon.webp",
  "Kamen Rider Black RX": "Series Icons/SHOWA/BLACK RX Icon.webp",
  "Kamen Rider Kuuga": "Series Icons/HEISEI/KUUGA Icon.webp",
  "Kamen Rider Agito": "Series Icons/HEISEI/AGITO Icon.webp",
  "Kamen Rider Ryuki": "Series Icons/HEISEI/RYUKI Icon.webp",
  "Kamen Rider Faiz": "Series Icons/HEISEI/FAIZ Icon.webp",
  "Kamen Rider Blade": "Series Icons/HEISEI/BLADE Icon.webp",
  "Kamen Rider Hibiki": "Series Icons/HEISEI/HIBIKI Icon.webp",
  "Kamen Rider Kabuto": "Series Icons/HEISEI/KABUTO Icon.webp",
  "Kamen Rider Den-O": "Series Icons/HEISEI/DEN-O Icon.webp",
  "Kamen Rider Kiva": "Series Icons/HEISEI/KIVA Icon.webp",
  "Kamen Rider Decade": "Series Icons/HEISEI/DECADE Icon.webp",
  "Kamen Rider W": "Series Icons/HEISEI/W Icon.webp",
  "Kamen Rider OOO": "Series Icons/HEISEI/OOO Icon.webp",
  "Kamen Rider Fourze": "Series Icons/HEISEI/FOURZE Icon.png",
  "Kamen Rider Wizard": "Series Icons/HEISEI/WIZARD Icon.webp",
  "Kamen Rider Gaim": "Series Icons/HEISEI/GAIM Icon.webp",
  "Kamen Rider Drive": "Series Icons/HEISEI/DRIVE Icon.webp",
  "Kamen Rider Ghost": "Series Icons/HEISEI/GHOST Icon.webp",
  "Kamen Rider Ex-Aid": "Series Icons/HEISEI/EX-AID Icon.webp",
  "Kamen Rider Build": "Series Icons/HEISEI/BUILD Icon.png",
  "Kamen Rider Zi-O": "Series Icons/HEISEI/ZI-O Icon.webp",
  "Kamen Rider Zero-One": "Series Icons/REIWA/ZERO-ONE Icon.webp",
  "Kamen Rider Saber": "Series Icons/REIWA/SABER Icon.webp",
  "Kamen Rider Revice": "Series Icons/REIWA/REVICE ICON.webp",
  "Kamen Rider Geats": "Series Icons/REIWA/GEATS Icon.webp",
  "Kamen Rider Gotchard": "Series Icons/REIWA/GOTCHARD Icon.webp",
  "Kamen Rider Gavv": "Series Icons/REIWA/GAVV Icon.webp",
  "Kamen Rider Zeztz": "Series Icons/REIWA/ZEZTZ Icon.webp"
};

document.addEventListener("DOMContentLoaded", () => {
  const seriesCells = document.querySelectorAll("td.serie");
  const statusCells = document.querySelectorAll("td.status");

  // Aplica os ícones nas séries
  seriesCells.forEach(cell => {
    const serieName = cell.textContent.trim();
    const iconPath = seriesIcons[serieName];

    if (iconPath) {
      const img = document.createElement("img");
      img.src = iconPath;
      img.alt = serieName;
      img.style.width = "auto";
      img.style.height = "20px";
      img.style.verticalAlign = "middle";
      img.style.marginRight = "6px";

      cell.textContent = ""; // Limpa o texto
      cell.appendChild(img);
      cell.appendChild(document.createTextNode(serieName));
    }
  });

  // Aplica a cor nos status
  statusCells.forEach(cell => {
    const status = cell.getAttribute("data-listed");

    cell.style.padding = "6px 10px";
    cell.style.borderRadius = "0px";
    cell.style.color = "white";
    cell.style.fontWeight = "bold";

      if (status === "true") {
      cell.style.backgroundColor = "#4CAF50"; // Verde
    } else {
      cell.style.backgroundColor = "#e53935"; // Vermelho
    }

  });

  // Filtro central (série + status + mês)
  const serieFilter = document.getElementById("serie-filter");
  const statusFilter = document.getElementById("status-filter");
  const monthFilter = document.getElementById("month-filter");
function filtrarTabela() {
    const serieSelecionada = serieFilter.value;
    const statusSelecionado = statusFilter.value.toLowerCase();
    const mesSelecionado = monthFilter.value;

    const rows = document.querySelectorAll("tbody tr");
    let total = 0;
    let visiveis = 0;

    rows.forEach(row => {
        // Ignora linhas de cabeçalho de mês
        if (row.querySelector("th[colspan='6']")) {
            return;
        }

        const dateCell = row.querySelector("td");
        const serieCell = row.querySelector(".serie");
        const statusCell = row.querySelector(".ep-status"); // Alterado para ep-status

        if (!dateCell || !serieCell || !statusCell) {
            row.style.display = "none";
            return;
        }

        const serieTexto = serieCell.textContent.trim();
        const statusValor = statusCell.getAttribute("data-listed"); // Usamos o data attribute
        const statusTexto = statusValor === "true" ? "sim" : "não"; // Padronizamos para pt
        const mes = dateCell.textContent.trim().split("/")[1];

        const correspondeSerie = (serieSelecionada === "all" || serieTexto === serieSelecionada);
        const correspondeStatus = (statusSelecionado === "all" || 
                                 statusTexto === statusSelecionado);
        const correspondeMes = (mesSelecionado === "all" || mes === mesSelecionado);

        if (correspondeSerie && correspondeStatus && correspondeMes) {
            row.style.display = "";
            visiveis++;
        } else {
            row.style.display = "none";
        }
        total++;
    });

    atualizarContador(visiveis, total);
}

  // Adiciona os eventos
  serieFilter.addEventListener("change", filtrarTabela);
  statusFilter.addEventListener("change", filtrarTabela);
  monthFilter.addEventListener("change", filtrarTabela);
});

function atualizarContador() {
  const rows = document.querySelectorAll("tbody tr");
  let visiveis = 0;
  let total = 0;

  rows.forEach(row => {
    const hasEpisodeData = row.querySelector("td");
    if (hasEpisodeData) total++;

    if (hasEpisodeData && row.style.display !== "none") {
      visiveis++;
    }
  });

  const contador = document.getElementById("contador-episodios");

  if (visiveis === total) {
    contador.textContent = `Exibindo todos os ${total} episódios.`;
  } else {
    contador.textContent = `Exibindo ${visiveis} de ${total} episódio${visiveis !== 1 ? "s" : ""}.`;
  }
}