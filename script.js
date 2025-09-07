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
  "Kamen Rider Zeztz": "Series Icons/REIWA/ZEZTZ Icon.webp",
};

document.addEventListener("DOMContentLoaded", () => {
  fetch('episodes.json')
    .then(response => {
      if (!response.ok) throw new Error('Erro ao carregar os episódios');
      return response.json();
    })
    .then(data => {
      episodes = data;
      console.log('Episódios carregados com sucesso!');
      const episodesReadyEvent = new CustomEvent('episodesReady', {
        detail: { episodes }
      });
      window.dispatchEvent(episodesReadyEvent);
    })
    .catch(error => console.error('Erro ao carregar episódios:', error));
});

// Função para converter data
function parseDateNoTZ(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // mês começa em 0
}


// Função para labels personalizados como "NOVO!" e "Aniversário"
function getEpisodeLabels(epDateStr) {
  const today = new Date();
  const epDate = parseDateNoTZ(epDateStr);
  let labels = "";

  // NOVO! (se for hoje exatamente)
  if (
    epDate.getDate() === today.getDate() &&
    epDate.getMonth() === today.getMonth() &&
    epDate.getFullYear() === today.getFullYear()
  ) {
    labels += " <span class='novo'>NOVO!</span>";
  }
  
  // Aniversário (mesmo dia/mês, anos diferentes)
  const yearsDiff = today.getFullYear() - epDate.getFullYear();
  if (
    epDate.getDate() === today.getDate() &&
    epDate.getMonth() === today.getMonth() &&
    yearsDiff > 0
  ) {
    labels += ` <span class='aniversario'>(completou ${yearsDiff} ano${yearsDiff > 1 ? "s" : ""})</span>`;
  }

  return labels;
}

// Função para encontrar episódios
function findEpisodes() {
    const input = document.getElementById("birthdate").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!input) {
      resultsDiv.innerHTML = "<p>Por favor insira uma data válida!</p>";
      return;
    }

    const screenshotButton = document.getElementById("screenshotButton");
    screenshotButton.style.display = "inline-block";

    screenshotButton.onclick = () => {
    const elementToCapture = document.getElementById("results");
    
    html2canvas(elementToCapture, {
        useCORS: true,
        backgroundColor: "white",
        color: "black",
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "kamen-rider-aniversario.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
    };

    const userDate = new Date(input);
    const userDay = userDate.getDate();
    const userMonth = userDate.getMonth() + 1; // mês vai de 0 a 11

    const matchingEpisodes = episodes.filter(ep => {
      const epDate = new Date(ep.air_date);
      return epDate.getDate() === userDay && (epDate.getMonth() + 1) === userMonth;
    });

   if (matchingEpisodes.length > 0) {
    const shareButton = document.getElementById("shareButton");
    let shareText = `Encontrei episódio(s) de Kamen Rider lançados no dia do meu aniversário (${userDay.toString().padStart(2, '0')}/${userMonth.toString().padStart(2, '0')}):\n\n`;
    
    matchingEpisodes.forEach(ep => {
        const episodeDiv = document.createElement("div");
        episodeDiv.classList.add("episode-result");

        const extraLabel = getEpisodeLabels(ep.air_date);

        const epFactText = getTranslatedFact(ep);
        const epFact = epFactText ? `<p><strong>${getFactLabel()}:</strong> ${epFactText}</p>` : '';

        episodeDiv.innerHTML = `
          <hr>
          <img src="${ep.image || 'placeholder.png'}" alt="${ep.series}" class="episode-image">
          <p>
            <img src="${seriesIcons[ep.series] || 'default-icon.png'}" alt="${ep.series} Icon" class="series-icon">
            <strong>${ep.series}</strong> - ${getEpisodeLabel()} ${ep.episode}: ${getTranslatedText(ep)} 
            ${extraLabel}
          </p>
          <p><em>(${ep.air_date})</em></p>
          ${epFact}
        `;

        resultsDiv.appendChild(episodeDiv);
    });

    shareText += `\nConfira o seu também aqui: ${window.location.href}`;

    shareButton.style.display = "inline-block";

    const modal = document.getElementById("shareModal");
    const closeBtn = document.getElementById("closeShareModal");

    closeBtn.onclick = () => {
      modal.style.display = "none";
      shareButton.style.display = "inline-block";
    };

    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };

    shareButton.onclick = () => {
      
      modal.style.display = "flex";
      shareButton.style.display = "none";
      document.getElementById("socialShare").style.display = "block";

      const encodedText = encodeURIComponent(shareText);
      const encodedURL = encodeURIComponent(window.location.href);

      document.getElementById("twitterShare").href = `https://twitter.com/intent/tweet?text=${encodedText}`;
      document.getElementById("whatsappShare").href = `https://wa.me/?text=${encodedText}`;
      document.getElementById("bskyShare").href = `https://bsky.app/intent/compose?text=${encodedText}`;
      document.getElementById("instagramShare").href = `https://www.instagram.com`; 
      document.getElementById("discordShare").href = `https://discord.com/invite/seulink`; 
    };
    } else {
    const maxOffset = 3; 
    const nearbyEpisodes = episodes
        .map(ep => {
        const epDate = new Date(ep.air_date);
        const diffDays = Math.abs((epDate - userDate) / (1000 * 60 * 60 * 24));
        return { ...ep, diffDays };
        })
        .filter(ep => ep.diffDays <= maxOffset)
        .sort((a, b) => a.diffDays - b.diffDays);

    if (nearbyEpisodes.length > 0) {
        resultsDiv.innerHTML = "<p>Sem episódios no seu dia... mas olha só o que saiu pertinho!</p>";
        
        nearbyEpisodes.forEach(ep => {
          const episodeDiv = document.createElement("div");
          episodeDiv.classList.add("episode-result");

          const extraLabel = getEpisodeLabels(ep.air_date);

          episodeDiv.innerHTML = `
              <hr>
              <img src="${ep.image || 'placeholder.png'}" alt="${ep.series}" class="episode-image">
              <p>
                <img src="${seriesIcons[ep.series] || 'default-icon.png'}" alt="${ep.series} Icon" class="series-icon">
                <strong>${ep.series}</strong> - Episódio ${ep.episode}: ${getTranslatedText(ep)} 
                ${extraLabel}
              </p>
              <p><em>(${ep.air_date}) - ${ep.diffDays === 1 ? "1 dia" : `${ep.diffDays} dias`} de diferença</em></p>
          `;

          resultsDiv.appendChild(episodeDiv);
        });

        document.getElementById("shareButton").style.display = "none";
        document.getElementById("screenshotButton").style.display = "inline-block";

    } else {
        resultsDiv.innerHTML = "<p>Sem episódios de Kamen Rider no seu dia... nem por perto 😢</p>";
        document.getElementById("shareButton").style.display = "none";
        document.getElementById("screenshotButton").style.display = "none";
    }
    }
  }

const surpriseBtn = document.getElementById("surpriseButton");

if (surpriseBtn) {
  surpriseBtn.addEventListener("click", () => {
    const randomDate = getRandomDate();
    const input = document.getElementById("birthdate");
    input.value = randomDate.toISOString().slice(0, 10); // Formato YYYY-MM-DD
    findEpisodes(); // Já executa a busca direto
  });
}

function getRandomDate() {
  const year = Math.floor(Math.random() * (2024 - 1971 + 1)) + 1971; // Entre 1971 e 2024
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1; // Evita dias inválidos tipo 30/02

  return new Date(year, month, day);
}

window.episodes = episodes; 

setTimeout(() => {
  if (typeof translateEpisodes === "function") {
    translateEpisodes(); // força uma tradução extra depois de tudo
  }
}, 300); // 300ms de delay só pra garantir que o DOM esteja pronto