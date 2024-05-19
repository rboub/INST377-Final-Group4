// JavaScript code can be added here for interactivity or dynamic content.
const animeEl = document.getElementById("anime-list");
const searchEl = document.getElementById("search-input");
const formEl = document.getElementById("form");

formEl.addEventListener('submit', async (e) => {
    // prevent default form behaviour
    e.preventDefault();

    let searchString = searchEl.value.trim(); // Trim whitespace

    try {
        const res = await fetch(`https://api.jikan.moe/v4/search/anime/${searchString}`);
        const data = await res.json();

        // Check if data is empty
        if (data.results.length === 0) {
            animeEl.innerHTML = "<p>No anime found.</p>";
            return;
        }

        // Get the first anime result
        const anime = data.results[0];

        const truncatedSynopsis = truncateText(anime.synopsis, 300);
        anime.synopsis = truncatedSynopsis;
        const animeCardHTML = generateAnimeCard(anime);
        animeEl.innerHTML = animeCardHTML;
    } catch (err) {
        console.log(err);
        animeEl.innerHTML = "<p>An error occurred while fetching anime details.</p>";
    }
})

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
          <p class="anime-rating">${anime.score}</p>
          <p class="anime-year">${anime.start_date}</p>
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

// Simple form submission handling.
const subscribeForm = document.getElementById("subscribe-form");

subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = event.target.querySelector("input[type='email']").value;
    // You can handle the form submission, e.g., send the email to a server, etc.
    console.log(`Subscribed with email: ${email}`);
    event.target.reset();
});
