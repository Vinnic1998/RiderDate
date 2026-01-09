// lang.js

const langSelect = document.getElementById("language-select");
const lang = localStorage.getItem("lang") || "pt";
window.currentLang = lang;

// Seta o valor inicial do select
if (langSelect) langSelect.value = lang;

// Atualiza idioma ao mudar o select
if (langSelect) {
  langSelect.addEventListener("change", () => {
    localStorage.setItem("lang", langSelect.value);
    location.reload(); // recarrega a página com novo idioma
  });
}

let episodesData = []; // Variável para armazenar os episódios

// Função pra pegar o título traduzido de um episódio
function getTranslatedText(ep) {
  return lang === "pt" ? (ep.title_pt || ep.title_en) : (ep.title_en || ep.title_pt);
}

// Função pra pegar o fato traduzido
function getTranslatedFact(ep) {
  return lang === "pt" ? (ep.fact_pt || ep.fact_en) : (ep.fact_en || ep.fact_pt);
}

// Função para a palavra Curiosidade
function getFactLabel() {
  return translations[lang]?.factLabel || "Curiosidade";
}

// Função para o prefixo do episódio
function getEpisodeLabel() {
  return translations[lang]?.epPrefix || "Episódio";
}

// Função para NOVO!
function getNewLabel() {
  return translations[lang]?.NewLabel || "NOVO!";
}

// Função para EM BREVE!
function getSoonLabel() {
  return translations[lang]?.SoonLabel || "EM BREVE!";
}

// Função para datas INTERNACIONAIS (como no caso de Zeztz)
function getInternationalDateLabel() {
  return translations[lang]?.internationalDate || "Internacional";
}

// Função para aniversários 
function getBirthdayLabel(yearsDiff) { 
  if (lang === "en") {
    return `(debuted ${yearsDiff} year${yearsDiff > 1 ? "s" : ""} ago)`;
  } else {
    return `(completou ${yearsDiff} ano${yearsDiff > 1 ? "s" : ""})`;
  }
}

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
    const shareBtn = document.getElementById("shareButton");
    const soonLabel = document.getElementById("IDbreve");
    const newLabel = document.getElementById("IDnovo");
    const DebutLabel = document.getElementById("IDdebut")
    const birthdayLabel = document.querySelector("aniversario");

    if (h1) h1.innerText = t.mainTitle;
    if (p) p.innerText = t.subText;
    if (label) label.innerText = t.labelDate;
    if (findBtn) findBtn.innerText = t.findButton;
    if (surpriseBtn) surpriseBtn.innerHTML = `<i class="fas fa-random"></i> ${t.surpriseButton}`;
    if (shareTitle) shareTitle.innerText = t.shareTitle;
    if (screenshotBtn) screenshotBtn.innerText = t.saveButton;
    if (shareBtn) shareBtn.innerText = t.shareButton;
    if (soonLabel) soonLabel.innerText = t.soonLabel;
    if (newLabel) newLabel.innerText = t.newLabel;
    if (DebutLabel) DebutLabel.innerText = t.DebutLabel
    if (birthdayLabel) birthdayLabel.innerText = t.birthdayLabel;
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
    footer1: "© 2025 - Projeto criado por Sonnic1998/Vinnic1998",
    footer2: "Todas as imagens e informações de Kamen Rider pertencem à Toei Company",
    footer3: "As imagens e informações foram tiradas da Kamen Rider Wiki",
    TablePage: "Tabela dos Episódios Listados",
    EpListH1: "Lista de Episódios de Kamen Rider",
    epPrefix: "Episódio",
    yes: "Sim",
    no: "Não",
    tableHeaders: ["Série", "Episódio", "Título", "Data", "Está no Site?"],
    factLabel: "Curiosidade",
    shareButton: "Compartilhar",
    NewLabel: "NOVO",
    SoonLabel: "EM BREVE",
    DebutLabel: "lançou",
    internationalDate: "internacional",
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
    footer1: "© 2025 - Project created by Sonnic1998/Vinnic1998",
    footer2: "All Kamen Rider images and information belong to Toei Company",
    footer3: "The images and info were taken from the Kamen Rider Wiki",
    TablePage: "Episodes table list",
    EpListH1: "Kamen Rider Episodes List",
    epPrefix: "Episode",
    yes: "Yes",
    no: "No",
    tableHeaders: ["Series", "Episode", "Title", "Date", "Is in the site?"],
    factLabel: "Trivia",
    shareButton: "Share",
    NewLabel: "NEW",
    SoonLabel: "SOON",
    DebutLabel: "released",
    internationalDate: "international"
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
}

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations(lang);

  if (document.querySelector("table")) {
    applyTableTranslations(lang);
  }
});

function waitForEpisodesData() {
  return new Promise((resolve) => {
    if (episodesData && episodesData.length > 0) {
      resolve();
    } else {
      const checkInterval = setInterval(() => {
        if (episodesData && episodesData.length > 0) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    }
  });
}


// Modifique a função translateEpisodes para ser mais robusta
async function translateEpisodes() {
  try {
    await waitForEpisodesData();
    
    // Título do ep
    document.querySelectorAll("[data-translate='title']").forEach(cell => {
      const series = cell.getAttribute("data-series");
      const epNum = cell.getAttribute("data-ep");
      
      if (!series || !epNum) return;
      
      const match = episodesData.find(ep => 
        ep.series === series && ep.episode.toString() === epNum
      );
      
      if (match) {
        cell.innerText = getTranslatedText(match);
      } else {
        console.warn(`No match found for series: ${series}, episode: ${epNum}`);
      }
    });

    // Curiosidade
    document.querySelectorAll("[data-translate='fact']").forEach(cell => {
      const series = cell.getAttribute("data-series");
      const epNum = cell.getAttribute("data-ep");
      
      if (!series || !epNum) return;
      
      const match = episodesData.find(ep => 
        ep.series === series && ep.episode.toString() === epNum
      );
      
      if (match) {
        cell.innerText = getTranslatedFact(match);
      } else {
        console.warn(`No match found for series: ${series}, episode: ${epNum}`);
      }
    });
  } catch (error) {
    console.error("Error in translateEpisodes:", error);
  }
}

// Modifique o event listener para garantir a ordem correta
window.addEventListener("episodesReady", async (event) => {
  episodesData = event.detail.episodes;
  applyTranslations(lang);
  
  if (document.querySelector("table")) {
    applyTableTranslations(lang);
    await translateEpisodes();
  }
});

window.addEventListener("episodesReady", async (event) => {
  console.log("🔥 episodesReady escutado!");
  episodesData = event.detail.episodes;
  console.log("➡️ episodesData agora é:", episodesData);

  applyTranslations(lang);
  
  if (document.querySelector("table")) {
    applyTableTranslations(lang);
    await translateEpisodes();
  }
});