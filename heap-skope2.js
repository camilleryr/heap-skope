// Generator function to create storageContainers

const storageContainerGenerator = function* () {
    id = 1
    maxID = 30

    while(id <= maxID) {
        yield { "id": id, "type": "Mineral", "remainingCapacity": 565, "orders": [] }
        id++
    }
}

// Create instance of generator function and set first container

const storageContainerFactory = storageContainerGenerator()
let currentStorageContainer = storageContainerFactory.next().value

// define gem mine and process function
const gemHeapSkope = function () { 
    
    const GemMine = {
        "Onyx": {
        "kilograms": 453
        },
        "Amethyst": {
        "kilograms": 453
        },
        "Bloodstone": {
        "kilograms": 453
        },
        "Emerald": {
        "kilograms": 453
        }
    }

    // function to process gems
    // generatory that will iterate over keys in the object and return processed packages until the gem is depleted
    return {
        "process" : function* () {
            // Iterate over gems in the mine
            for (let requestedGem in GemMine) {
                    
                // Set the package amount to 5kg or the remaining mineral amount
                let kilogramsToProcess = GemMine[requestedGem].kilograms
                let processedKilograms = (kilogramsToProcess > 5) ? 5 : kilogramsToProcess

                //if there is something in the package (amount greater than 0) yield the package
                if (processedKilograms > 0) {
                    GemMine[requestedGem].kilograms -= processedKilograms
                    yield {
                        "mineral": requestedGem,
                        "amount": processedKilograms
                    }
                }
            }
        }
    }
}

// create instance of generator function and create heap skope container
const SkopeManager = gemHeapSkope()
let HeapSkopeContainer = []

// request packages until none remail
const retrieveProcessedMinerals = function() {
    while (returnedPackage = SkopeManager.process().next().value) 
    {
        // check the capacity of the storage container and if there is not enough capacity for the package, add the storage container to the heap skope and create a new container
        if (returnedPackage.amount > currentStorageContainer.remainingCapacity) {
            HeapSkopeContainer.push(currentStorageContainer)
            currentStorageContainer = storageContainerFactory.next().value
        }
        
        // subtract the package amount from the storageContainer push package to heap skope
        currentStorageContainer.remainingCapacity -= returnedPackage.amount
        currentStorageContainer.orders.push(returnedPackage)
        
    }
    // push final container into heapskope if there are any packages in it  
    if (currentStorageContainer.orders.length > 0) {
        HeapSkopeContainer.push(currentStorageContainer)
    }
}


retrieveProcessedMinerals()
console.log(HeapSkopeContainer)