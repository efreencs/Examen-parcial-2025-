console.log('tot ok');

const apiUrl = 'https://pokeapi.co/api/docs/v2';
let equip = [];

window.onload = () => {
    const pokemons = await fetchpokemons();
    pokemonsection = document.getElementById('pokemonsection');
    for (const actual of pokemons) {
        const pokemondiv = document.createElement('div');
        pokemondiv.classList.add('pokemondiv');




}


async function fetchpokemons() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const pokemondetails = [];
    for (const pokemon of data.results) {
        const details = await fetchpokemon(pokemon.url);
        const pokemondata = await details.json();
        pokemondetails.push(pokemondata);
    }
    return pokemondetails;
}