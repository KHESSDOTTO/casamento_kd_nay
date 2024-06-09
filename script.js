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

function getName() {
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
    if (index >= elementsArr.length) return; // Interrompe loop após último elemento

    const typewriter = new Typewriter(elementsArr[index], {
      loop: false,
      delay: 50,
      cursor: "",
    });

    typewriter
      .typeString(textArr[index])
      .pauseFor(300)
      .callFunction(() => {
        chainTypewriters(index + 1); // Inicia efeito do próximo elemento
      })
      .start();
  }

  // Inicia os typewriters
  chainTypewriters(0);
}

function createBackground() {
  const bgImg = document.createElement("img");
  const pages = document.getElementsByClassName("page");

  bgImg.src = "images/background.jpg";
  bgImg.img = "bg";
  bgImg.className = "full-page-img";

  for (let i = 0; i < pages.length; i++) {
    pages[i].insertAdjacentElement("afterbegin", bgImg);
  }
}

function start() {
  document.getElementById("playButton").addEventListener("click", function () {
    const audio = document.getElementById("audioPlayer");
    const pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.remove("hidden");
      pages[i].classList.add("fadeIn");
    }
    document.getElementById("entrySection").classList.add("hidden");
    audio.play();
    window.scrollTo({ top: 0 });
    setTimeout(() => {
      startTypewriter(getName());
    }, 1000);
  });
}

function createIntersectionObservers(classesToObserve) {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  classesToObserve.forEach((classToObserve) => {
    const elements = document.querySelectorAll("." + classToObserve);
    console.log("elements");
    console.log(elements);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Is Intersecting now!");
          console.log("Entry");
          console.log(entry);
          entry.target.classList.add(
            classToObserve.slice(3, classToObserve.length)
          );
          setTimeout(() => {
            entry.target.style.opacity = 1;
          }, 100);
        } else {
          console.log("Is NOT intersecting now!");
          console.log("Entry");
          console.log(entry);
          entry.target.classList.remove(
            classToObserve.slice(3, classToObserve.length)
          );
          entry.target.style.opacity = 0;
        }
      });
    }, observerOptions);
    elements.forEach((element) => {
      observer.observe(element);
    });
  });
}

const classesToObserve = [
  "to-slideInFadeIn",
  "to-fadeIn",
  "to-slowFadeIn",
  "to-fastFadeIn",
  "to-reveal-image",
  "to-reveal-image-slow",
  "to-bigSlideInFadeIn",
  "to-slideUpFadeIn",
  "to-revSlideInFadeIn",
]; // Classes com animações dinâmicas que só devem começar quando são visíveis no viewport.

handleDates();
setInterval(handleDates, 1000); // Atualizar contagem regressiva a cada segundo.
start();
createIntersectionObservers(classesToObserve);
