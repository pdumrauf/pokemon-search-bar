const searchInput = document.querySelector(".input-serch")
const button = document.querySelector(".btn-click")
const divPokemonInfo = document.querySelector(".pokemon-container")

let pokeArray = []

async function init() {
    const pokemonList = await getResponse('https://pokeapi.co/api/v2/pokemon')
    pokeArray =  await getFullData(pokemonList)
    addEventListeners()
    displayData(pokeArray)
}

// AXIOS
async function getResponse(url) {
    const {data} = await axios.get(url)
    return data
}

// GET data from API (getResponse)
async function getFullData({results}) {
    
    const data = results.map(async (result) => {
        const pokemonData = await getResponse(result.url)
        return {
            name : pokemonData.name,
            img : pokemonData.sprites.front_default   
        }
    })

    return Promise.all(data).then((values) => {
        return values
     })
}


//display data on DOM
function displayData(array) {
    let result = ''

    array.forEach(pokemon => {
        result += `
            <div>
                <p>${pokemon.name}</p>
                <img src=${pokemon.img} alt="pokemon image" />
            </div>
        `        
    })
    
    divPokemonInfo.innerHTML = result 

}

//Function to add all the listeners of my program
function addEventListeners() {
    searchInput.addEventListener("input", onSearchInput)
}

//function to search in the input calling a filtered function
function onSearchInput(event) {
    const value = event.target.value.toLowerCase()
    const filteredPokemon = getFilteredPokemon(value)
    console.log(value)
    displayData(filteredPokemon)   
}

//function that filter pokemon depending on the input value
function getFilteredPokemon(term) {
    return pokeArray.filter(pokemon => {
        return pokemon.name.includes(term)
    })
}

init()
