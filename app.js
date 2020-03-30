// Get the main pokedex container
const pokeContainer = document.getElementById('pokeContainer');

// Store the pokemons to a variable. We will use the number of 150 to fetch all of the pokemons
const pokemonsTotal = 150;

// Create an object 
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#F4E7DA',
    rock: '#D5D5D4',
    fairy: '#FCEAFF',
    poison: '#98D7A5',
    bug: '#F8D5A3',
    dragon: '#97b3e6',
    psychic: '#EAEDA1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#f5f5f5'
};

// Return an array of the kays and values of colors
const mainTypes = Object.keys(colors);
console.log(mainTypes);

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemonsTotal; i++) {
        await getPokemon(i);
    }
}

// Get the data from the Poke API
const getPokemon = async id => {
    const api = `https://pokeapi.co/api/v2/pokemon/${id}`;
    // Get the pokemon
    const res = await fetch(api);
    const pokemon = await res.json();
    console.log(pokemon);
    createPokemonCard(pokemon);
}

fetchPokemons();

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const pokeTypes = pokemon.types.map(el => el.type.name);
    
    // Go through all of the types and find the first one which is in the poketypes array
    const type = mainTypes.find(
        type => pokeTypes.indexOf(type) > -1
    );

    // Get the name of the pokemon from the API and then use two functions to (1) uppercase the first letter then (2) slice the string and return it starting from the second letter
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
        </div>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    pokeContainer.appendChild(pokemonEl);
}

