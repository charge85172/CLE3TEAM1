let gerechten = [
    [["steak"],
        [""],
        ["meat", "animal"]],
    [["zalmfillet"],
        [""],
        ["meat", "animal"]],
    [["friet"],
        [""],
        [""]],
    [["zoete aardappel friet"],
        [""],
        [""]],
    [["mixed Grill"],
        [""],
        ["meat", "animal"]],
    [["salade"],
        [""],
        [""]],
    [["hamburger"],
        [""],
        ["meat", "animal", "gluten"]],
    [["clubsandwich"],
        [""],
        ["meat", "animal", "gluten"]],
    [["caspacio"],
        [""],
        ["meat", "animal", "nuts"]],
    [["tortilla wraps"],
        [""],
        ["gluten", "animal"]],
    [["gevulde paprika"],
        [""],
        ["animal", "meat"]],
    [["vega balletjes"],
        [""],
        ["gluten", "nuts"]],
    [["courgette soep"],
        [""],
        [""]],
    [["paddestoelenstoof"],
        [""],
        [""]],
    [["witlofgratin"],
        [""],
        ["animal", "milk"]],
    [["pizza magaritta"],
        [""],
        ["animal", "gluten", "milk"]],
    [["vega gevulde paprika"],
        [""],
        ["nuts"]],
    [["stampot"],
        [""],
        [""]],
    [["Gamba's"],
        [""],
        ["animal", "meat"]],
    [["kapsalon"],
        [""],
        ["meat", "animal"]],
    [["vega kapsalon"],
        [""],
        ["nuts", "gluten"]],
    [["garnalen cocktail"],
        [""],
        ["animal", "meat"]],
    [["tomatensoep"],
        [""],
        ["gluten", "animal", "meat"]],
    [["kippensoep"],
        [""],
        ["animal", "meat"]],
    [["vega kippensoep"],
        [""],
        [""]],
    [["spagetti"],
        [""],
        ["gluten"]],
    [["pasta"],
        [""],
        ["gluten"]],
    [["kipcurry"],
        [""],
        ["meat", "animal", "milk"]],
    [["nasi"],
        [""],
        [""]],
    [["bami"],
        [""],
        [""]],
    [["inkvisringen"],
        [""],
        ["animal", "meat"]]
]
let drinken = [
    [["koffie"],
        [""],
        [""]],
    [["latte machiatto"],
        [""],
        ["animal", "milk"]],
    [["thee"],
        [""],
        [""]],
    [["ijsthee"],
        [""],
        [""]],
    [["cola"],
        [""],
        [""]],
    [["appelsap"],
        [""],
        [""]],
    [["jus d'orange"],
        [""],
        [""]],
    [["chocolade melk"],
        [""],
        ["milk", "animal"]],
    [["cocktail"],
        [""],
        ["milk", "animal", "meat"]],
    [["bier"],
        [""],
        ["gluten"]],
    [["wijn"],
        [""],
        [""]],
    [["bitterlemon"],
        [""],
        [""]],
    [["blikje energy"],
        [""],
        [""]],
    [["bruis water"],
        [""],
        [""]],
]
let nagerechten = [
    [["bananen split"],
        [""],
        [""]],
    [["cheesecake"],
        [""],
        ["milk", "animal"]],
    [["tiramisu"],
        [""],
        ["gluten", "animal", "milk"]],
    [["ijs"],
        [""],
        [""]],
    [["slagroom soesjes"],
        [""],
        [""]],
    [["baklava"],
        [""],
        [""]],
    [["creme brulee"],
        [""],
        [""]],
    [["brownie"],
        [""],
        [""]],
    [["appeltaart"],
        [""],
        [""]],
    [["sundee"],
        [""],
        [""]],
    [["chocolade taart"],
        [""],
        [""]],
    [["fruit mix"],
        [""],
        [""]],
    [["meloen stukken"],
        [""],
        [""]],
    [["gebakken vruchten"],
        [""],
        [""]],
]
let pages = [gerechten, drinken, nagerechten]
let filters = ['milk', 'meat', 'animal', 'nuts', 'alcohol', 'gluten']
let products

//info:
// checking: pages-> page -> gerecht-> filter-> filterItem
// making: products-> list -> object-> productFilter
// hoe: draai checking om voor making
function checkArr() {
    let ok = true
    let products
    for (let x = 0; x < pages.length; x++) {
        let page = pages[x]
        let list

        for (let y = 0; y < page.length; y++) {
            let gerecht = page[y]
            let object = {
                title: "",
                image: "",
                description: "",
                vegan: true,
                lactoFree: true,
                glutenFree: true,
                nutFree: true,
                alcoholFree: true
            }

            if (gerecht.length !== 3) {
                console.log(`Missend element in ${gerecht}`)
                ok = false
            }

            let name = gerecht[0]
            let uitleg = gerecht[1]
            let filter = gerecht[2]
            let img = ""

            for (let z = 0; z < filter.length; z++) {
                let filterItem = filter[z]

                if (filterItem === 'milk') {
                    object.lactoFree = false
                    object.vegan = false
                }
                if (filterItem === 'meat') {
                    object.vegan = false
                }
                if (filterItem === 'animal') {
                    object.vegan = false
                }
                if (filterItem === 'nuts') {
                    object.nutFree = false
                }
                if (filterItem === 'gluten') {
                    object.glutenFree = false
                }
                if (filterItem === 'alcohol') {
                    object.alcoholFree = false
                }
            }
            object.title = name
            object.image = img
            object.description = uitleg
            list.push(object)
        }
        products.push(list)
    }
    if (ok) {
        JsonTf(products)
    }
}

checkArr()
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

