# INST377-Final-Group4

# Anime Lover
This website pulls data from MyAnimeList.net and allows users to access information regarding various animes.
This website works on Chrome and iOS devices.

Developer Manual: https://github.com/yonathancodes/INST377-Final-Group4/blob/main/DevManual.MD

# Developer Manual


## Installation and Dependencies
1. Clone the repository
```
git clone <https://github.com/yonathancodes/INST377-Final-Group4>
```

2. Dependecies: This project utilizes the Jikan API and Simple Slider API. Ensure you have internet access to fetch data from these APIs.

## Running the Application

Local Development: This repository contains three HTML files (animerec.html, search.html, about.html), one JavaScript file (script.js), and one CSS file (animerec.css). Open any of the HTML files in a web browser to view the application locally.

## Endpoints

# Jikan API
https://api.jikan.moe/v4

# Search 
GET /anime: Search for anime.

## Known Bugs 
1. Images may fail to load on certain browsers.
2. Search functionality may not return accurate results in some cases.
3. Search results may scroll too quickly for longer descriptions.
