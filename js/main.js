(() => {
    const characterList = document.querySelector("#character-list");
    const movietemplate = document.querySelector("#movie-template");
    const movieCon = document.querySelector("#movie-con");
    const baseURL = "https://swapi.dev/";

    function getCharacters() {
        fetch(`${baseURL}api/people`)
        .then(response => response.json())
        .then(function(response){
            const characters = response.results;
            const ul = document.createElement("ul");
            characters.forEach(character => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.textContent = character.name;
                a.dataset.review = character.films;
                li.appendChild(a);
                ul.appendChild(li);
            });
            characterList.appendChild(ul);
        })
        .then(function(){
            const links = document.querySelectorAll("#character-list li a");
            console.log(links);
            links.forEach(function(link){
                link.addEventListener("click", getMovie)
            })
        })
        .catch(function(err){
            console.log(err);
        })
    }

    getCharacters();

    function getMovie(e) {
        const filmURLs = e.currentTarget.dataset.review;

        fetch(`${baseURL}api/film${filmURLs}`)
        .then(response => response.json())
        .then(function(response){
            movieCon.innerHTML = "";
            console.log(response.results);
            const clone = movietemplate.textContent.cloneNode(true);

            const movieDescription = clone.querySelector(".movie-description");
            movieDescription.innerHTML = response.result.opening_crawl;

            const movieTitle = clone.querySelector(".movie-title");
            movieTitle.innerHTML = response.result.title;

            movieCon.appendChild(clone);

        })
        .catch(function(err){
            movieCon.innerHTML = "<p>No review available for this section. </p>"
        })

    }

    getMovies();

    
})();
