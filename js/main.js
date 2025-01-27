(() => {
    const characterList = document.querySelector("#character-list");
    const movietemplate = document.querySelector("#movie-template");
    const movieCon = document.querySelector("#movie-con");
    const movieSpinner = document.querySelector("#loading-spinner"); 
    const baseURL = "https://swapi.dev/";

    const characterImages = {
        "Luke Skywalker": "images/luke.jpg",
        "C-3PO": "images/c-3po.jpg",
        "R2-D2": "images/r2-d2.jpg",
        "Darth Vader": "images/darth.jpg",
        "Leia Organa": "images/leia.jpg",
        "Owen Lars": "images/owen.jpg",
        "Beru Whitesun lars": "images/beru.jpg",
        "R5-D4": "images/r5-d4.jpg",
        "Biggs Darklighter": "images/biggs.jpg",
        "Obi-Wan Kenobi": "images/obi.jpg"
    };

    const filmPosters = {
        "The Empire Strikes Back": "images/Empire.jpg",
        "Attack of the Clones": "images/Attack.jpg", 
    };

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
                
                a.dataset.review = character["films"][1]; // Assuming you are fetching the 2nd film

                // Set the character's image as a background for the li element
                li.style.backgroundImage = `url(${characterImages[character["name"]] || "images/starWar_readme.jpeg"})`;
                li.style.backgroundSize = "cover"; // Makes sure the background image covers the entire li
                li.style.backgroundPosition = "center"; // Center the image
                li.style.height = "150px"; // Set a height for the li elements to display the background image

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
