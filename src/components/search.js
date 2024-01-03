const axios = require("axios");
const searchIcon = require("../assets/img/search.svg");

class SearchLyrics extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="searchForm">
        <input type="text" id="searchInput" placeholder="Search for a Lyric..." />
        <button type="submit">
          <img src="${searchIcon}" alt="search icon" />
        </button>
      </form>
      <div id="listLirik"></div>
    `;

    const searchForm = this.querySelector("#searchForm");
    const searchInput = this.querySelector("#searchInput");
    const listLirik = this.querySelector("#listLirik");

    const createLyricsItem = (lirikItem1) => {
      const lyricsItem = document.createElement("section");
      lyricsItem.classList.add("lyrics-item");
      lyricsItem.innerHTML = `
        <div class="item">
          <a href="#" data-id="${lirikItem1.songId}">
            <h2>${lirikItem1.songTitle}</h2>
            <p><b>Artist:</b> ${lirikItem1.artist}</p>
          </a>
        </div>
      `;
      return lyricsItem;
    };

    const renderSearchResults = (lirikData) => {
      listLirik.innerHTML = "";

      if (lirikData.length === 0) {
        listLirik.textContent = "No lirik Data found.";
        return;
      }

      const lyricsItems = lirikData.map(createLyricsItem);
      lyricsItems.forEach((lyricsItem) => {
        listLirik.appendChild(lyricsItem);
      });
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (query !== "") {
        axios
          .get(`https://song-lyrics-api.azharimm.dev/search?q=${query}`)
          .then((response) => {
            const lirikData = response.data.data;
            renderSearchResults(lirikData);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    const handleClickSearch = async (event) => {
      const link = event.target.closest("a");

      if (link) {
        event.preventDefault();
        const songId = link.dataset.id;
        const songUrl = `https://song-lyrics-api.azharimm.dev/lyrics/${songId}`;

        try {
          const response = await fetch(songUrl);
          const data = await response.json();
          const lyrics = data.data;
          const showContent = document.querySelector("#content");
          const listTrending = document.querySelector("dl");
          const lyricsArr = lyrics.songLyricsArr
            .map((lyric) => `<span>${lyric}</span>`)
            .join("<br>");
          showContent.innerHTML = `<h2>${lyrics.artist} - ${lyrics.songTitle}</h2><p>${lyricsArr}</p>`;
          listLirik.remove();
          listTrending.remove();
          searchForm.remove();
        } catch (error) {
          console.error(error);
        }
      }
    };

    searchForm.addEventListener("submit", handleFormSubmit);
    this.addEventListener("click", handleClickSearch);
  }
}

customElements.define("search-lirik", SearchLyrics);
