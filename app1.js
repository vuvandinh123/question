import { dataQuestions } from "./data.js";
const root = document.getElementById("root");
const submit = document.getElementById("submit");
const section = document.querySelector("section");
let j = 0;
let buttonAs;
const randomArray = dataQuestions.sort(() => Math.random() - 0.5);
let randomAnswer = [];
let tam = [];
for (let i = 0; i < randomArray.length; i++) {
  randomAnswer.push(randomArray[i].answer.sort(() => Math.random() - 0.5));
}

let traloi = randomArray.map(function () {
  return false;
});
let dapan = randomArray.map(function () {
  return "";
});
console.log(dapan);
let dodai = randomArray.length;
let i = 0;

window.addEventListener("DOMContentLoaded", function () {
  answerButton();
  render();
});

function render() {
  if (i < 0) {
    i = 0;
  }
  if (i >= dodai) {
    i = dodai - 1;
  }
  root.innerHTML = inRender();
  document.getElementById('answerA').innerText = randomArray[i].answer[0].replay;
  document.getElementById('answerB').innerText = randomArray[i].answer[1].replay;
  document.getElementById('answerC').innerText = randomArray[i].answer[2].replay;
  document.getElementById('answerD').innerText = randomArray[i].answer[3].replay;
  document.getElementById('question').innerText = randomArray[i].question;

  next();
  back();
  const btns = document.querySelectorAll(".btn-select");
  btns.forEach(function (btn, index) {
    btn.addEventListener("click", function (e) {
      console.log(this);
      traloi[i] = this.getAttribute("data-index");
      dapan[i] = this.getAttribute("id");
      const correctAnswer = randomArray[i].answer.findIndex(
        (item) => item.key === true
      );
      if (traloi[i] == correctAnswer) {
        traloi[i] = true;
      } else {
        traloi[i] = false;
      }
      buttonAs[i].innerHTML = `${i + 1}<span>:${dapan[i]}</span>`;
      i++;
      render();
    });
  });
}

function next() {
  if (i >= dodai) {
    return;
  }
  const cuoi = document.getElementById("sau");
  cuoi.addEventListener("click", function () {
    i++;
    render();
  });
}

function back() {
  if (i < 0) {
    return;
  }
  const truoc = document.getElementById("truoc");
  truoc.addEventListener("click", function () {
    i--;
    render();
  });
}

function inRender() {
  const html = `<h3>Câu ${i + 1}</h3>
    <div>
        <p id="question" class="question"></p>
    </div>
    <div class="traloi">
        <button id="A" data-index="0" class="btn btn-select"><span class="span">A.</span> <span id="answerA"></span> </button>
        <button id="B" data-index="1" class="btn btn-select"><span class="span">B.</span> <span id="answerB"></span> </button>
        <button id="C" data-index="2" class="btn btn-select"><span class="span">C.</span> <span id="answerC"></span> </button>
        <button id="D" data-index="3" class="btn btn-select"><span class="span">D.</span> <span id="answerD"></span> </button>
        
    </div>
    <div class="cuoi">
        <button id="truoc">Back</button>
        <button id="sau">Next</button>
    </div>`;

  return html
}

submit.addEventListener("click", function () {
  traloi.map(function (o, index) {
    if (o === false) {
      tam.push({ vitri: index, choose: dapan[index] });
    }
  });
  console.log(tam);
  console.log(tam.length);
  let dung = 0;
  let sai = 0;
  for (let i = 0; i < traloi.length; i++) {
    traloi[i] ? dung++ : sai++;
  }
  const point = (10 - (10 / randomArray.length) * sai).toFixed(1);
  submit.classList.add("none");
  root.style.flexDirection = "column";
  let b = "";
  if (sai > 0) {
    b = `<button class="ktsai" id="check">Kiem tra loi sai</button>`;
  }

  root.innerHTML = `
    <p id="progress">Hoàn thành</p>
       <p id='point'>Điểm:${point}</p>
       <div>
       <h3 id="yes" class="Btn Btn-dung">Đúng:${dung}</h3>
       <h3 id="no" class="Btn">Sai:${sai}</h3>
       </div>
       ${b}
        `;
  document.querySelector(".ktsai").addEventListener("click", function () {
    kiemTraSai();


  });
  if (sai > 0) section.innerHTML = "";

  console.log(dapan);
});

function answerButton() {
  let s = "";
  for (let i = 0; i < traloi.length; i++) {
    s += `<button class="button">${i + 1}<span>:</span></button>`;
  }
  section.innerHTML = s;
  buttonAs = document.querySelectorAll(".button");
  buttonAs.forEach(function (btn, index) {
    btn.addEventListener("click", function (e) {
      i = index;
      render();
    });
  });
}

function kiemTraSai() {
  console.log(tam, "tam");

  if (j >= tam.length) {
    j = tam.length - 1;
    return;
  }
  if (j < 0) {
    j = 0;
    return;
  }
  let d = ["A", "B", "C", "D"];
  let vitridung = 0;
  for (let i = 0; i < 4; i++) {
    if (randomArray[tam[j].vitri].answer[i].key === true) {
      vitridung = i;
      break;
    }
  }
  root.innerHTML = `<h3>Câu ${tam[j].vitri + 1}</h3>
    <div>
        <p id="question" class="question"></p>
    </div>
    <div class="traloi">
        <button id="A" class="btn"><span class="span">A.</span> <span id="answerA"></span> </button>
        <button id="B" class="btn"><span class="span">B.</span> <span id="answerB"></span> </button>
        <button id="C" class="btn"><span class="span">C.</span> <span id="answerC"></span> </button>
        <button id="D" class="btn"><span class="span">D.</span> <span id="answerD"></span> </button>
      
    </div>
    <div class="cuoi">
        <button id="truoc">Back</button>
        <button id="sau">Next</button>
    </div>`;
  document.getElementById('answerA').innerText = randomArray[tam[j].vitri].answer[0].replay
  document.getElementById('answerB').innerText = randomArray[tam[j].vitri].answer[1].replay;
  document.getElementById('answerC').innerText = randomArray[tam[j].vitri].answer[2].replay;
  document.getElementById('answerD').innerText = randomArray[tam[j].vitri].answer[3].replay;
  document.getElementById('question').innerText = randomArray[tam[j].vitri].question;
  document.querySelectorAll(".btn").forEach(function (b) {
    if (b.textContent.slice(0, 1) === d[vitridung]) {
      b.style.color = "green";
    }
    if (b.textContent.slice(0, 1) === tam[j].choose) {
      b.style.color = "red";
    }
  });
  document.getElementById("sau").addEventListener("click", function () {
    j++;
    kiemTraSai();
  });
  document.getElementById("truoc").addEventListener("click", function () {
    j--;
    kiemTraSai();
  });
}
