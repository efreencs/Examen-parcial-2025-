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

    const httppokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${nompokemon}`);

    if (!httppokemon.ok) {
        resposta.innerHTML = 'Pokemon no trobat. Si us plau, intenta-ho de nou.';
        return;
    }

    const dadespokemon = await httppokemon.json();

    const aliaspokemon = document.createElement('h3');
    aliaspokemon.innertext = dadespokemon.name;
    resposta.appendChild(aliaspokemon);

    const nombuscat = document.createElement('p');
    nombuscat.innerText = dataBusqueda.name;
    resultat.appendChild(nombuscat);

    const idbuscat = document.createElement('p');
    idbuscat.innerText = `#${dataBusqueda.id}`;
    resultat.appendChild(idbuscat);

    const seccioresultat = document.createElement('ul');
    const titolTipus = document.createElement('p');
    titolTipus.innerText = 'Els tipus del pokemon son:';
    resultat.appendChild(titolTipus);
    
    for (const tipo of dataBusqueda.types) {
        const elementTipus = document.createElement('li');
        elementTipus.innerText = tipo.type.name;
        seccioresultat.appendChild(elementTipus);
    }
    resultat.appendChild(seccioresultat);

    const imatgepokemon = document.createElement('img');
    imatgepokemon.src = dadespokemon.sprites.other['official-artwork'].front_default;
    resposta.appendChild(imatgepokemon);
    
}
