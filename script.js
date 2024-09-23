const images = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"];
let currentImageIndex = 0;
const mainImage = document.getElementById('main-image');
const endcard = document.getElementById('endcard');
let holdTimer;
let imageLoop;
let isHeld = false;
let isEndcardVisible = false;
const holdDuration = 2000; // 2 seconds hold to transition to endcard
const autoEndcardTime = 20000; // 20 seconds auto-transition to endcard

// Function to loop through images
function loopImages() {
    if (!isHeld && !isEndcardVisible) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        mainImage.src = images[currentImageIndex]; // Update the displayed image
    }
}

// Change image every 0.5 second
imageLoop = setInterval(loopImages, 500);

// Handle touch and mouse events to pause the image sequence
function handleHoldStart() {
    isHeld = true;
    clearInterval(imageLoop); // Pause the image sequence
    holdTimer = setTimeout(showEndcard, holdDuration); // Start the hold timer
}

function handleHoldEnd() {
    isHeld = false;
    clearTimeout(holdTimer); // Cancel the hold if released early
    imageLoop = setInterval(loopImages, 500); // Resume image sequence
}

// Touch events for mobile
mainImage.addEventListener('touchstart', handleHoldStart);
mainImage.addEventListener('touchend', handleHoldEnd);

// Mouse events for desktop
mainImage.addEventListener('mousedown', handleHoldStart);
mainImage.addEventListener('mouseup', handleHoldEnd);

// Show the endcard
function showEndcard() {
    isEndcardVisible = true;
    document.getElementById('image-sequence').style.display = 'none'; // Hide the image sequence
    endcard.style.display = 'block'; // Show the endcard
}

// Automatically show the endcard after 20 seconds of viewing
setTimeout(() => {
    if (!isEndcardVisible) {
        showEndcard();
    }
}, autoEndcardTime);
