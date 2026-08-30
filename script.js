console.log("SCRIPT CARGADO");
// =========================
// Filtro por unidades
// =========================

const buttons = document.querySelectorAll(".unit-btn");
const cards = document.querySelectorAll(".character-card");

// =========================
// Buscador de personajes
// =========================

const searchInput =
    document.getElementById("searchInput");

function updateCharacters(){

    const searchText =
        searchInput.value.toLowerCase().trim();

    cards.forEach(card => {

        const characterName =
            card.querySelector("h3")
                .textContent
                .toLowerCase();

        const matchesUnit =
            currentUnit === "all" ||
            card.dataset.unit === currentUnit;

        const matchesSearch =
            characterName.includes(searchText);

        if(matchesUnit && matchesSearch){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });

}

searchInput.addEventListener("input", () => {

    updateCharacters();

});

const closeProfile = document.getElementById("close-profile");
const profileContent = document.querySelector(".profile-content");

let currentUnit = "all";

buttons.forEach(button => {

    button.addEventListener("click", () => {

        currentUnit = button.dataset.unit;

        updateCharacters();

    });

});

// =========================
// Abrir perfil
// =========================
const profileButtons = document.querySelectorAll(".profile-btn");
const profileModal = document.getElementById("profile-modal");

profileButtons.forEach(button => {

    button.addEventListener("click", () => {

        const image = document.getElementById("profile-image");
        const name = document.getElementById("profile-name");
        const unit = document.getElementById("profile-unit");
        const role = document.getElementById("profile-role");
        const description = document.getElementById("profile-description");
        const birthday = document.getElementById("profile-birthday");
        const height = document.getElementById("profile-height");
        const voice = document.getElementById("profile-voice");
        const group = document.getElementById("profile-group");

        image.src = button.dataset.image;
        image.alt = button.dataset.name;

        name.textContent = button.dataset.name;
        unit.textContent = button.dataset.unit;
        role.textContent = button.dataset.role;
        description.textContent = button.dataset.description;

        birthday.textContent = button.dataset.birthday;
        height.textContent = button.dataset.height;
        voice.textContent = button.dataset.voice;
        group.textContent = button.dataset.unit;

        profileModal.style.display = "flex";

    });

});
// =========================
// Cerrar perfil
// =========================

if(closeProfile){

    closeProfile.addEventListener("click", () => {

        profileModal.style.display = "none";

    });

}
// =========================
// FAVORITOS
// =========================

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");


favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        if(button.classList.contains("active")){

            button.classList.remove("active");

            button.textContent =
                "⭐ Añadir favorito";

        }else{

            button.classList.add("active");

            button.textContent =
                "❤️ En favoritos";

            savefavorite(button.dataset.name);

        }

    });

});


// =========================
// MARCAR FAVORITOS GUARDADOS
// =========================

function updateFavoriteButtons(){

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    favoriteButtons.forEach(button => {

        const name =
            button.dataset.name;


        const exists =
            favorites.some(
                character =>
                    character.nombre === name
            );


        if(exists){

            button.classList.add("active");

            button.textContent =
                "❤️ En favoritos";

        }

    });

}


updateFavoriteButtons();

function goHome(){

    const charactersSection =
        document.querySelector(".characters");

    const favoritesSection =
        document.getElementById("favoritesSection");

    if(charactersSection){

        charactersSection.style.display = "grid";

    }

    if(favoritesSection){

        favoritesSection.style.display = "none";

    }

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
// =========================
// FAVORITOS
// =========================

function openFavorites(){

    loadFavorites();

    const charactersSection =
        document.querySelector(".characters");

    const favoritesSection =
        document.getElementById("favoritesSection");

    if(charactersSection){
        charactersSection.style.display = "none";
    }

    if(favoritesSection){
        favoritesSection.style.display = "block";
    }

}


// =========================
// GUARDAR FAVORITO
// =========================

function savefavorite(name){

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const button =
        document.querySelector(
            `.favorite-btn[data-name="${name}"]`
        );

    if(!button){
        console.log("No se encontró el botón de:", name);
        return;
    }

    const card =
        button.closest(".character-card");

    const character = {

        nombre: name,

        imagen:
            card.querySelector("img").src,

        unidad:
            card.dataset.unit

    };


    const alreadyExists =
        favorites.some(
            character => character.nombre === name
        );


    if(!alreadyExists){

        favorites.push(character);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

    }

}


// =========================
// MOSTRAR FAVORITOS
// =========================

function loadFavorites(){

    const favoriteList =
        document.getElementById("favoritesContainer");

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    if(favorites.length === 0){

        favoriteList.innerHTML =
            "No tienes personajes favoritos todavía.";

        return;

    }


    favoriteList.innerHTML = "";


    favorites.forEach(character => {

        favoriteList.innerHTML += `

            <div class="favorite-card" onclick="openFavoriteProfile('${character.nombre}')">

                <img
                    src="${character.imagen}"
                    class="favorite-image">

                <h3>
                    ❤️ ${character.nombre}
                </h3>

                <p>
                    ${character.unidad}
                </p>

<button onclick="event.stopPropagation(); removeFavorite('${character.nombre}')">
    ❌ Quitar
</button>


            </div>

        `;

    });

}

function openFavoriteProfile(name){

    const button =
        document.querySelector(
            `.profile-btn[data-name="${name}"]`
        );

    if(button){

        button.click();

    }

}
// =========================
// QUITAR FAVORITO
// =========================

function removeFavorite(name){

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favorites =
        favorites.filter(
            character => character.nombre !== name
        );

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    loadFavorites();

}

// APOYO

function openSupportModal(){

    document.getElementById("supportModal")
        .style.display = "flex";

}


function openSupport(){

    const button =
        document.querySelector(".patreon-btn");

    if(button){

        button.innerHTML =
            "⏳ Abriendo Patreon...";

        button.disabled = true;

    }

    closeModal("supportModal");

    setTimeout(() => {

        window.open(
            "https://patreon.com/c/katanokazuki/membership",
            "_blank"
        );

        if(button){

            button.innerHTML =
                "❤️ Ir a Patreon";

            button.disabled = false;

        }

    }, 800);

}


//CUENTA

function openAccount(){

    document.getElementById("accountModal")
    .style.display="flex";

}


// CERRAR

function closeModal(id){

    document.getElementById(id)
    .style.display="none";

}
