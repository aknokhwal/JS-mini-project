const searchInput = document.getElementById("search-input");
const form = document.getElementById("search-form");
const nameSpan = document.getElementById("pokemon-name");
const idSpan = document.getElementById("pokemon-id");
const weightSpan = document.getElementById("weight");
const heightSpan = document.getElementById("height");
const spriteDiv = document.getElementById("sprite-container");
const typeDiv = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");


const updateUI = (data) => {

    const {name, id, weight, height, sprites, stats, type} = data;
    nameSpan.innerHTML = name.toUpperCase();
    idSpan.innerHTML = `#${id}`;
    weightSpan.innerHTML = `Weight: ${weight}`;
    heightSpan.innerHTML = `Height: ${height}`;
    spriteDiv.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `;
    hp.innerHTML = stats[0].base_stat;
    attack.innerHTML = stats[1].base_stat;
    defense.innerHTML = stats[2].base_stat;
    specialAttack.innerHTML = stats[3].base_stat;
    specialDefense.innerHTML = stats[4].base_stat;
    speed.innerHTML = stats[5].base_stat;

    typeDiv.innerHTML = data.types.map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`).join('');
};


const resetUI = () => {
    nameSpan.innerHTML = '';
    idSpan.innerHTML ='';
    weightSpan.innerHTML = '';
    heightSpan.innerHTML = '';
    spriteDiv.innerHTML = '';
    hp.innerHTML = '';
    attack.innerHTML = '';
    defense.innerHTML = '';
    specialAttack.innerHTML = '';
    specialDefense.innerHTML = '';
    speed.innerHTML = '';
    typeDiv.innerHTML = '';
}
const checkUserInput = () => {
    const userInput = searchInput.value;
    if (isNaN(userInput)) {
        fetchData(userInput.toLowerCase());
    } else{
        fetchData(Number(userInput));
    }
};

const fetchData = async (nameOrId) => {
    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        updateUI(data);
    } catch (error){
        resetUI();
        alert("pokemon not found");
        console.log(error);
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkUserInput();
});