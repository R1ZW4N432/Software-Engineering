function positionPins() {
    var map = document.querySelector('.world-map');
    var mapRect = map.getBoundingClientRect(); // Get the size and position of the map container

    // An array of all pins with their relative positions
    var pins = [
        {selector: '.northa', position: {x: 21, y: 23}},
        {selector: '.southa', position: {x: 30, y: 53}},
        {selector: '.europe', position: {x: 53, y: 17}},
        {selector: '.africa', position: {x: 52, y: 42}},
        {selector: '.asia', position: {x: 68, y: 22}},
        {selector: '.oceania', position: {x: 83, y: 63}}
    ];

    // Loop through each pin to position it
    pins.forEach(function(pin) {
        var element = document.querySelector(pin.selector);
        if (element) {
            // Calculate position based on the map size and pin's specified position
            element.style.left = (mapRect.width * pin.position.x / 100) + 'px';
            element.style.top = (mapRect.height * pin.position.y / 100) + 'px';
        }
    });
}

// Run on load and on resize to adjust the pins accordingly
window.addEventListener('load', positionPins);
window.addEventListener('resize', positionPins);
