const axios = require("axios");

class Trending extends HTMLElement {
  connectedCallback() {
    const apiUrl = `https://song-lyrics-api.azharimm.dev/hot`;
    axios
      .get(apiUrl)
      .then((response) => {
        const lyrics = response.data.data;
        this.innerHTML = this.render(lyrics);
      })
      .catch((error) => {
        console.log(error);
      });

    //   add click event to show lyrics
    this.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (link) {
        event.preventDefault();
        const songId = link.dataset.id;
        const songUrl = `https://song-lyrics-api.azharimm.dev/lyrics/${songId}`;
        axios.get(songUrl).then((response) => {
          const lyrics = response.data.data;
          const artist = lyrics.artist;
          const songTitle = lyrics.songTitle;
          const trendingList = document.querySelector("dl");
          const lyricsArr = lyrics.songLyricsArr
            .map((lyric) => {
              return `<span>${lyric}</span>`;
            })
            .join("<br>");
          const lyricsDiv = document.getElementById("content");
          lyricsDiv.innerHTML = `<h3>${artist} - <span>${songTitle}</span></h3><p>${lyricsArr}</p>`;
          trendingList.remove();
        });
      }
    });
  }

  render(lyrics) {
    return `<section>
    <dl>
      <dt>Trending</dt>
      ${lyrics
        .slice(0, 10)
        .map(
          (lyric) => `
          <dd>
              <a href="#" data-id="${lyric.songId}" title="${lyric.songTitle}">
                ${lyric.artist} - ${lyric.songTitle}
              </a>
          </dd>`
        )
        .join("")}
    </dl>
    <!--Show lyrics here-->
        <div id="content">
            <p>
              <b>Source API</b>: <a href="https://github.com/azharimm/song-lyrics-api" target="_blank">https://github.com/azharimm/song-lyrics-api</a>
            </p>
        </div>
    </section>`;
  }
}

customElements.define("trending-lirik", Trending);
