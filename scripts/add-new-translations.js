const tobeadded = [
]



const originalList = [

]


// Function to add new items to the existing list with incrementing IDs
function addItemsWithIds(existingList, newItems) {
    // Find the maximum ID in the existing list
    let maxId = Math.max(...existingList.map(item => item.id));

    // If no valid maxId is found (like if the list is empty), start at 1
    if (isNaN(maxId)) {
        maxId = 0;
    }

    // Add new items to the existing list with incremented IDs
    newItems.forEach(item => {
        maxId++;
        item.id = maxId;
        existingList.push(item);
    });
}

// Add new items to the list
addItemsWithIds(originalList, tobeadded);


// Output the updated list
console.log(originalList);