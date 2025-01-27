(() => {
    const characterList = document.querySelector("#character-list");
    const movietemplate = document.querySelector("#movie-template");
    const movieCon = document.querySelector("#movie-con");
    const movieSpinner = document.querySelector("#loading-spinner"); 
    const baseURL = "https://swapi.dev/";

    // Corrected name of the variable to 'filmPosters'
    const filmPosters = {
        "The Empire Strikes Back": "images/Empire.jpg", // Make sure these images exist
        "Attack of the Clones": "images/Attack.jpg", 
    }

    function getCharacters() {
        fetch(`${baseURL}api/people`)
        .then(response => response.json())
        .then(function(response){
            console.log(response);
            const characters = response.results;
            const ul = document.createElement("ul");
            characters.forEach(character => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.textContent = character["name"];
                
                a.dataset.review = character["films"][1]; // Ensure you pick the right film index
                li.appendChild(a);
                ul.appendChild(li);
            });
            characterList.appendChild(ul);
        })
        .then(function(){
            const links = document.querySelectorAll("#character-list li a");
            console.log(links);
            links.forEach(function(link){
                link.addEventListener("click", getMovie);
            });
        })
        .catch(function(err){
            console.log(err);
        })
    }

    function getMovie(e) {
        console.log("getMovie Called");

        movieSpinner.style.display = "block";

        movieCon.innerHTML = "";

        const filmURL = e.currentTarget.dataset.review;

        fetch(filmURL)
        .then(response => response.json())
        .then(function(response){
            const clone = movietemplate.content.cloneNode(true);

            const movieTitle = clone.querySelector(".movie-title");
            movieTitle.innerHTML = response.title;

            const movieDescription = clone.querySelector(".movie-description");
            movieDescription.innerHTML = response.opening_crawl;

            const movieDirector = clone.querySelector(".movie-director");
            movieDirector.innerHTML = `Director: ${response.director}`;

            const movieProducer = clone.querySelector(".movie-producer");
            movieProducer.innerHTML = `Producer: ${response.producer}`;

            const movieDate = clone.querySelector(".movie-date");
            movieDate.innerHTML = `Release Date: ${response.release_date}`;

            // Get the poster URL based on the movie title
            const posterURL = filmPosters[response.title];
            if (posterURL) {
                const movieImage = document.createElement("img");
                movieImage.src = posterURL;
                movieImage.alt = `${response.title} Poster`;
                movieImage.style.maxWidth = "50%"; 
                movieCon.appendChild(movieImage);
            }

            movieCon.appendChild(clone);

            movieSpinner.style.display = "none";
        })
        .catch(function(err){
            console.error("Error fetching movie:", err);
            movieCon.innerHTML = "<p>Opps... Sorry... No review available for this section.</p>";

            movieSpinner.style.display = "none";
        });
    }

    getCharacters();
})();
