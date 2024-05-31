function handleDates() {
  const countDownDate = new Date(Date.UTC(2024, 8, 14, 21, 30, 0, 0)).getTime();
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML = "We are married!!";
  }
}

function getNameContent() {
  const idArr = { 1: "Khess", 2: "Nayara" };
  const urlParams = new URLSearchParams(window.location.search);
  const fixedText = " te convidamos para a celebração do nosso casamento.";
  return (
    (idArr[urlParams.get("id")]
      ? idArr[urlParams.get("id")] + ", carinhosamente"
      : "Carinhosamente") + fixedText
  );
}

function startTypewriter(nameContent) {
  const textArr = [nameContent];
  const elements = document.getElementsByClassName("typewriter-effect");
  const elementsArr = Array.from(elements);

  function chainTypewriters(index) {
    if (index >= elementsArr.length) return; // Stop if no more elements

    const typewriter = new Typewriter(elementsArr[index], {
      loop: false,
      delay: 50,
      cursor: "",
    });

    typewriter
      .typeString(textArr[index])
      .pauseFor(300)
      .callFunction(() => {
        chainTypewriters(index + 1); // Start the next typewriter effect
      })
      .start();
  }

  // Start the first typewriter effect
  chainTypewriters(0);
}

function setup() {
  document.getElementById("playButton").addEventListener("click", function () {
    const audio = document.getElementById("audioPlayer");
    const pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.remove("hidden");
      pages[i].classList.add("fadeIn");
    }
    document.getElementById("entrySection").classList.add("hidden");
    audio.play();
    setTimeout(() => {
      startTypewriter(getNameContent());
    }, 1000);
  });
}

handleDates();
setInterval(handleDates, 1000); // Atualizar contagem regressiva a cada segundo.
setup();
