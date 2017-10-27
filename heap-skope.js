const gemHeapSkope = function () { // No parameter needed
    // Resource contained inside


    /*
    The gem mine does not exist outside the barricade of the
    hëap-skopes. The Lexscopistanians build the barricade
    around their facility AND the resource.

    a.k.a.
    Instead of being located in an outer scope to the
    function, the gem mine is enclosed by the scope of
    the `gemHeapSkope` function.
    */
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

    /*
    Instead of processing the entirety of the resources in
    bulk - which is what the stâck-skope does - this skope
    will return an object that has a method for processing
    each type of mineral.

    We're exposing the functionality of this skope to code
    in the outer scope, so that the order in which minerals
    are processed can be customized.

    Hëap-skopes workshops can process 5 kilograms of a
    mineral with each work order. So every time the `process`
    function is invoked, subtract 5 from the amount of the
    requested mineral from the enclosed GemMine above.
    */
    return {
        "process": function (requestedMineral) {
            /*
            Subtract 5 from the total kilograms available in
            the gem mine, but make sure you stop when there
            are no minerals left.
            */
            
            /*
            You can reference the `GemMine` variable here
            because it lives in an outer scope:
            e.g. GemMine[requestedMineral].kilograms
            */

            let gem = GemMine[requestedMineral]
            let kilogramsToProcess = gem.kilograms
            let processedKilograms = (kilogramsToProcess > 5) ? 5 : kilogramsToProcess
            
            GemMine[requestedMineral].kilograms -= processedKilograms

            return {
                "mineral": requestedMineral,
                "amount": processedKilograms // Change this to the correct amount
            }
        }
    }
}

/*
The SkopeManager variable represents the object with the
`process` method on it.
*/
const SkopeManager = gemHeapSkope()

/*
Process the gems in any order you like until there none
left in the gem mine.
*/

const processGems = gemToProcess => {
    
    // Create an empty array to return after funtion fills it
    let processedGemArray = []

    let processedGems = SkopeManager.process(gemToProcess)
    
    do {
        processedGemArray.push(processedGems)
        processedGems = SkopeManager.process(gemToProcess)
    } while (processedGems.amount > 0)
    
    return processedGemArray    
}
    // Process gems until it returns an "empty gem package"

    // do {
    //     processedGemArray.unshift(SkopeManager.process(gemToProcess))
    // } while (processedGemArray[0].amount === 5)

    // return processedGemArray


// Database to pack all packaged gems into
const processedGemDatabase = [
    {
        "gem" : "Onyx",
        "processedGems" : []
    },
    {
        "gem" : "Amethyst",
        "processedGems" : []
    },
    {
        "gem" : "Bloodstone",
        "processedGems" : []
    },
    {
        "gem" : "Emerald",
        "processedGems" : []
    }
]

// Iterate over databse and pack all processed gems into them
processedGemDatabase.forEach(element => {
    element.processedGems = processGems(element.gem)
})


/*
    Create a generator for 30 storage containers, which is how many a hëap-skope
    is equipped with.
*/

const storageContainerGenerator = function* () {
    id = 1
    maxID = 30

    while(id <= maxID) {
        yield { "id": id, "type": "Mineral", "remainingCapacity": 565, "orders": [] }
        id++
    }
}


const storageContainerFactory = storageContainerGenerator()
let currentStorageContainer = storageContainerFactory.next().value
/*
Place the gems in the storage containers, making sure that
once a container has 565 kilograms of gems, you move to the
next one.
*/

heapSkopeContainer = []

// debugger

//Iterate over all of the gems in the databse of processed gems
processedGemDatabase.forEach(element => {
    
    while ( element.processedGems.length>0 ) {
        let gemPackage = element.processedGems.shift()

        //If there is not enough room left in the container, push the container to the heapSkope and create a new container
        if (gemPackage.amount > currentStorageContainer.remainingCapacity) {
            heapSkopeContainer.push(currentStorageContainer)    
            currentStorageContainer = storageContainerFactory.next().value
        }
        //subrtact amount of gemPackage from remainingCapacity of currentStorageContainer and add the package to the currentStorageContainer's orders
        currentStorageContainer.remainingCapacity -= gemPackage.amount
        currentStorageContainer.orders.push(gemPackage)
    }
})

heapSkopeContainer.push(currentStorageContainer)
