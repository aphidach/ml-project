let sound;
let isPlaying = false;

window.addEventListener("DOMContentLoaded", () => {
  sound = new Audio("3minutePerLoop.MP3");
  sound.loop = true;

  const soundButton = document.getElementById("soundButton");

  soundButton.addEventListener("click", () => {
    if (!isPlaying) {
      sound.play();
      soundButton.textContent = "Turn Sound Off";
    } else {
      sound.pause();
      soundButton.textContent = "Turn Sound On";
    }
    isPlaying = !isPlaying; 
  });
});
