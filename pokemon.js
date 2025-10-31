console.log('tot ok');

const apiUrl = 'https://pokeapi.co/api/v2';
let equip = [];

window.onload = async() => {

    const botoBuscar = document.getElementById('botobuscar');
    botoBuscar.addEventListener('click', () => buscarPokemon());


    const pokemons = await fetchpokemons();
    const pokemonsection = document.getElementById('pokemonsection');

    for (const actual of pokemons) {
        const pokemondiv = document.createElement('div');
        pokemondiv.classList.add('pokemondiv');
        pokemondiv.style.cursor = 'pointer';

        pokemondiv.addEventListener('click', function() {
            mostrarStats(actual, this);
        });

        const name = document.createElement('p');
        name.classList.add('pokemon-name');
        name.innerText = actual.name;
        pokemondiv.appendChild(name);


        const id = document.createElement('p');
        id.classList.add('pokemon-id'); 
        id.innerText = `ID: ${actual.id}`;
        pokemondiv.appendChild(id);

        const botoafegir = document.createElement('button');
        id.classList.add('pokemon-button');
        botoafegir.innerText = 'Afegir a l\'equip';
        botoafegir.addEventListener('click', (event) => { 
            event.stopPropagation();
            afegirAEquip(actual);
        });
        pokemondiv.appendChild(botoafegir);
        pokemonsection.appendChild(pokemondiv);
    }

}


async function fetchpokemons() {
    const response = await fetch(`${apiUrl}/pokemon?limit=151`);
    const data = await response.json();
    const pokemondetails = [];

    for (const pokemon of data.results) {
        const details = await fetch(pokemon.url);
        const pokemondata = await details.json();
        pokemondetails.push(pokemondata);
    }
    return pokemondetails;
}


async function buscarPokemon() {
    const pokemonbuscar = document.getElementById('buscarpokemon').value;
    const nompokemon = pokemonbuscar.toLowerCase().trim();
    const resposta = document.getElementById('resultats');

    const httppokemon = await fetch(`${apiUrl}/pokemon/${nompokemon}`);

    if (!httppokemon.ok) {
        resposta.innerHTML = 'Pokemon no trobat. Si us plau, intenta-ho de nou.';
        return;
    }

    const dadespokemon = await httppokemon.json();

    const aliaspokemon = document.createElement('h3');
    aliaspokemon.innertext = dadespokemon.name;
    resposta.appendChild(aliaspokemon);

    const nombuscat = document.createElement('p');
    nombuscat.innerText = dadespokemon.name;
    resposta.appendChild(nombuscat);

    const idbuscat = document.createElement('p');
    idbuscat.innerText = `Numero de la pokedex  #${dadespokemon.id}`;
    resposta.appendChild(idbuscat);

    const seccioresultat = document.createElement('ul');
    const titolTipus = document.createElement('p');
    titolTipus.innerText = 'Tipus:';
    resposta.appendChild(titolTipus);

    for (const tipo of dadespokemon.types) {
        const elementTipus = document.createElement('li');
        elementTipus.innerText = tipo.type.name;
        resposta.appendChild(elementTipus);
    }

    const imatgepokemon = document.createElement('img');
    imatgepokemon.classList.add('pokemon-buscat-image');
    imatgepokemon.src = dadespokemon.sprites.other['official-artwork'].front_default;
    resposta.appendChild(imatgepokemon);

    resposta.appendChild(seccioresultat);
    
}

