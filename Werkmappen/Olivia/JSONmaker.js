let gerechten = [
    "steak",
    "zalmfillet",
    "friet",
    "zoete aardappel friet",
    "mixed Grill",
    "salade",
    "hamburger",
    "clubsandwich",
    "caspacio",
    "tortilla wraps",
    "gevulde paprika",
    "vega balletjes",
    "courgette soep",
    "paddestoelenstoof",
    "witlofgratin",
    "pizza magaritta",
    "vega gevulde paprika",
    "stampot",
    "Gamba's",
    "kapsalon",
    "vega kapsalon",
    "garnalen cocktail",
    "tomatensoep",
    "kippensoep",
    "vega kippensoep",
    "spagetti",
    "pasta",
    "kipcurry",
    "nasi",
    "bami",
    "inkvisringen"
]
let drinken = [
    "koffie",
    "latte machiatto",
    "thee",
    "ijsthee",
    "cola",
    "appelsap",
    "jus d'orange",
    "chocolade melk",
    "cocktail",
    "bier",
    "wijn",
    "bitterlemon",
    "blikje energy",
    "bruis water"
]
let nagerechten = [
    "bananen split",
    "cheesecake",
    "tiramisu",
    "ijs",
    "slagroom soesjes",
    "baklava",
    "creme brulee",
    "brownie",
    "appeltaart",
    "sundee",
    "chocolade taart",
    "fruit mix",
    "meloen stukken",
    "gebakken vruchten"
]
let pages = [gerechten, drinken, nagerechten]
let filters = ['milk', 'meat', 'animal', 'nuts']

function checkArr() {
    for (let x = 0; x < pages.length; x++) {
        let page = pages[x]

        for (let y = 0; y < page.length; y++) {
            let gerecht = page[y]

            if (gerecht.length !== 3) {
                console.log(`Missend element in ${gerecht}`)
            }

            let name = gerecht[0]
            let discription = gerecht[1]
            let filter = gerecht[2]

            for (let z = 0; z < filter.length; z++) {
                let filterItem = filter[z]

                for (let i = 0; i < filters.length; i++) {
                    if (filterItem !== filters[i]) {
                        console.log(`${filterItem} is geen geldige filterItem in ${name}`)
                    }
                }
            }
        }
    }
}

console.log(products)

// loadJSON("products.JSON", shitter)

function shitter(data) {
    products = data
    console.log(products)

}

function loadJSON(url, callBack) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(callBack)
        .catch(error => console.log(error))
}

