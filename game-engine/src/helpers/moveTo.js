export function moveTo(sprite, destinationPos, speed) {
    let distanceToXDest = destinationPos.x - sprite.position.x;
    let distanceToYDest = destinationPos.y - sprite.position.y;
    
    let distance = Math.sqrt(distanceToXDest ** 2 + distanceToYDest ** 2)
    
    if(distance <= speed) {
        sprite.position.x = destinationPos.x;
        sprite.position.y = destinationPos.y;
    } else {
        let normalizedX = distanceToXDest / distance;
        let normalizedY = distanceToYDest / distance;

        sprite.position.x += normalizedX * speed;
        sprite.position.y += normalizedY * speed;

        distanceToXDest = destinationPos.x - sprite.position.x;
        distanceToYDest = destinationPos.y - sprite.position.y

        distance = Math.sqrt(distanceToXDest ** 2 + distanceToYDest ** 2)
    
    }

    return distance
}