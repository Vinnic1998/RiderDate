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

        const epFactText = getTranslatedFact(ep);
        const epFact = epFactText ? `<p><strong>${getFactLabel()}:</strong> ${epFactText}</p>` : '';

        episodeDiv.innerHTML = `
        <hr>
        <img src="${ep.image || 'placeholder.png'}" alt="${ep.series}" class="episode-image">
        <p><img src="${seriesIcons[ep.series] || 'default-icon.png'}" alt="${ep.series} Icon" class="series-icon"><strong>${ep.series}</strong> - ${getEpisodeLabel()} ${ep.episode}: ${getTranslatedText(ep)}</p>
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

        episodeDiv.innerHTML = `
            <hr>
            <img src="${ep.image || 'placeholder.png'}" alt="${ep.series}" class="episode-image">
            <p><img src="${seriesIcons[ep.series] || 'default-icon.png'}" alt="${ep.series} Icon" class="series-icon">
            <strong>${ep.series}</strong> - Episódio ${ep.episode}: ${getTranslatedText(ep)}</p>
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
