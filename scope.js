/*
    Generator functions can be used to generate a value, or object,
    on demand, until a certain condition is met. The function below
    defines a generator for crop storage containers. Since stack skupes
    are used to collect crops, and they use 10 storage containers, 
    instances of this generator will stop producing containers after the
    10th one.
*/
const cropContainerGenerator = function* () {
    let currentContainer = 1
    const maximumContainers = 10

    while (currentContainer <= maximumContainers) {
        yield { "id": currentContainer, "type": "Crop", "bushels": [] }
        currentContainer++
    }
}

/*
    Create an instance of the crop container generator function.
    `cropContainerFactory` will generate 10 containers.

    > cropContainerFactory.next().value
    { "id": 1, "type": "Crop", "bushels": [] }

    > cropContainerFactory.next().value
    { "id": 2, "type": "Crop", "bushels": [] }

    etc..
*/
const cropContainerFactory = cropContainerGenerator()

/*
    A field containing four types of crops to process
    It exists outside of the stack skope.
*/
let agriculturalField = [
    {
        "type": "Corn",
        "plants": 368
    },
    {
        "type": "Wheat",
        "plants": 452
    },
    {
        "type": "Kale",
        "plants": 212
    },
    {
        "type": "Turnip",
        "plants": 84
    }
]

/*
    Create a skope function to process each tree.

    Lexscopistanian food processors can produce 1 bushel of a
    crop for every 22 plants
*/
const cropStackSkope = function (rawCrops) {
    /*
        Use the array map() method to build up a new array
        populated with processed crops. Remember that the map
        method iterates over an array, one item at a time, 
        and runs the logic in the provided function on each 
        iteration.
    */
    const processedCrops = rawCrops.map(
        /*
            For each crop, return a new object representing
            the bushels to store in the containers.

            This is an example of an arrow function with an
            expression body.
                https://mzl.la/1rrAsL3
        */
        currentCrop => ({
            "type": currentCrop.type,
            "bushels": Math.floor(currentCrop.plants / 22)
        })
    )

    /*
        `processedCrops` is only available within the block 
        scope of this function
    */
    return processedCrops
}

/*
    Remember that JavaScript is object-oriented, so everything
    is an object - including functions. Since functions are
    objects, then you can add key/value pairs to them
*/
cropStackSkope.containers = []


/*
    Construct the skope, and import all of the gathered
    resources to be processed. The end result is a collection
    of bushels that need to be stored.

    a.k.a.
    Invoke the function, and store its return value - an array
    of objects - in the `allBushels` variable.
*/
let allBushels = cropStackSkope(agriculturalField)


/*
    Now that the crops have been processed into bushels, you
    need to place them in the storage containers. Keep in mind
    that storage containers can hold 21 bushels of food.

    1. Open the first container by invoking the `cropContainerFactory`
       generator function.
    2. Iterate over the `allBushels` array
    3. Look at each object, which holds information about the type of
       resource, and how many bushels were produced, and get the value
       of the `bushels` property 
    3. Do a `for` loop that iterates up to that value
    4. Insert a new object into a storage container. The object
       should describe the type of bushel.

         e.g. { "crop": "Wheat" }

    5. Make sure you keep count of how many bushels are in the
       container, and once it reaches 21, start placing the 
       objects in the next container.
*/

// Open the first container
let currentContainer = cropContainerFactory.next().value

// Iterate over the `allBushels` array
allBushels.forEach(

    // Look at each processed crop object
    currentBushel => {

        // Do a `for` loop that iterates up to number of bushels
        for (let i = 0; i < currentBushel.bushels; i++) {

            // Insert a new object into a storage container
            const bushel = {"type": currentBushel.type}
            currentContainer.bushels.push(bushel)

            // Once capacity is reached, use next storage container
            if (currentContainer.bushels.length === 21) {
                cropStackSkope.containers.push(currentContainer)
                currentContainer = cropContainerFactory.next().value
            }
        }
    }
)


/*
    Try to console.log() any of the values defined in the block scope
    above, such as `i`, `bushel`, or `currentBushel`
*/


/*
    If there is a partially filled container left over, add it to the
    collection of skope storage containers.
*/
if (currentContainer.bushels.length > 0) {
    cropStackSkope.containers.push(currentContainer)
}

// Take a look at what's in your containers
console.log(cropStackSkope.containers)