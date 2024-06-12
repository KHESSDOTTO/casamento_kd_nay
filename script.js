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

function getConv(arrConvidados) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const conv = arrConvidados.filter((cE) => {
    return cE.id == id;
  })[0];

  return conv;
}

function insertNameFirst(arrConvidados) {
  const fixedText = " te convidamos para a celebração do nosso casamento.";
  const conv = getConv(arrConvidados);
  return (conv ? conv.name + ", carinhosamente" : "Carinhosamente") + fixedText;
}

function insertVarContent(conv) {
  if (conv) {
    const addNameArr = document.querySelectorAll(".addName");
    const addTableArr = document.querySelectorAll(".addTable");
    addNameArr.forEach((cE) => {
      cE.innerHTML = conv.name;
    });
    addTableArr.forEach((cE) => {
      cE.innerHTML = conv.table;
    });
  } else {
    const eraseNoNameArr = document.querySelectorAll(".erase-noname");
    eraseNoNameArr.forEach((cE) => {
      cE.innerHTML = "";
    });
  }
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
      startTypewriter(insertNameFirst(arrConvidados));
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

function startPopover() {
  document.addEventListener("DOMContentLoaded", () => {
    const popoverBtn = document.getElementById("popover-btn");
    const popover = document.getElementById("popover");

    popoverBtn.addEventListener("mouseover", () => {
      popover.style.display = "block";
    });

    popoverBtn.addEventListener("mouseout", () => {
      popover.style.display = "none";
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

const arrConvidados = [
  { id: 1, name: "Amanda", table: "Tulipa" },
  { id: 2, name: "Yasmin", table: "Tulipa" },
  { id: 3, name: "Yorrani", table: "Tulipa" },
  { id: 4, name: "Elza", table: "Tulipa" },
  { id: 5, name: "Bianca e Ritch", table: "Tulipa" },
  { id: 6, name: "Valdelucia", table: "Tulipa" },
  { id: 7, name: "Aline", table: "Lírio" },
  { id: 8, name: "Elza", table: "Lírio" },
  { id: 9, name: "Katherine, Anthony e família", table: "Lírio" },
  { id: 10, name: "Katia", table: "Lírio" },
  { id: 11, name: "Dawis", table: "Petúnia" },
  { id: 12, name: "Gessy", table: "Petúnia" },
  { id: 13, name: "Miguel", table: "Petúnia" },
  { id: 14, name: "Natalia", table: "Petúnia" },
  { id: 15, name: "Kimborly e família", table: "Petúnia" },
  { id: 16, name: "Daisy", table: "Girassol" },
  { id: 17, name: "Guido e Marta", table: "Girassol" },
  { id: 18, name: "Keynes", table: "Girassol" },
  { id: 19, name: "Patrícia", table: "Girassol" },
  { id: 20, name: "Klauss", table: "Girassol" },
  { id: 21, name: "Everaldo", table: "Dália" },
  { id: 22, name: "Julio e Vera", table: "Dália" },
  { id: 23, name: "William, Kelly e Clara", table: "Dália" },
  { id: 24, name: "Ary e Márcia", table: "Orquídea" },
  { id: 25, name: "Karmem", table: "Orquídea" },
  { id: 26, name: "Ellen", table: "Orquídea" },
  { id: 27, name: "Lea", table: "Orquídea" },
  { id: 28, name: "Yoni", table: "Orquídea" },
  { id: 29, name: "Edgar e Salete", table: "Orquídea" },
  { id: 30, name: "Fabio e Viviane", table: "Rosa" },
  { id: 31, name: "Gabriel", table: "Rosa" },
  { id: 32, name: "João Guilherme e Balu", table: "Rosa" },
  { id: 33, name: "Felipe", table: "Rosa" },
  { id: 34, name: "Lucila", table: "Rosa" },
  { id: 35, name: "Gerson", table: "Rosa" },
  { id: 36, name: "Lucia, Caroline e Vitor", table: "Rosa" },
]; // Lista com todos os convidados, relação id, nome e table.

handleDates();
setInterval(handleDates, 1000); // Atualizar contagem regressiva a cada segundo.
insertVarContent(getConv(arrConvidados));
start();
// startPopover();
createIntersectionObservers(classesToObserve);
