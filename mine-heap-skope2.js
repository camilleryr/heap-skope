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

    // Generator funtion that iterates over all mines and all minerals and returns 1 package at a time
    return {
        "process" : function* () {

            // Iterate over mines of mines object
            for (let requestedMines in mines) {

                //iterate over minerals in mine object
                for (let requestedMineral in mines[requestedMines]) {
                    
                    // Set the package amount to 5kg or the remaining mineral amount
                    let kilogramsToProcess = mines[requestedMines][requestedMineral].kilograms
                    let processedKilograms = (kilogramsToProcess > 5) ? 5 : kilogramsToProcess

                    //if there is something in the package (amount greater than 0) yield the package
                    if (processedKilograms > 0) {
                        mines[requestedMines][requestedMineral].kilograms -= processedKilograms
                        yield {
                            "mineral": requestedMineral,
                            "amount": processedKilograms
                        }
                    }
                }
            }
        }
    }
}

// Define the processor functon and the Heap Skope for the storage containers
let returnPackage = mineHeapSkope()
let mineHeapSkopeContainer = []

// request packages until none remail
while (returnedPackage = returnPackage.process().next().value) 
{
    // check the capacity of the storage container and if there is not enough capacity for the package, add the storage container to the heap skope and create a new container
    if (returnedPackage.amount > currentStorageContainer.remainingCapacity) {
        mineHeapSkopeContainer.push(currentStorageContainer)
        currentStorageContainer = storageContainerFactory.next().value
    }
    
    // subtract the package amount from the storageContainer push package to heap skope
    currentStorageContainer.remainingCapacity -= returnedPackage.amount
    currentStorageContainer.orders.push(returnedPackage)
    
 }
