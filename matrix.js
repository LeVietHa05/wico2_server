let width = 5;
let height = 3;
let noFloor = 2;
let item = [
    "item1",
    "item2",
    "item3",
    "item4",
    "item5",
    "item6",
    "item7",
    "item8",
    "item9",
    "item10",
]
//matrix will be used to store the data of the floor width x height x noFloor
//each element of the matrix is an object with the following properties:
// - uid: the uid of the card
//  -id: the id of the rfid reader
// - time: the time when the card is last detected
//the matrix is initialized with the default value of -1 for id and 0 for time

/**
 * Creates a matrix with the specified dimensions and initializes each element with default values.
 * @param {number} floor - The number of floors in the matrix.
 * @param {number} width - The width of each floor in the matrix.
 * @param {number} height - The height of each floor in the matrix.
 * @returns {Array} - The created matrix.
 */
function createMatrix(floor, width, height) {
    let count = 0;
    let matrix = new Array(noFloor);
    for (let i = 0; i < noFloor; i++) {
        matrix[i] = new Array(height);
        for (let j = 0; j < height; j++) {
            matrix[i][j] = new Array(width);
            for (let k = 0; k < width; k++) {
                matrix[i][j][k] = {
                    uid: Math.floor(Math.random() * 1000000000),
                    id: count,
                    time: Date.now(),
                    item: item[Math.floor(Math.random() * 10)],
                    isThingThere: false,
                }
                setNewLocation(count, k, j, i);
                count++
            }
        }
    }
    return matrix
}

//list of item that will be used to store the item that is detected by the rfid reader
let locationList = new Map();
//the item will be stored in the following format:
// - key: the id of rfid
// - value: the location of the item in the matrix (x, y, floor)

let listItem = new Map();
//the item will be stored in the following format:
// - key: the uid of the item
// - value: the name of the item


/**
 * Sets a new location for an item identified by its ID.
 * @param {string} id - The ID of the item.
 * @param {number} x - The x-coordinate of the new location.
 * @param {number} y - The y-coordinate of the new location.
 * @param {number} floor - The floor level of the new location.
 * @returns {boolean} - Returns true if the item's location was successfully set, false otherwise.
 */
function setNewLocation(id, x, y, floor) {
    if (!locationList.has(id)) {
        locationList.set(id, { x: x, y: y, floor: floor });
        return true;
    }
    return false;
}

/**
 * Retrieves the location of an RFID item based on its ID.
 * @param {string} id - The ID of the RFID item.
 * @returns {object|null} - The location of the RFID item, or null if the item does not exist.
 */
function getLocationOfRFID(id) {
    if (!locationList.has(id)) {
        return null;
    }
    return locationList.get(id);
}

function updateUID(id, uid, matrix) {
    let location = getLocationOfRFID(id);
    if (location != null) {
        matrix[location.floor][location.y][location.x].uid = uid;
        matrix[location.floor][location.y][location.x].time = Date.now();
        return true;
    }
    return false;
}

function updateThing(isThingTheres, matrix) {
    for (let i = 0; i < isThingTheres.length; i++) {
        if (i < 5) matrix[0][0][i].isThingThere = isThingTheres[i] == 1 ? true : false;
        else if (i < 10) matrix[0][1][i - 5].isThingThere = isThingTheres[i] == 1 ? true : false;
        else matrix[0][2][i - 10].isThingThere = isThingTheres[i] == 1 ? true : false;
    }
    return true;
}

const matrix = createMatrix(noFloor, width, height);
matrix[0][0][0].item = "item1";
matrix[0][0][1].item = "item1";
matrix[0][0][2].item = "item2";
matrix[0][0][3].item = "item3";
matrix[0][0][4].item = "item4";
matrix[0][1][0].item = "item5";
matrix[0][1][1].item = "item6";
matrix[0][1][2].item = "item2";
matrix[0][1][3].item = "item7";
matrix[0][1][4].item = "item8";
matrix[0][2][0].item = "item9";
matrix[0][2][1].item = "item9";
matrix[0][2][2].item = "item10";
matrix[0][2][3].item = "item10";
matrix[0][2][4].item = "item10";


module.exports = {
    matrix: matrix,
    createMatrix: createMatrix,
    setNewLocation: setNewLocation,
    getLocationOfRFID: getLocationOfRFID,
    updateUID: updateUID,
    updateThing: updateThing
}