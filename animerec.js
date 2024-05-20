// JavaScript code can be added here for interactivity or dynamic content.
const animeEl = document.getElementById("results"); // Corrected ID
const searchEl = document.getElementById("genre"); // Corrected ID
const formEl = document.getElementById("animeSearchForm"); // Corrected ID

let animeList = []; // Array to store fetched anime data

// Function to fetch anime data from Jikan API, Should be done upon webpage loading (Current error here)
async function fetchAnimeData() {
  try {
      const res = await fetch(`https://api.jikan.moe/v4/anime`);
      if (!res.ok) {
          throw new Error(`Failed to fetch anime data: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();

      // Check if data is empty
      if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format: expected an array of anime objects.");
      }

      // Store fetched anime data
      animeList = data;

      // Render anime cards initially
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
    filteredAnime.forEach(anime => {
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

    let searchString = searchEl.value.trim(); // Trim whitespace

    // Render anime cards based on search query
    renderAnimeCards(searchString);
});

// Function to generate anime card HTML
function generateAnimeCard(anime) {
    return `
      <div class="anime-card">
        <div class="anime-image">
          <img src="${anime.image_url}" class="anime-img">
        </div>
        <div class="anime-details">
          <h3 class="anime-title">${anime.title}</h3>
          <span class="anime-type">${anime.type}</span>
          <p class="anime-description">${anime.synopsis}</p>
          <p class="anime-rating">Rating: ${anime.score}</p>
          <p class="anime-year">Start Date: ${anime.start_date}</p>
        </div>
      </div>
    `;
}

// Truncate function
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
}

// Fetch anime data when the page loads
fetchAnimeData();
