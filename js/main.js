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
        "A New Hope": "images/Hope.jpg"
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
                
                a.dataset.review = character["films"][1]; 
                li.style.backgroundImage = `url(${characterImages[character["name"]] || "images/starWar_readme.jpeg"})`;
                li.style.backgroundSize = "cover"; 
                li.style.backgroundPosition = "center"; 
                li.style.height = "150px";

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
            const movieContainer = clone.querySelector(".movie-container");


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
                const movieImageContainer = clone.querySelector(".movie-image-container");
                const movieImage = document.createElement("img");

                movieImage.src = posterURL;
                movieImage.alt = `${response.title} Poster`;
                movieImage.style.backgroundPosition = "center";
                movieImage.style.width = "100%";
                movieImage.style.height = "auto";

                // movieImage.style.maxWidth = "30%"; 
                movieImageContainer.appendChild(movieImage);
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

(() => {

    gsap.registerPlugin(SplitText, ScrollToPlugin, ScrollTrigger);


const scrollText = document.querySelector("#scroll-text");
if (scrollText) {
    const split = new SplitText(scrollText, { type: "chars" });

    gsap.from(split.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        repeat: -1,
        yoyo: true 
    });
}

// ScrollTrigger Animation
gsap.fromTo(
    "main",
    {
        opacity: 0,
        y: 50,
    },
    {
        opacity: 1,
        x: 0,
        y: 0,
        ease: "power3.out",
        duration: 2,
        scrollTrigger: {
            trigger: "#scroll-indicator",
            toggleActions: "play none none none", 
            start: "top 35%",
            end: "bottom center",
        },
    }
);

// Scroll to Movie Section on Click
// Define the mobile breakpoint (e.g., max-width: 768px)
const forMobile = window.matchMedia("(max-width: 768px)").matches;

if (forMobile) {
    console.log("GSAP Scroll Animation Enabled on Mobile");

    // Scroll to Movie Section on Click (Only for Mobile)
    const scrollToMovieSection = () => {
        gsap.to(window, { duration: 1, scrollTo: "#movie-con", ease: "power2.out" });
    };

 
    const characterCards = document.querySelectorAll(".character-card");
    characterCards.forEach(card => card.addEventListener("click", scrollToMovieSection));

    
    const movieContainer = document.querySelector("#movie-con");
    if (movieContainer) {
        movieContainer.addEventListener("click", scrollToMovieSection);
    }
} else {
    console.log("GSAP Scroll Animation Disabled on Tablet/Desktop");
}


   

})();