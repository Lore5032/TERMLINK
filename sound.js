// Set the initial volume level
var volumeLevel = 0.35;

// Get the audio elements
var soundEffect1 = document.getElementById('soundEffect1');
var soundEffect2 = document.getElementById('soundEffect2');

// Set the volume of each sound effect
soundEffect1.volume = volumeLevel;
soundEffect2.volume = volumeLevel;

// Play the sound effects with a delay
soundEffect1.play();
setTimeout(function() {
  soundEffect2.play();
}, 150); // Delay of 0.5 seconds (500 milliseconds)
