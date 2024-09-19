let currentPokemonId = 1;

const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonDisplay = document.getElementById('pokemon-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const searchBtn = document.getElementById('search-btn');
const pokemonIdInput = document.getElementById('pokemon-id');

async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokémon não encontrado');
        const pokemon = await response.json();

        pokemonName.textContent = pokemon.name.toUpperCase();
        pokemonImage.src = pokemon.sprites.front_default;

        const pokemonTypes = pokemon.types;
        changeBackgroundColor(pokemonTypes);
    } catch (error) {
        pokemonName.textContent = 'Erro: ' + error.message;
        pokemonImage.src = '';
        pokemonDisplay.style.backgroundColor = 'lightgray';
    }
}

function changeBackgroundColor(types) {
    let primaryType = types[0].type.name;
    let color = getColorByType(primaryType);
    
    // Se o Pokémon tiver mais de um tipo, aplicar gradiente.
    if (types.length > 1) {
        let secondaryType = types[1].type.name;
        color = `linear-gradient(45deg, ${getColorByType(primaryType)}, ${getColorByType(secondaryType)})`;
    }

    pokemonDisplay.style.background = color;
}

function getColorByType(type) {
    switch (type) {
        case 'fire':
            return 'red';
        case 'water':
            return 'blue';
        case 'grass':
            return 'green';
        case 'electric':
            return 'yellow';
        case 'ground':
            return 'brown';
        case 'rock':
            return 'gray';
        case 'ice':
            return 'lightblue';
        case 'fighting':
            return 'orange';
        case 'poison':
            return 'purple';
        case 'psychic':
            return 'pink';
        case 'ghost':
            return 'indigo';
        case 'dragon':
            return 'darkblue';
        case 'dark':
            return 'black';
        case 'steel':
            return 'silver';
        case 'fairy':
            return 'lightpink';
        // Outros tipos podem ser adicionados aqui
        default:
            return 'lightgray';
    }
}

prevBtn.addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemon(currentPokemonId);
    }
});

nextBtn.addEventListener('click', () => {
    currentPokemonId++;
    fetchPokemon(currentPokemonId);
});

searchBtn.addEventListener('click', () => {
    const id = parseInt(pokemonIdInput.value);
    if (!isNaN(id) && id > 0) {
        currentPokemonId = id;
        fetchPokemon(id);
    } else {
        alert('Por favor, insira um ID válido.');
    }
});

// Inicializar com o primeiro Pokémon
fetchPokemon(currentPokemonId);
