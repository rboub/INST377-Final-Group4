const animeEl = document.getElementById("results"); 
const genreEl = document.getElementById("genre"); 
const minScoreEl = document.getElementById("minScore"); 
const statusEl = document.getElementById("status"); 
const formEl = document.getElementById("animeSearchForm"); 

// Function to fetch anime data from Jikan API based on search criteria
async function fetchAnimeData(genre, minScore, status) {
  try {
    let apiUrl = `https://api.jikan.moe/v4/anime?limit=9`;

    // Add search parameters if they exist
    if (genre || minScore || status) {
      apiUrl += `&`;
      if (genre) {
        apiUrl += `genre=${genre}&`;
      }
      if (minScore) {
        apiUrl += `score=${minScore}&`;
      }
      if (status) {
        apiUrl += `status=${status}&`;
      }
      apiUrl = apiUrl.slice(0, -1); // Remove the trailing &
    }

    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch anime data: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();

    // Check if data is empty
    if (!data || !Array.isArray(data.data)) {
      throw new Error("Invalid data format: expected an array of anime objects.");
    }

    // Store fetched anime data
    animeList = data.data;

    // Render anime cards based on search criteria
    renderAnimeCards("");
  } catch (err) {
    console.error(err);
    animeEl.innerHTML = "<p>An error occurred while fetching anime data. Please try again later.</p>";
  }
}

// Function to render anime cards based on search query
function renderAnimeCards(searchQuery) {
  // Clear previous results
  animeEl.innerHTML = "";

  // Filter anime list based on search query
  const filteredAnime = animeList.filter(anime => {
    // You can customize the search criteria here
    return anime.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Display filtered results
  filteredAnime.slice(0, 9).forEach(anime => {
    const truncatedSynopsis = truncateText(anime.synopsis, 300);
    anime.synopsis = truncatedSynopsis;
    const animeCardHTML = generateAnimeCard(anime);
    animeEl.innerHTML += animeCardHTML;
  });

  // If no results found
  if (filteredAnime.length === 0) {
    animeEl.innerHTML = "<p>No anime found.</p>";
  }
}

// Event listener for form submission
formEl.addEventListener('submit', (e) => {
  // prevent default form behaviour
  e.preventDefault();

  const genre = genreEl.value.trim(); 
  const minScore = minScoreEl.value.trim(); 
  const status = statusEl.value.trim(); 

  // Fetch and render anime data based on search criteria
  fetchAnimeData(genre, minScore, status);
});

// Function to generate anime card HTML
function generateAnimeCard(anime) {
  return `
    <div class="anime-card">
      <div class="anime-image">
        <img src="${anime.images.jpg.image_url}" class="anime-img">
      </div>
      <div class="anime-details">
        <h3 class="anime-title">${anime.title}</h3>
        <span class="anime-type">${anime.type}</span>
        <p class="anime-description">${anime.synopsis}</p>
        <p class="anime-rating">Rating: ${anime.score}</p>
        <p class="anime-year">Start Date: ${anime.start_date ? anime.start_date : 'N/A'}</p>
      </div>
    </div>
  `;
}

// Truncate function
function truncateText(text, maxLength) {
  if (text && text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

// Annyang commands
if (annyang) {
  const commands = {
    'genre *genre': function(genre) {
      genreEl.value = genre;
    },
    'minimum score *score': function(score) {
      minScoreEl.value = score;
    },
    'status *status': function(status) {
      statusEl.value = status;
    },
    'search for anime': function() {
      formEl.submit();
    }
  };

  annyang.addCommands(commands);

  document.getElementById('audioOn').addEventListener('click', () => {
    annyang.start();
  });

  document.getElementById('audioOff').addEventListener('click', () => {
    annyang.abort();
  });
}

  
  
