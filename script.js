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
};

const episodes = [
  {
    series: "Kamen Rider",
    title: "The Eerie Man Spider",
    episode: 1,
    air_date: "1971-04-03",
    image: "Episodes Images/SHOWA/KR/KR_01.webp",
    fact: "Esse é o 1º episódio da franquia Kamen Rider, também o da Era Showa",
  },
  {
    series: "Kamen Rider",
    title: "Gel Shocker Destroyed! The Leader's End!!",
    episode: 98,
    air_date: "1973-02-10",
    image: "Episodes Images/SHOWA/KR/KR_98.webp",
  },
  {
    series: "Kamen Rider V3",
    title: "Rider No. 3: His Name is V3!",
    episode: 1,
    air_date: "1973-02-17",
    image: "Episodes Images/SHOWA/V3/V3_01.webp"
  },
  {
    series: "Kamen Rider V3",
    title: "The Last Day of Destron",
    episode: 52,
    air_date: "1974-02-09",
    image: "Episodes Images/SHOWA/V3/V3_52.webp"
  },
  {
    series: "Kamen Rider X",
    title: "X-X-X-Rider is Born!!",
    episode: 1,
    air_date: "1974-02-16",
    image: "Episodes Images/SHOWA/X/X_01.webp"
  },
  {
    series: "Kamen Rider X",
    title: "Farewell, X-Rider",
    episode: 35,
    air_date: "1974-10-12",
    image: "Episodes Images/SHOWA/X/X_35.webp"
  },
  {
    series: "Kamen Rider Amazon",
    title: "Man or Beast? The Cool Guy Who Came From the Jungle!",
    episode: 1,
    air_date: "1974-10-19",
    image: "Episodes Images/SHOWA/AMAZON/AMAZON_01.webp"
  },
  {
    series: "Kamen Rider Amazon",
    title: "You Did It, Amazon!! The End of Zero the Great!!",
    episode: 24,
    air_date: "1975-03-29",
    image: "Episodes Images/SHOWA/AMAZON/AMAZON_24.webp"
  },
  {
    series: "Kamen Rider Stronger",
    title: "I am the Electric Human Stronger!!",
    episode: 1,
    air_date: "1975-04-05",
    image: "Episodes Images/SHOWA/STRONGER/STRONGER_01.webp",
  },
  {
    series: "Kamen Rider Stronger",
    title: "Goodbye! The Glorious Seven Riders!",
    episode: 39,
    air_date: "1975-12-27",
    image: "Episodes Images/SHOWA/STRONGER/STRONGER_39.webp",
  },
  {
    series: "Kamen Rider (Skyrider)",
    title: "A Cyborg Flies in the Sky",
    episode: 1,
    air_date: "1979-10-05",
    image: "Episodes Images/SHOWA/SKYRIDER/SKYRIDER_01.webp",
  },
  {
    series: "Kamen Rider (Skyrider)",
    title: "Farewell, Hiroshi Tsukuba! Eight Heroes Forever....",
    episode: 54,
    air_date: "1980-10-10",
    image: "Episodes Images/SHOWA/SKYRIDER/SKYRIDER_54.webp",
  },
  {
    series: "Kamen Rider Super-1",
    title: "The Planetary Cyborg's Great Transformation",
    episode: 1,
    air_date: "1980-10-17",
    image: "Episodes Images/SHOWA/SUPER-1/SUPER-1_01.webp",
  },
  {
    series: "Kamen Rider Super-1",
    title: "Farewell, Earth! Kazuya Heads Off to Space!!",
    episode: 48,
    air_date: "1981-10-03",
    image: "Episodes Images/SHOWA/SUPER-1/SUPER-1_48.webp",
  },
  {
    series: "Kamen Rider Black",
    title: "Black!! Transformation",
    episode: 1,
    air_date: "1987-10-04",
    image: "Episodes Images/SHOWA/BLACK/BLACK_01.webp",
  },
  {
    series: "Kamen Rider Black",
    title: "Gorgom's Last Day",
    episode: 51,
    air_date: "1988-10-09",
    image: "Episodes Images/SHOWA/BLACK/BLACK_51.webp",
  },
  {
    series: "Kamen Rider Black RX",
    title: "Child of the Sun! RX",
    episode: 1,
    air_date: "1988-10-23",
    image: "Episodes Images/SHOWA/BLACK RX/RX_01.webp",
  },
  {
    series: "Kamen Rider Black RX",
    title: "A Shining Tomorrow!",
    episode: 47,
    air_date: "1989-09-24",
    image: "Episodes Images/SHOWA/BLACK RX/RX_47.webp",
    fact: "Esse é o último episódio da Era Showa",

  },
  {
    series: "Kamen Rider Kuuga",
    title: "Revival",
    episode: 1,
    air_date: "2000-01-30",
    image: "Episodes Images/HEISEI/KUUGA/KUUGA_01.webp",
    fact: "Esse é o 1º episódio da era Heisei",
  },
  {
    series: "Kamen Rider Kuuga",
    title: "Teacher",
    episode: 12,
    air_date: "2000-04-16",
    image: "Episodes Images/HEISEI/KUUGA/KUUGA_12.webp",
  },
  {
    series: "Kamen Rider Kuuga",
    title: "Approach",
    episode: 37,
    air_date: "2000-10-22",
    image: "Episodes Images/HEISEI/KUUGA/KUUGA_37.webp"
  },
  {
    series: "Kamen Rider Kuuga",
    title: "Yusuke",
    episode: 49,
    air_date: "2001-01-21",
    image: "Episodes Images/HEISEI/KUUGA/KUUGA_49.webp"
  },
  {
    series: "Kamen Rider Agito",
    title: "The Warrior's Awakening",
    episode: 1,
    air_date: "2001-01-28",
    image: "Episodes Images/HEISEI/AGITO/AGITO_01.webp",
  },
  {
    series: "Kamen Rider Agito",
    title: "Blue Storm",
    episode: 2,
    air_date: "2001-02-04",
    image: "Episodes Images/HEISEI/AGITO/AGITO_02.webp",
    fact: "Esse é o 500º episódio da franquia Kamen Rider",
  },
  {
    series: "Kamen Rider Agito",
    title: "The Two G3s",
    episode: 9,
    air_date: "2001-03-25",
    image: "Episodes Images/HEISEI/AGITO/AGITO_09.webp",
  },
  {
    series: "Kamen Rider Agito",
    title: "Silver Points and Lines",
    episode: 10,
    air_date: "2001-04-01",
    image: "Episodes Images/HEISEI/AGITO/AGITO_10.webp",
  },
  {
    series: "Kamen Rider Agito",
    title: "Warriors, Those Bonds",
    episode: 46,
    air_date: "2001-12-23",
    image: "Episodes Images/HEISEI/AGITO/AGITO_46.webp",
  },
  {
    series: "Kamen Rider Agito",
    title: "AGITΩ",
    episode: 51,
    air_date: "2002-01-27",
    image: "Episodes Images/HEISEI/AGITO/AGITO_51.webp",
  },
  {
    series: "Kamen Rider Ryuki",
    title: "The Secret Story's Birth",
    episode: 1,
    air_date: "2002-02-03",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_01.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "Giant Spider Counterattack",
    episode: 2,
    air_date: "2002-02-10",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_02.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "School Ghost",
    episode: 3,
    air_date: "2002-02-17",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_03.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "Raia's Revenge",
    episode: 22,
    air_date: "2002-06-30",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_22.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "Changing Destiny",
    episode: 23,
    air_date: "2002-07-07",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_23.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "The Girl and Ouja",
    episode: 31,
    air_date: "2002-09-01",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_31.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "Friendship's Battle",
    episode: 34,
    air_date: "2002-09-22",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_34.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "Enter Tiger",
    episode: 35,
    air_date: "2002-09-29",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_35.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "The Battle Ends",
    episode: 36,
    air_date: "2002-10-06",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_36.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "Granting a Wish",
    episode: 49,
    air_date: "2003-01-12",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_49.webp"
  },
  {
    series: "Kamen Rider Ryuki",
    title: "A New Life",
    episode: 50,
    air_date: "2003-01-19",
    image: "Episodes Images/HEISEI/RYUKI/RYUKI_50.webp"
  },
  {
    series: "Kamen Rider Faiz",
    title: "The Start of a Trip",
    episode: 1,
    air_date: "2003-01-26",
    image: "Episodes Images/HEISEI/FAIZ/FAIZ_01.webp",
    fact: "Esse é o 600º episódio da franquia Kamen Rider",
  },
  {
    series: "Kamen Rider Faiz",
    title: "The Resurrection Riddle",
    episode: 35,
    air_date: "2003-09-28",
    image: "Episodes Images/HEISEI/FAIZ/FAIZ_35.webp"
  },
  {
    series: "Kamen Rider Faiz",
    title: "Capture Commences",
    episode: 41,
    air_date: "2003-11-16",
    image: "Episodes Images/HEISEI/FAIZ/FAIZ_41.webp"
  },
  {
    series: "Kamen Rider Faiz",
    title: "My Dream",
    episode: 50,
    air_date: "2004-01-18",
    image: "Episodes Images/HEISEI/FAIZ/FAIZ_50.webp"
  },
  {
    series: "Kamen Rider Blade",
    title: "The Indigo Warrior",
    episode: 1,
    air_date: "2004-01-25",
    image: "Episodes Images/HEISEI/BLADE/BLADE_01.webp"
  },
  {
    series: "Kamen Rider Blade",
    title: "The Power Which Moves Me",
    episode: 26,
    air_date: "2004-07-25",
    image: "Episodes Images/HEISEI/BLADE/BLADE_26.webp",
    fact: "Debut da forma Jack do Blade"
  },
  {
    series: "Kamen Rider Blade",
    title: "Lost Memories",
    episode: 30,
    air_date: "2004-08-22",
    image: "Episodes Images/HEISEI/BLADE/BLADE_30.webp",
    fact: "Debut da forma Jack do Garren"
  },
  {
    series: "Kamen Rider Blade",
    title: "Category King",
    episode: 34,
    air_date: "2004-09-26",
    image: "Episodes Images/HEISEI/BLADE/BLADE_34.webp",
    fact: "Debut da forma King do Blade"
  },
  {
    series: "Kamen Rider Blade",
    title: "Leangle Revived",
    episode: 42,
    air_date: "2004-11-28",
    image: "Episodes Images/HEISEI/BLADE/BLADE_42.webp"
  },
  {
    series: "Kamen Rider Blade",
    title: "The Eternal Trump",
    episode: 49,
    air_date: "2005-01-22",
    image: "Episodes Images/HEISEI/BLADE/BLADE_49.webp"
  },
  {
    series: "Kamen Rider Hibiki",
    title: "The Echoing Oni",
    episode: 1,
    air_date: "2005-01-30",
    image: "Episodes Images/HEISEI/HIBIKI/HIBIKI_01.webp"
  },
  {
    series: "Kamen Rider Hibiki",
    title: "Surpassing Father",
    episode: 31,
    air_date: "2005-09-11",
    image: "Episodes Images/HEISEI/HIBIKI/HIBIKI_31.webp"
  },
  {
    series: "Kamen Rider Hibiki",
    title: "Dying a Glorious Death, Zanki",
    episode: 45,
    air_date: "2005-12-25",
    image: "Episodes Images/HEISEI/HIBIKI/HIBIKI_45.webp"
  },
  {
    series: "Kamen Rider Hibiki",
    title: "Dreaming of Tomorrow",
    episode: 48,
    air_date: "2006-01-22",
    image: "Episodes Images/HEISEI/HIBIKI/HIBIKI_48.webp"
  },
  {
    series: "Kamen Rider Kabuto",
    title: "The Strongest Man",
    episode: 1,
    air_date: "2006-01-29",
    image: "Episodes Images/HEISEI/KABUTO/KABUTO_01.png"
  },
  {
    series: "Kamen Rider Kabuto",
    title: "The Makeup Thousand-Man Cut",
    episode: 12,
    air_date: "2006-04-16",
    image: "Episodes Images/HEISEI/KABUTO/KABUTO_12.webp",
    fact: "Debut da forma Rider do Drake"
  },
  {
    series: "Kamen Rider Kabuto",
    title: "The Dangerous Younger Sister",
    episode: 38,
    air_date: "2006-10-22",
    image: "Episodes Images/HEISEI/KABUTO/KABUTO_38.webp"
  },
  {
    series: "Kamen Rider Kabuto",
    title: "Worst Terror VS Worst Fear",
    episode: 42,
    air_date: "2006-11-26",
    image: "Episodes Images/HEISEI/KABUTO/KABUTO_42.webp"
  },
  {
    series: "Kamen Rider Kabuto",
    title: "Path of Heaven",
    episode: 49,
    air_date: "2007-01-21",
    image: "Episodes Images/HEISEI/KABUTO/KABUTO_49.webp"
  },
  {
    series: "Kamen Rider Den-O",
    title: "I Have Arrived!",
    episode: 1,
    air_date: "2007-01-28",
    image: "Episodes Images/HEISEI/DEN-O/DEN-O_01.webp" 
  },
  {
    series: "Kamen Rider Den-O",
    title: "My Strength Has Made You Cry",
    episode: 9,
    air_date: "2007-03-25",
    image: "Episodes Images/HEISEI/DEN-O/DEN-O_09.webp" 
  },
  {
    series: "Kamen Rider Den-O",
    title: "Hana in a Stormy Singularity Point",
    episode: 10,
    air_date: "2007-04-01",
    image: "Episodes Images/HEISEI/DEN-O/DEN-O_10.webp" 
  },
  {
    series: "Kamen Rider Den-O",
    title: "The Climax Goes On, No Matter What",
    episode: 49,
    air_date: "2008-01-20",
    image: "Episodes Images/HEISEI/DEN-O/DEN-O_49.webp"
  },
  {
    series: "Kamen Rider Kiva",
    title: "Fate: Wake Up!",
    episode: 1,
    air_date: "2008-01-27",
    image: "Episodes Images/HEISEI/KIVA/KIVA_01.webp"
  },
   {
    series: "Kamen Rider Kiva",
    title: "When the Saints Go Marching In: I Am King",
    episode: 29,
    air_date: "2008-08-24",
    image: "Episodes Images/HEISEI/KIVA/KIVA_29.webp"
  },
  {
    series: "Kamen Rider Kiva",
    title: "Noise: Melody of Destruction",
    episode: 34,
    air_date: "2008-09-28",
    image: "Episodes Images/HEISEI/KIVA/KIVA_34.webp"
  },
  {
    series: "Kamen Rider Kiva",
    title: "Encore: Nago Ixa Explosively Returns",
    episode: 40,
    air_date: "2008-11-16",
    image: "Episodes Images/HEISEI/KIVA/KIVA_40.webp"
  },
  {
    series: "Kamen Rider Kiva",
    title: "Finale: The Inheritors of Kiva",
    episode: 48,
    air_date: "2009-01-18",
    image: "Episodes Images/HEISEI/KIVA/KIVA_48.webp"
  },
  {
    series: "Kamen Rider Decade",
    title: "Rider War",
    episode: 1,
    air_date: "2009-01-25",
    image: "Episodes Images/HEISEI/DECADE/DECADE_01.webp",
  },
  {
    series: "Kamen Rider Decade",
    title: "Welcome to the Blade Restaurant",
    episode: 8,
    air_date: "2009-03-15",
    image: "Episodes Images/HEISEI/DECADE/DECADE_08.webp",
    fact: "Esse é o 900º episódio da franquia Kamen Rider",
  },
  {
    series: "Kamen Rider Decade",
    title: "The Destroyer of Worlds",
    episode: 31,
    air_date: "2009-08-30",
    image: "Episodes Images/HEISEI/DECADE/DECADE_31.webp",
  },
  {
    series: "Kamen Rider W",
    title: "The W Search/Two Detectives in One",
    episode: 1,
    air_date: "2009-09-06",
    image: "Episodes Images/HEISEI/W/W_01.webp",
    fact: "Primeiro episódio da Era Heisei 2"
  },
  {
    series: "Kamen Rider W",
    title: "The W Search/Those Who Make the City Cry",
    episode: 2,
    air_date: "2009-09-13",
    image: "Episodes Images/HEISEI/W/W_02.webp"
  },
  {
    series: "Kamen Rider W",
    title: "Don't Touch the M/How to Get to Heaven",
    episode: 3,
    air_date: "2009-09-20",
    image: "Episodes Images/HEISEI/W/W_03.webp"
  },
  {
    series: "Kamen Rider W",
    title: "Don't Touch the M/Play with a Joker",
    episode: 4,
    air_date: "2009-09-27",
    image: "Episodes Images/HEISEI/W/W_04.webp"
  },
  {
    series: "Kamen Rider W",
    title: "The Girl... A/Papa Is a Kamen Rider",
    episode: 5,
    air_date: "2009-10-04",
    image: "Episodes Images/HEISEI/W/W_05.webp"
  },
  {
    series: "Kamen Rider W",
    title: "The Girl... A/The Price of Lying",
    episode: 6,
    air_date: "2009-10-11",
    image: "Episodes Images/HEISEI/W/W_06.webp"
  },
  {
    series: "Kamen Rider W",
    title: "Find the C/Philip Can't Stand It",
    episode: 7,
    air_date: "2009-10-18",
    image: "Episodes Images/HEISEI/W/W_07.webp"
  },
  {
    series: "Kamen Rider W",
    title: "Find the C/Dancing Hero",
    episode: 8,
    air_date: "2009-10-25",
    image: "Episodes Images/HEISEI/W/W_08.webp"
  },
  {
    series: "Kamen Rider W",
    title: "The S Terror/The Maid Detective Witnessed It!",
    episode: 9,
    air_date: "2009-11-08",
    image: "Episodes Images/HEISEI/W/W_09.webp"
  },
  {
    series: "Kamen Rider W",
    title: "The S Terror/The Great Detective's Daughter",
    episode: 10,
    air_date: "2009-11-15",
    image: "Episodes Images/HEISEI/W/W_10.webp"
  },
  {
    series: "Kamen Rider W",
    title: "The Revenge V/Infected Car",
    episode: 11,
    air_date: "2009-11-22",
    image: "Episodes Images/HEISEI/W/W_11.webp"
  },
  {
    series: "Kamen Rider W",
    title: "The Revenge V/Grudge Beast",
    episode: 12,
    air_date: "2009-11-29",
    image: "Episodes Images/HEISEI/W/W_12.webp"
  },
  {
    series: "Kamen Rider W",
    title: "The I Doesn't Stop/That Guy's Name Is Accel",
    episode: 19,
    air_date: "2010-01-24",
    image: "Episodes Images/HEISEI/W/W_19.webp",
    fact: "Debut na TV do Kamen Rider Accel"
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
    title: "Goodbye to the E/A Bouquet of Justice to This City",
    episode: 49,
    air_date: "2010-08-29",
    image: "Episodes Images/HEISEI/W/W_49.webp"
  },
  {
    series: "Kamen Rider OOO",
    title: "Medals, Underwear, and a Mysterious Arm",
    episode: 1,
    air_date: "2010-09-05",
    image: "Episodes Images/HEISEI/OOO/OOO_01.webp"
  },
  {
    series: "Kamen Rider OOO",
    title: "An Eel, the World, and the Gravity Combo",
    episode: 12,
    air_date: "2010-11-28",
    image: "Episodes Images/HEISEI/OOO/OOO_12.jpg"
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
    series: "Kamen Rider OOO",
    title: "Finale: The Medals of Tomorrow, Underwear, and Arms Held",
    episode: 48,
    air_date: "2011-08-28",
    image: "Episodes Images/HEISEI/OOO/OOO_48.webp",
  },
  {
    series: "Kamen Rider Fourze",
    title: "Youthful Transformation",
    episode: 1,
    air_date: "2011-09-04",
    image: "Episodes Images/HEISEI/FOURZE/FOURZE_01.webp"
  },
  {
    series: "Kamen Rider Fourze",
    title: "Space Superiority",
    episode: 2,
    air_date: "2011-09-11",
    image: "Episodes Images/HEISEI/FOURZE/FOURZE_02.webp"
  },
  {
    series: "Kamen Rider Fourze",
    title: "Right and Wrong Conflict",
    episode: 16,
    air_date: "2011-12-25",
    image: "Episodes Images/HEISEI/FOURZE/FOURZE_16.webp"
  },
  {
    series: "Kamen Rider Fourze",
    title: "Meteor Appearance",
    episode: 17,
    air_date: "2011-01-08",
    image: "Episodes Images/HEISEI/FOURZE/FOURZE_17.webp"
  },
  {
    series: "Kamen Rider Fourze",
    title: "Star Storm Comeback",
    episode: 28,
    air_date: "2012-03-25",
    image: "Episodes Images/HEISEI/FOURZE/FOURZE_28.webp"
  },
  {
    series: "Kamen Rider Fourze",
    title: "Final Episode: Youthful Galaxy",
    episode: 48,
    air_date: "2012-08-26",
    image: "Episodes Images/HEISEI/FOURZE/FOURZE_48.webp"
  },
  {
    series: "Kamen Rider Wizard",
    title: "The Ringed Magician",
    episode: 1,
    air_date: "2012-09-02",
    image: "Episodes Images/HEISEI/WIZARD/WIZARD_01.webp"
  },
  {
    series: "Kamen Rider Wizard",
    title: "Neverending Story",
    episode: 53,
    air_date: "2013-09-29",
    image: "Episodes Images/HEISEI/WIZARD/WIZARD_53.webp"
  },
  {
    series: "Kamen Rider Gaim",
    title: "Transform! The Orange From the Sky!?",
    episode: 1,
    air_date: "2013-10-06",
    image: "Episodes Images/HEISEI/GAIM/GAIM_01.webp"
  },
  {
    series: "Kamen Rider Gaim",
    title: "Gaim and Baron, Tag of Friendship!",
    episode: 13,
    air_date: "2014-01-12",
    image: "Episodes Images/HEISEI/GAIM/GAIM_13.webp"
  },
  {
    series: "Kamen Rider Gaim",
    title: "Transformation! And into the Future",
    episode: 47,
    air_date: "2015-09-28",
    image: "Episodes Images/HEISEI/GAIM/GAIM_47.webp"
  },
  {
    series: "Kamen Rider Drive",
    title: "Why Did My Time Stop?",
    episode: 1,
    air_date: "2014-10-05",
    image: "Episodes Images/HEISEI/DRIVE/DRIVE_01.webp"
  },
  {
    series: "Kamen Rider Drive",
    title: "What is a Kamen Rider?",
    episode: 2,
    air_date: "2014-10-12",
    image: "Episodes Images/HEISEI/DRIVE/DRIVE_02.jpg"
  },
  {
    series: "Kamen Rider Drive",
    title: "Who Stole the Woman's Smile?",
    episode: 3,
    air_date: "2014-10-19",
    image: "Episodes Images/HEISEI/DRIVE/DRIVE_03.webp",
    fact: "Esse episódio saiu 40 anos depois de Kamen Rider Amazon"
  },
  {
    series: "Kamen Rider Drive",
    title: "What is That Prideful Chaser Thinking?",
    episode: 4,
    air_date: "2014-10-26",
    image: "Episodes Images/HEISEI/DRIVE/DRIVE_04.webp"
  },
  {
    series: "Kamen Rider Drive",
    title: "What Are the Steel Robbers After?",
    episode: 5,
    air_date: "2014-11-09",
    image: "Episodes Images/HEISEI/DRIVE/DRIVE_05.webp"
  },
  {
    series: "Kamen Rider Drive",
    title: "Who Does the Warrior Fight For?",
    episode: 6,
    air_date: "2014-11-16",
    image: "Episodes Images/HEISEI/DRIVE/DRIVE_06.webp"
  },
  {
    series: "Kamen Rider Drive",
    title: "Final Story (Special Edition): The Case of Ghost",
    episode: 48,
    air_date: "2015-09-27",
    image: "Episodes Images/HEISEI/DRIVE/DRIVE_48.webp"
  },
  {
    series: "Kamen Rider Ghost",
    title: "Eyes Open! It's Me!",
    episode: 1,
    air_date: "2015-10-04",
    image: "Episodes Images/HEISEI/GHOST/GHOST_01.webp"
  },
  {
    series: "Kamen Rider Ghost",
    title: "Final Story (Special Edition): Future! Connected Thoughts!",
    episode: 50,
    air_date: "2016-09-25",
    image: "Episodes Images/HEISEI/GHOST/GHOST_50.webp"
  },
  {
    series: "Kamen Rider Ex-Aid",
    title: "I'm a Kamen Rider!",
    episode: 1,
    air_date: "2016-10-02",
    image: "Episodes Images/HEISEI/EX-AID/EX-AID_01.webp"
  },
  {
    series: "Kamen Rider Ex-Aid",
    title: "Everyone Gathers for a Clashing Crash!",
    episode: 5,
    air_date: "2016-10-30",
    image: "Episodes Images/HEISEI/EX-AID/EX-AID_05.webp", 
    fact: "Debut dos Robots Gamers, como também da forma Robot Action Gamer Level 3"
  },
  {
    series: "Kamen Rider Ex-Aid",
    title: "Love & Peace for the Winner!",
    episode: 27,
    air_date: "2017-04-16",
    image: "Episodes Images/HEISEI/EX-AID/EX-AID_27.webp",
    fact: "Debut da Ride Player Nico"
  },
  {
    series: "Kamen Rider Ex-Aid",
    title: "Endless Game",
    episode: 45,
    air_date: "2017-08-27",
    image: "Episodes Images/HEISEI/EX-AID/EX-AID_45.webp"
  },
  {
    series: "Kamen Rider Build",
    title: "That One with the Best Match",
    episode: 1,
    air_date: "2017-09-03",
    image: "Episodes Images/HEISEI/BUILD/BUILD_01.png"
  },
  {
    series: "Kamen Rider Build",
    title: "Memory Starts To Talk",
    episode: 8,
    air_date: "2017-10-22",
    image: "Episodes Images/HEISEI/BUILD/BUILD_08.webp"
  },
  {
    series: "Kamen Rider Build",
    title: "The Genius Arrives With a Tank",
    episode: 28,
    air_date: "2018-03-25",
    image: "Episodes Images/HEISEI/BUILD/BUILD_28.webp"
  },
  {
    series: "Kamen Rider Build",
    title: "An Oath to Be The One",
    episode: 46,
    air_date: "2018-07-29",
    image: "Episodes Images/HEISEI/BUILD/BUILD_46.webp"
  },
  {
    series: "Kamen Rider Build",
    title: "The Tomorrow Build Will Create",
    episode: 49,
    air_date: "2018-08-26",
    image: "Episodes Images/HEISEI/BUILD/BUILD_49.webp",
    fact: "Nesse episódio, o Riderwatch do Cross-Z aparece"
  },
  {
    series: "Kamen Rider Zi-O",
    title: "Kingdom 2068",
    episode: 1,
    air_date: "2018-09-02",
    image: "Episodes Images/HEISEI/ZI-O/ZI-O_01.webp"
  },
  {
    series: "Kamen Rider Zi-O",
    title: "2019: Apocalypse",
    episode: 49,
    air_date: "2019-08-25",
    image: "Episodes Images/HEISEI/ZI-O/ZI-O_49.webp"
  },
  {
    series: "Kamen Rider Zero-One",
    title: "I'm the President and a Kamen Rider",
    episode: 1,
    air_date: "2019-09-01",
    image: "Episodes Images/REIWA/ZERO ONE/ZERO ONE_01.webp",
    fact: "Primeiro episódio da Era Reiwa"
  },
  {
    series: "Kamen Rider Zero-One",
    title: "This Is My Flowery Way of Life",
    episode: 18,
    air_date: "2020-01-12",
    image: "Episodes Images/REIWA/ZERO ONE/ZERO ONE_18.webp"
  },
  {
    series: "Kamen Rider Zero-One",
    title: "Their Respectives Futures",
    episode: 45,
    air_date: "2020-08-30",
    image: "Episodes Images/REIWA/ZERO ONE/ZERO ONE_45.webp"
  },
  {
    series: "Kamen Rider Saber",
    title: "Chapter 1: In The Beginning, There Was a Flame Swordsman.",
    episode: 1,
    air_date: "2020-09-06",
    image: "Episodes Images/REIWA/SABER/SABER_01.webp"
  },
  {
    series: "Kamen Rider Saber",
    title: "Chapter 45: Ten Swordsmen, Betting the World.",
    episode: 45,
    air_date: "2021-08-08",
    image: "Episodes Images/REIWA/SABER/SABER_45.webp"
  },
  {
    series: "Kamen Rider Saber",
    title: "Final Chapter: The End of the World, the Story that is Born.",
    episode: 47,
    air_date: "2021-08-22",
    image: "Episodes Images/REIWA/SABER/SABER_47.webp"
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
    image: "Episodes Images/REIWA/REVICE/REVICE_12.webp",
    fact: "Como o nome diz, a Kamen Rider Jeanne faz debut nesse episódio"
  },
  {
    series: "Kamen Rider Revice",
    title: "Lay Down My Life, Entrust My Feelings",
    episode: 21,
    air_date: "2022-02-06",
    image: "Episodes Images/REIWA/REVICE/REVICE_21.webp"
  },
  {
    series: "Kamen Rider Revice",
    title: "Family to the End, Until the Day We Meet Again",
    episode: 50,
    air_date: "2022-08-28",
    image: "Episodes Images/REIWA/REVICE/REVICE_50.webp"
  },
  {
    series: "Kamen Rider Geats",
    title: "Daybreak F: Invitation to the Rider",
    episode: 1,
    air_date: "2022-09-04",
    image: "Episodes Images/REIWA/GEATS/GEATS_01.webp"
  },
  {
    series: "Kamen Rider Geats",
    title: "Encounter I: Treasure Hunting and Thievery",
    episode: 2,
    air_date: "2022-09-11",
    image: "Episodes Images/REIWA/GEATS/GEATS_02.webp"
  },
  {
    series: "Kamen Rider Geats",
    title: "Lamentation VII: Heaven and Hell Game♡",
    episode: 31,
    air_date: "2023-04-16",
    image: "Episodes Images/REIWA/GEATS/GEATS_31.webp"
  },
  {
    series: "Kamen Rider Geats",
    title: "Genesis V: His Name Is Gya-Go!",
    episode: 43,
    air_date: "2023-07-09",
    image: "Episodes Images/REIWA/GEATS/GEATS_43.webp",
    fact: "Nesse episódio, Keiwa Sakurai é eliminado do Jyamato Grand Prix e Archimedel morre"
  },
  {
    series: "Kamen Rider Geats",
    title: "Daybreak I: Here Comes The Highlight!",
    episode: 49,
    air_date: "2023-08-27",
    image: "Episodes Images/REIWA/GEATS/GEATS_49.webp"
  },
  {
    series: "Kamen Rider Gotchard",
    title: "Gotcha! Hopper1!",
    episode: 1,
    air_date: "2023-09-03",
    image: "Episodes Images/REIWA/GOTCHARD/GOTCHARD_01.webp"
  },
  {
    series: "Kamen Rider Gotchard",
    title: "This Is My and Your CHEMY×STORY",
    episode: 50,
    air_date: "2024-08-25",
    image: "Episodes Images/REIWA/GOTCHARD/GOTCHARD_50.png"
  },
  {
    series: "Kamen Rider Gavv",
    title: "A Snack Kamen Rider!?",
    episode: 1,
    air_date: "2024-09-01",
    image: "Episodes Images/REIWA/GAVV/GAVV_01.webp",
    fact: "Esse episódio foi lançado 5 anos depois da estréia de Zero-One"
  },
  {
    series: "Kamen Rider Gavv",
    title: "Happy Zakuzakuchips",
    episode: 2,
    air_date: "2024-09-08",
    image: "Episodes Images/REIWA/GAVV/GAVV_02.webp",
    fact: "Debut da forma Zakuzakuchips do Gavv"
  },
  {
    series: "Kamen Rider Gavv",
    title: "Soda Punch Is a Guilty Pleasure",
    episode: 3,
    air_date: "2024-09-15",
    image: "Episodes Images/REIWA/GAVV/GAVV_03.webp",
    fact: "Debut do Punchingummy Assist do Gavv"
  },
  {
    series: "Kamen Rider Gavv",
    title: "More Marshmallows Please!",
    episode: 4,
    air_date: "2024-09-22",
    image: "Episodes Images/REIWA/GAVV/GAVV_04.webp"
  },
  {
    series: "Kamen Rider Gavv",
    title: "The Memories Are Painful",
    episode: 5,
    air_date: "2024-09-29",
    image: "Episodes Images/REIWA/GAVV/GAVV_05.webp"
  },
  {
    series: "Kamen Rider Gavv",
    title: "Transformation Is Bitter Chocolate",
    episode: 6,
    air_date: "2024-10-06",
    image: "Episodes Images/REIWA/GAVV/GAVV_06.webp",
    fact: "o Kamen Rider Valen tem sua estréia neste episódio!"
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
    title: "Extremely Strong! The Pudding Bodyguard",
    episode: 18,
    air_date: "2025-01-12",
    image: "Episodes Images/REIWA/GAVV/GAVV_18.webp"
  },
  {
    series: "Kamen Rider Gavv",
    title: "A Spoonful of Revival Ice Cream",
    episode: 24,
    air_date: "2025-02-23",
    image: "Episodes Images/REIWA/GAVV/GAVV_24.webp"
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
    title: "The Reminiscent A La Mode",
    episode: 40,
    air_date: "2024-06-22",
    image: "Episodes Images/REIWA/GAVV/GAVV_40.webp"
  },
];
