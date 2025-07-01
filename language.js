// lang.js

const langSelect = document.getElementById("language-select");
const lang = localStorage.getItem("lang") || "pt";
let episodesData = []; // Vamos armazenar os episódios aqui

// Seta o valor inicial do select
if (langSelect) langSelect.value = lang;

// Atualiza idioma ao mudar o select
if (langSelect) {
  langSelect.addEventListener("change", () => {
    localStorage.setItem("lang", langSelect.value);
    location.reload(); // recarrega a página com novo idioma
  });
}

// Função para carregar os episódios do JSON
async function loadEpisodesData() {
  try {
    const response = await fetch('episodes.json');
    if (!response.ok) throw new Error('Failed to load episodes data');
    episodesData = await response.json();
    return episodesData;
  } catch (error) {
    console.error('Error loading episodes data:', error);
    return [];
  }
}

// Função pra pegar o título traduzido de um episódio
function getTranslatedText(episodeId) {
  const ep = episodesData.find(e => e.id === episodeId);
  if (!ep) return '';
  return lang === "pt" ? (ep.title_pt || ep.title_en) : (ep.title_en || ep.title_pt);
}

// Função para aplicar traduções nos elementos da página
function applyTranslations(lang) {
  const t = translations[lang];

  const birthbox = document.querySelector(".birthbox");
  if (birthbox) {
    const h1 = birthbox.querySelector("h1");
    const p = birthbox.querySelector("p");
    const label = document.querySelector("label[for='birthdate']");
    const findBtn = document.querySelector("button[onclick='findEpisodes()']");
    const surpriseBtn = document.getElementById("surpriseButton");
    const shareTitle = document.querySelector("#shareModal h2");
    const screenshotBtn = document.getElementById("screenshotButton");

    if (h1) h1.innerText = t.mainTitle;
    if (p) p.innerText = t.subText;
    if (label) label.innerText = t.labelDate;
    if (findBtn) findBtn.innerText = t.findButton;
    if (surpriseBtn) surpriseBtn.innerHTML = `<i class="fas fa-random"></i> ${t.surpriseButton}`;
    if (shareTitle) shareTitle.innerText = t.shareTitle;
    if (screenshotBtn) screenshotBtn.innerText = t.saveButton;
  }

  const tablePage = document.getElementById("tablepage");
  if (tablePage) tablePage.innerText = t.TablePage;

  const epListTitle = document.querySelector(".ep-list h1");
  const epListP = document.getElementById("ep-listP");
  if (epListTitle) epListTitle.innerText = t.EpListH1;
  if (epListP) epListP.innerText = t.tablesubText;

  // Rodapé
  const footerPs = document.querySelectorAll("footer p");
  if (footerPs.length >= 3) {
    footerPs[0].innerText = t.footer1;
    footerPs[1].innerText = t.footer2;
    footerPs[2].innerHTML = `${t.footer3} <a href="https://kamenrider.fandom.com/pt/wiki/Kamen_Rider_Wiki">Kamen Rider Wiki</a>.`;
  }
}

const translations = {
  pt: {
    mainTitle: "Episódios de Kamen Rider que estreaream no seu dia do bolo!",
    subText: "Descubra qual(is) episódio(s) lançaram na sua data!",
    tablesubText: "Veja aqui o progresso de todos os episódios da franquia que estão no site",
    labelDate: "Digite sua data:",
    findButton: "Encontrar Episódio(s)",
    surpriseButton: "Me Surpreenda!",
    shareTitle: "Compartilhar nas redes sociais",
    saveButton: "Salvar como imagem",
    footer1: "© 2025 - Projeto criado por Sonnic1998/FeldsparGamer",
    footer2: "Todas as imagens e informações de Kamen Rider pertencem à Toei Company",
    footer3: "As imagens e informações foram tiradas da Kamen Rider Wiki",
    TablePage: "Tabela dos Episódios Listados",
    EpListH1: "Lista de Episódios de Kamen Rider",
    epPrefix: "Episódio",
    yes: "Sim",
    no: "Não",
    tableHeaders: ["Série", "Episódio", "Título", "Data", "Está no Site?"]
  },
  en: {
    mainTitle: "Kamen Rider Episodes that premiered on your b-day!",
    subText: "Find out which episode(s) aired on your date!",
    tablesubText: "Check out the progress of all Kamen Rider episodes that are on the site",
    labelDate: "Enter your date:",
    findButton: "Find Episode(s)",
    surpriseButton: "Surprise Me!",
    shareTitle: "Share on social media",
    saveButton: "Save as image",
    footer1: "© 2025 - Project created by Sonnic1998/FeldsparGamer",
    footer2: "All Kamen Rider images and information belong to Toei Company",
    footer3: "The images and info were taken from the Kamen Rider Wiki",
    TablePage: "Episodes table list",
    EpListH1: "Kamen Rider Episodes List",
    epPrefix: "Episode",
    yes: "Yes",
    no: "No",
    tableHeaders: ["Series", "Episode", "Title", "Date", "Is in the site?"]
  }
};

function applyTableTranslations(lang) {
  const t = translations[lang];

  // Cabeçalhos da tabela
  const headers = document.querySelectorAll("table thead th");
  if (headers.length === t.tableHeaders.length) {
    headers.forEach((th, i) => {
      th.innerText = t.tableHeaders[i];
    });
  }

  // Prefixo "Episódio" ou "Episode" antes do número
  document.querySelectorAll(".ep-number").forEach(cell => {
    const episodeNumber = cell.getAttribute("data-ep");
    if (episodeNumber) {
      cell.innerText = `${t.epPrefix} ${episodeNumber}`;
    }
  });

  // Tradução de "Sim"/"Não"
  document.querySelectorAll(".ep-status").forEach(cell => {
    const watched = cell.getAttribute("data-listed");
    cell.innerText = watched === "true" ? t.yes : t.no;
  });

  // Atualizar títulos dos episódios na tabela
  document.querySelectorAll(".ep-title").forEach(cell => {
    const episodeId = cell.getAttribute("data-ep-id");
    if (episodeId && episodesData.length > 0) {
      const translatedTitle = getTranslatedText(episodeId);
      if (translatedTitle) {
        cell.innerText = translatedTitle;
      }
    }
  });
}

// Carrega os dados e depois aplica as traduções
document.addEventListener("DOMContentLoaded", async () => {
  await loadEpisodesData();
  applyTranslations(lang);

  if (document.querySelector("table")) {
    applyTableTranslations(lang);
  }
});