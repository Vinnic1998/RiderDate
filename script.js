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

        const epFact = ep.fact ? `<p><strong>Curiosidade:</strong> ${ep.fact}</p>` : '';

        episodeDiv.innerHTML = `
        <hr>
        <img src="${ep.image || 'placeholder.png'}" alt="${ep.series}" class="episode-image">
        <p><img src="${seriesIcons[ep.series] || 'default-icon.png'}" alt="${ep.series} Icon" class="series-icon"><strong>${ep.series}</strong> - Episódio ${ep.episode}: ${ep.title}</p>
        <p><em>(${ep.air_date})</em></p>
        ${epFact}
        `;

        resultsDiv.appendChild(episodeDiv);
        });
    shareText += `\nConfira o seu também aqui: ${window.location.href}`;

    shareButton.style.display = "inline-block";

    shareButton.onclick = () => {
    if (navigator.share) {
        navigator.share({
        title: "Kamen Rider no meu aniversário!",
        text: shareText,
        url: window.location.href
        }).catch(err => console.error("Erro ao compartilhar:", err));
    } else {
        navigator.clipboard.writeText(shareText)
        .then(() => alert("Texto copiado! Agora é só colar e mandar pra galera!"))
        .catch(() => alert("Não foi possível copiar o texto 😢"));
    }
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
            <strong>${ep.series}</strong> - Episódio ${ep.episode}: ${ep.title}</p>
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

const seriesIcons = {
  "Kamen Rider": "Series Icons/SHOWA/KR Icon.webp",
  "Kamen Rider V3": "Series Icons/SHOWA/KR V3.webp",
  "Kamen Rider X": "Series Icons/SHOWA/KR X.webp",
  "Kamen Rider Amazon": "Series Icons/SHOWA/KR Amazon.webp",
  "Kamen Rider Stronger": "Series Icons/SHOWA/KR Stronger.webp",
  "Kamen Rider Skyrider": "Series Icons/SHOWA/KR Skyrider.webp",
  "Kamen Rider Super-1": "Series Icons/SHOWA/KR Super-1.webp",
  "Kamen Rider Black": "Series Icons/SHOWA/KR Black.webp",
  "Kamen Rider Black RX": "Series Icons/SHOWA/KR Black RX.webp",
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
  "Kamen Rider Fourze": "Series Icons/HEISEI/FOURZE Icon.webp",
  "Kamen Rider Wizard": "Series Icons/HEISEI/WIZARD Icon.webp",
  "Kamen Rider Gaim": "Series Icons/HEISEI/GAIM Icon.webp",
  "Kamen Rider Drive": "Series Icons/HEISEI/DRIVE Icon.webp",
  "Kamen Rider Ghost": "Series Icons/HEISEI/GHOST Icon.webp",
  "Kamen Rider Ex-Aid": "Series Icons/HEISEI/EX-AID Icon.webp",
  "Kamen Rider Build": "Series Icons/HEISEI/BUILD Icon.png",
  "Kamen Rider Zi-O": "Series Icons/HEISEI/Zi-O Icon.webp",
  "Kamen Rider Zero-One": "Series Icons/REIWA/ZERO-ONE Icon.webp",
  "Kamen Rider Saber": "Series Icons/HEISEI/SABER Icon.webp",
  "Kamen Rider Revice": "Series Icons/REIWA/REVICE ICON.webp",
  "Kamen Rider Geats": "Series Icons/REIWA/GEATS Icon.webp",
  "Kamen Rider Gotchard": "Series Icons/REIWA/GOTCHARD Icon.webp",
  "Kamen Rider Gavv": "Series Icons/REIWA/GAVV Icon.webp",
};


const episodes = [
  {
    series: "Kamen Rider Build",
    title: "That One with the Best Match",
    episode: 1,
    air_date: "2017-09-03",
    image: "Episodes Images/HEISEI/BUILD/BUILD_01.png"
  },
  {
    series: "Kamen Rider Zero-One",
    title: "I'm the President and a Kamen Rider",
    episode: 1,
    air_date: "2019-09-01",
    image: "Episodes Images/REIWA/ZERO ONE/ZERO ONE_01.webp"
  },
  {
    series: "Kamen Rider W",
    title: "Don't Touch the M/How to Get to Heaven",
    episode: 3,
    air_date: "2009-09-20",
    image: "Episodes Images/HEISEI/W/W_03.webp"
  },
  {
    series: "Kamen Rider Ex-Aid",
    title: "Everyone Gathers for a Clashing Crash!",
    episode: 5,
    air_date: "2016-10-30",
    image: "Episodes Images/HEISEI/EX-AID/EX-AID_05.webp"
  },
  {
    series: "Kamen Rider Gaim",
    title: "Transform! The Orange From the Sky!?",
    episode: 1,
    air_date: "2013-10-06",
    image: "Episodes Images/HEISEI/GAIM/GAIM_01.webp"
  },
  {
    series: "Kamen Rider Den-O",
    title: "I Have Arrived!",
    episode: 1,
    air_date: "2007-01-28",
    image: "Episodes Images/HEISEI/DEN-O/DEN-O_01.webp" 
  },
  {
    series: "Kamen Rider Fourze",
    title: "Youthful Transformation",
    episode: 1,
    air_date: "2011-09-04",
    image: "Episodes Images/HEISEI/FOURZE/FOURZE_01.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "School Ghost",
    episode: 3,
    air_date: "2002-02-17",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_03.webp"
  },
  {
    series: "Kamen Rider OOO",
    title: "Medals, Underwear, and a Mysterious Arm",
    episode: 1,
    air_date: "2010-09-05",
    image: "Episodes Images/HEISEI/OOO/OOO_01.webp"
  },
  {
    series: "Kamen Rider Revice",
    title: "Family! Contract! The Demon Whispers!",
    episode: 1,
    air_date: "2021-09-05",
    image: "Episodes Images/REIWA/REVICE/REVICE_01.webp"
  },
  {
    series: "Kamen Rider Revice",
    title: "Weakness Is Strength!? The Invincible Jeanne!",
    episode: 12,
    air_date: "2021-11-28",
    image: "Episodes Images/REIWA/REVICE/REVICE_12.webp"
  },
  {
    series: "Kamen Rider Kabuto",
    title: "Worst Terror VS Worst Fear",
    episode: 42,
    air_date: "2006-11-26",
    image: "Episodes Images/HEISEI/KABUTO/KABUTO_42.webp"
  },
  {
    series: "Kamen Rider Hibiki",
    title: "The Echoing Oni",
    episode: 1,
    air_date: "2005-01-30",
    image: "Episodes Images/HEISEI/HIBIKI/HIBIKI_01.webp"
  },
 {
    series: "Kamen Rider Kiva",
    title: "Fate: Wake Up!",
    episode: 1,
    air_date: "2008-01-27",
    image: "Episodes Images/HEISEI/KIVA/KIVA_01.webp"
  },
  {
    series: "Kamen Rider Build",
    title: "An Oath to Be The One",
    episode: 46,
    air_date: "2018-07-29",
    image: "Episodes Images/HEISEI/BUILD/BUILD_46.webp"
  },
 {
    series: "Kamen Rider Geats",
    title: "Genesis V: His Name Is Gya-Go!",
    episode: 43,
    air_date: "2023-07-09",
    image: "Episodes Images/REIWA/GEATS/GEATS_43.webp"
  },
 {
    series: "Kamen Rider Saber",
    title: "Chapter 45: Ten Swordsmen, Betting the World.",
    episode: 45,
    air_date: "2021-08-08",
    image: "Episodes Images/REIWA/SABER/SABER_45.webp"
  },
   {
    series: "Kamen Rider Kiva",
    title: "When the Saints Go Marching In: I Am King",
    episode: 29,
    air_date: "2008-08-24",
    image: "Episodes Images/HEISEI/KIVA/KIVA_29.webp"
  },
   {
    series: "Kamen Rider Gavv",
    title: "A Snack Kamen Rider!?",
    episode: 1,
    air_date: "2024-09-01",
    image: "Episodes Images/REIWA/GAVV/GAVV_01.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "The Girl and Ouja",
    episode: 31,
    air_date: "2002-09-01",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_31.webp"
  },
{
    series: "Kamen Rider Gotchard",
    title: "Gotcha! Hopper1!",
    episode: 1,
    air_date: "2023-09-03",
    image: "Episodes Images/REIWA/GOTCHARD/GOTCHARD_01.webp"
  },
  {
    series: "Kamen Rider OOO",
    title: "An Eel, the World, and the Gravity Combo",
    episode: 12,
    air_date: "2010-11-28",
    image: "Episodes Images/HEISEI/OOO/OOO_12.jpg"
  },
{
    series: "Kamen Rider Blade",
    title: "Leangle Revived",
    episode: 42,
    air_date: "2004-11-28",
    image: "Episodes Images/HEISEI/BLADE/BLADE_42.webp"
  },
  {
    series: "Kamen Rider Gavv",
    title: "The Reminiscent A La Mode",
    episode: 40,
    air_date: "2024-06-22",
    image: "Episodes Images/REIWA/GAVV/GAVV_40.webp"
  },
    {
    series: "Kamen Rider Gavv",
    title: "Turnaround! Awakening! Master Gavv",
    episode: 36,
    air_date: "2024-05-25",
    image: "Episodes Images/REIWA/GAVV/GAVV_36.webp"
  },
{
    series: "Kamen Rider Gavv",
    title: "The Other Side of Hatred",
    episode: 38,
    air_date: "2024-06-08",
    image: "Episodes Images/REIWA/GAVV/GAVV_38.webp"
  },
  {
    series: "Kamen Rider Gavv",
    title: "Chocolate Frappe of Bonds!",
    episode: 28,
    air_date: "2024-03-30",
    image: "Episodes Images/REIWA/GAVV/GAVV_28.webp"
  },
    {
    series: "Kamen Rider Gavv",
    title: "Miraculous Awakening! Caking",
    episode: 14,
    air_date: "2024-12-08",
    image: "Episodes Images/REIWA/GAVV/GAVV_14.webp"
  },
  {
    series: "Kamen Rider Gavv",
    title: "A Spoonful of Revival Ice Cream",
    episode: 24,
    air_date: "2025-02-23",
    image: "Episodes Images/REIWA/GAVV/GAVV_24.webp"
  },
    {
    series: "Kamen Rider Faiz",
    title: "The Start of a Trip",
    episode: 1,
    air_date: "2003-01-26",
    image: "Episodes Images/HEISEI/FAIZ/FAIZ_01.webp",
    fact: "Esse é o 600º episódio da franquia Kamen Rider!",
  },
{
    series: "Kamen Rider Agito",
    title: "Blue Storm",
    episode: 2,
    air_date: "2001-02-04",
    image: "Episodes Images/HEISEI/AGITO/AGITO_02.webp",
    fact: "Esse é o 500º episódio da franquia Kamen Rider!",
  },
  {
    series: "Kamen Rider Agito",
    title: "The Warrior's Awakening",
    episode: 1,
    air_date: "2001-01-28",
    image: "Episodes Images/HEISEI/AGITO/AGITO_01.webp",
  },
   {
    series: "Kamen Rider Kuuga",
    title: "Revival",
    episode: 1,
    air_date: "2000-01-30",
    image: "Episodes Images/HEISEI/KUUGA/KUUGA_01.webp",
    fact: "Esse é o primeiro episódio da era Heisei!",
  },
{
    series: "Kamen Rider Decade",
    title: "Welcome to the Blade Restaurant",
    episode: 8,
    air_date: "2009-03-15",
    image: "Episodes Images/HEISEI/DECADE/DECADE_08.webp",
    fact: "Esse é o 900º episódio da franquia Kamen Rider!",
  },
  {
    series: "Kamen Rider OOO",
    title: "1000, the Kamen Riders, and the Birthday",
    episode: 28,
    air_date: "2011-04-03",
    image: "Episodes Images/HEISEI/OOO/OOO_28.webp",
    fact: "Esse é o 1000º episódio da franquia Kamen Rider, também servindo como comemoração ao 40º aniversário da franquia!",
  },
    {
    series: "Kamen Rider",
    title: "The Eerie Man Spider",
    episode: 1,
    air_date: "1975-04-03",
    image: "Episodes Images/SHOWA/KR/KR_01.webp",
    fact: "Esse é o 1º episódio da franquia Kamen Rider!",
  },
  {
    series: "Kamen Rider W",
    title: "The T Returns/A Melody Not Intended for Women",
    episode: 21,
    air_date: "2010-02-07",
    image: "Episodes Images/HEISEI/W/W_21.webp"
  },
    {
    series: "Kamen Rider W",
    title: "The W Search/Two Detectives in One",
    episode: 1,
    air_date: "2009-09-06",
    image: "Episodes Images/HEISEI/W/W_01.webp"
  },
      {
    series: "Kamen Rider W",
    title: "The I Doesn't Stop/That Guy's Name Is Accel",
    episode: 19,
    air_date: "2010-01-24",
    image: "Episodes Images/HEISEI/W/W_19.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "Granting a Wish",
    episode: 49,
    air_date: "2003-01-12",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_49.webp"
  },
  {
    series: "Kamen Rider Gaim",
    title: "Gaim and Baron, Tag of Friendship!",
    episode: 13,
    air_date: "2014-01-12",
    image: "Episodes Images/HEISEI/GAIM/GAIM_13.webp"
  },
    {
    series: "Kamen Rider Zero-One",
    title: "This Is My Flowery Way of Life",
    episode: 18,
    air_date: "2020-01-12",
    image: "Episodes Images/REIWA/ZERO ONE/ZERO ONE_18.webp"
  }
];
