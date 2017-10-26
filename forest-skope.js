const forest = [
    {
        "type": "Oak",
        "plants": 9
    },
    {
        "type": "Pine",
        "plants": 12
    },
    {
        "type": "Ash",
        "plants": 6
    },
    {
        "type": "Balsa",
        "plants": 10
    }
]

const cropContainerGenerator = function* () {
    let currentContainer = 1
    const maximumContainers = 10

    while (currentContainer <= maximumContainers) {
        yield { "id": currentContainer, "type": "wood", "logs": [] }
        currentContainer++
    }
}

const cropStackSkope = function (trees) {
    // Functionality to convert each tree into 4 logs
    const processedTrees = []

    forest.forEach(tree => { processedTrees.push({"type": tree.type, "logs": (tree.plants * 4)})})

    console.log(processedTrees)
    // Start filling up the 10 available storage containers
}

cropStackSkope()