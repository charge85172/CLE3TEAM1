let products = [
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

