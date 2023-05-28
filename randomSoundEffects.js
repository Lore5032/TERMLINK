// Random Sound Effects

var audioFiles = [
  "key1.wav",
  "key2.wav",
  "key3.wav",
  "key4.wav",
  "key5.wav",
  "key6.wav",
  "key7.wav",
];

var specialAudioFile = "enter.wav";

function playRandomSoundEffect() {
  var randomIndex = Math.floor(Math.random() * audioFiles.length);
  var audio = new Audio(audioFiles[randomIndex]);
  audio.play();
}

function playSpecialSoundEffect() {
  var audio = new Audio(specialAudioFile);
  audio.play();
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === "Backspace") {
      playSpecialSoundEffect();
    } else {
      playRandomSoundEffect();
    }
  });
});
