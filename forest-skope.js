//Define forest with given state
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

// how many logs fit into a container
let containerCapacity = 22

// container generator - will make up to 10
const cropContainerGenerator = function* () {
    let currentContainer = 1
    const maximumContainers = 10

    while (currentContainer <= maximumContainers) {
        yield { "id": currentContainer, "logs": [], "remainingCapacity": containerCapacity}
        currentContainer++
    }
}

// instance of generator
let cropContainerFactory = cropContainerGenerator()

// define the stack scope that we will fill with the function
const forestStackSkope = []

// process tress into logs, put the logs into containers, and put the containers into the skope
const cropStackSkope = function (trees) {
    
    // Process trees into 4 logs each - create an array of objects with tree type and the number of logs
    let processedTrees = []
    forest.forEach(tree => { processedTrees.push({"type": tree.type, "logs": (tree.plants * 4)})})

    //Initialize first container with generator function
    let currentForestContainer = cropContainerFactory.next().value

    // Start filling up the 10 available storage containers
    // iterate over each tree in the processedTrees array
    processedTrees.forEach(tree => {

        // for each log in the tree object
        for (let index = 0; index < tree.logs; index++) {

            // if there is no more capacity in the container
            if (currentForestContainer.remainingCapacity === 0 ) {
                
                // add the container to the skope and move to the next container
                forestStackSkope.push(currentForestContainer)
                currentForestContainer = cropContainerFactory.next().value
            }

            // add the log to the container and reduce capacity by 1
            currentForestContainer.logs.push( {"type": `${tree.type}`} )
            currentForestContainer.remainingCapacity--
        }
    })

    // add final container to skope
    if (currentForestContainer.logs.length > 0) {
        forestStackSkope.push(currentForestContainer)
    }
}

cropStackSkope()