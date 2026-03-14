// spin section

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

// speak

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// lesson data fetch

const loadLesson = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

// active class remove

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};

// fetch modal detail

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

// synonyms array

const synonymsArray = (arr) => {
  const synonymsBtn = arr.map(
    (syn) => `<button class = "btn"> ${syn} </button>`,
  );
  return synonymsBtn.join(" "); //join টা মুলত string করার জন্য ব্যবহার করা হয়েছে
};

// display modal word details

const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  <div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
        </div>
          <div class="">
            <h2 class="font-bold text-bangla">সমার্থক শব্দ গুলো</h2>
           ${synonymsArray(word.synonyms)}
          </div>
  
  `;
  document.getElementById("word_modal").showModal();
};

// receive id from lesson and create dynamic url

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

// receive data from loadLevelWord

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");

  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
    
     <div class="text-center bg-sky-100 col-span-full rouned py-10 space-y-6">
      <img class = "mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl font-medium text-gray-400">আপনি এখনো কোন Lesson Select করেন নি</p>
        <h2 class="font-bold">একটি Lesson Select করুন।</h2>
      </div>
     `;
    manageSpinner(false);
    return;
  }

  // create card

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `<div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium text-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button onclick = "pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>`;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

// display lesson

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
  
  <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord (${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
                ><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button
              >
  `;
    levelContainer.append(btnDiv);
  }
};

loadLesson();

// search

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();

  const url = "https://openapi.programming-hero.com/api/words/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
      displayLevelWord(filterWords);
    });
});

const fagText = [
  "How can I start learning English on this website?",
  "Is this website free to use?",
  "Do I need to create an account?",
  "How can I build my English vocabulary?",
  "Do you offer certificates for completed courses?",
];

const fag = () => {
  const fagContainer = document.getElementById("fag-container");
  fagText.map((text, index) => {
    fagContainer.innerHTML += `
    <div
          class="card bg-gray-300 p-5 rounded-lg"
        >
          <div class="card flex-row justify-between items-center">
          <span>${index + 1}. ${text}</span>
          <button onclick = "handleFag(${index}, this)" class="text-xl font-bold cursor-pointer">+</button>
          </div>
          <p id ="faq-${index}" class = "pl-5 hidden"></p>
        </div>
    `;
  });
};
fag();

const faqAns = [
  "You can start learning English by creating an account and exploring the available lessons. Begin with basic vocabulary and grammar lessons, then practice through quizzes, exercises, and interactive activities.",
  "Yes, this website offers many free learning resources. You can access lessons, vocabulary practice, and quizzes without any cost.",
  "Creating an account is recommended because it allows you to track your progress, save your lessons, and access additional learning features.",
  "You can build your vocabulary by practicing daily lessons, learning new words, reading examples, and using the words in sentences and quizzes.",
  "Yes, after successfully completing certain courses or levels, you may receive a certificate to recognize your learning progress.",
];

const handleFag = (index, btn) => {
  const ansContainer = document.getElementById(`faq-${index}`);

  if (ansContainer.classList.contains("hidden")) {
    ansContainer.classList.remove("hidden");
    ansContainer.innerText = faqAns[index];
    btn.innerText = "-";
  } else {
    ansContainer.classList.add("hidden");
    btn.innerText = "+";
  }
};
