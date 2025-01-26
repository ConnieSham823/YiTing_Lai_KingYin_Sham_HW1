(() => {
    const characterList = document.querySelector("#character-list");
    const movietemplate = document.querySelector("#movie-template");
    const movieCon = document.querySelector("#movie-con");
    const baseURL = "https://swapi.dev/api";

    function getCharacters() {
        fetch(`${baseURL}people`)
        .then(response => response.jason())
        .then(function(response){
            const characters = response.description;
            const ul = document.createElement("ul");
            characters.forEach(character => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.textContent = character["name"];
                a.dataset.review = character["films"];
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

    
})();
