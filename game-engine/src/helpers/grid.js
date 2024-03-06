export const gridCells = n =>{
    return n * 16
}

export function isSpaceFree(walls, x, y) {
    const coords = `${x},${y}`; // x and y for lookup

    const isWallPresent = walls.has(coords); // lookup
    return !isWallPresent
}