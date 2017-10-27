// Generator function to construct storage containers
const storageContainerGenerator = function* () {
    id = 1
    maxID = 30

    while(id <= maxID) {
        yield { "id": id, "type": "Mineral", "remainingCapacity": 565, "orders": [] }
        id++
    }
}

// create instance of generator funtion and create first container
const storageContainerFactory = storageContainerGenerator()
let currentStorageContainer = storageContainerFactory.next().value

// Create Heap Skope to mine and process raw minerals
const mineHeapSkope = function () {

    //define resources of both mines
    const mines = {
        "mine1" :
        {
            "gold": { "kilograms": 2775 },
            "coal": { "kilograms": 5302 }
        },

        "mine2" :
        {
            "iron": { "kilograms": 3928 },
            "copper": { "kilograms": 901 }
        }
    }

    // function to process minerals  - returns an object of up to 5kg until all mineral has been processed
    const processMineral = function (mineral, mine) {      

        let selectedMineral = mines[mine][mineral]
        let kilogramsToProcess = selectedMineral.kilograms
        let processedKilograms = (kilogramsToProcess > 5) ? 5 : kilogramsToProcess
        
        mines[mine][mineral].kilograms -= processedKilograms

        return {
            "mineral": mineral,
            "amount": processedKilograms // Change this to the correct amount
        }
    }

    //return function to process resources of the mines - send in the argument of the mine, calls the processMineral function and collects "packages" - returns an array of objects with the mineral name and the array of processed packages
    return {
        "process" : function (requestedMine) {
            let processedMineArray = []
            for (let mineralToBeProcessed in mines[requestedMine]) {
                let processedMineralArray = []
                while (true) {
                    let processedMineral = processMineral(mineralToBeProcessed, requestedMine)
                    if (processedMineral.amount > 0) {
                        processedMineralArray.push(processedMineral)
                    } else {
                        break
                    }
                }

                processedMineArray.push( { "mineral":mineralToBeProcessed, "processed_Mineral": processedMineralArray} )
            }
        return processedMineArray
        }
    }
}

let mineSkopeManager = mineHeapSkope()

const processedMines = {
    "mine1" : [],
    "mine2" : []
}

// process the mines and populate the processedMines object with the processed mineral objects
for (let mine in processedMines) {
    processedMines[mine] = (mineSkopeManager.process(mine))
}

mineHeapSkopeContainer = []

// fill storage containers with processed mineral objects until the reach capacity and then creating a new one
for (let mine in processedMines) {
    
    processedMines[mine].forEach(element => {
        
        while ( element.processed_Mineral.length > 0 ) {
            let mineralPackage = element.processed_Mineral.shift()
    
            if (mineralPackage.amount > currentStorageContainer.remainingCapacity) {
                mineHeapSkopeContainer.push(currentStorageContainer)
                currentStorageContainer = storageContainerFactory.next().value
            }
    
            currentStorageContainer.remainingCapacity -= mineralPackage.amount
            currentStorageContainer.orders.push(mineralPackage)
        }
    })
    
    mineHeapSkopeContainer.push(currentStorageContainer)
}