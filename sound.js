// Set the initial volume level
var volumeLevel = 0.4;

// Get the audio elements
var soundEffect1 = document.getElementById('soundEffect1');
var soundEffect2 = document.getElementById('soundEffect2');

// Set the volume of each sound effect
soundEffect1.volume = volumeLevel;
soundEffect2.volume = volumeLevel;

// Play the sound effects
soundEffect1.play();
soundEffect2.play();
