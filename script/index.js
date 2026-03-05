const loadLesson = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

const removeActive = ()=>{
  const lessonBtn = document.querySelectorAll('.lesson-btn')
  lessonBtn.forEach((btn)=>btn.classList.remove('active'))
}

const loadLevelWord=(id)=>{
  const url = `https://openapi.programming-hero.com/api/level/${id}`
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive()
      const clickBtn = document.getElementById(`lesson-btn-${id}`)
      clickBtn.classList.add('active')
      displayLevelWord(data.data)});
}


const displayLevelWord = (words)=>{
  const wordContainer = document.getElementById("word-container")

  wordContainer.innerHTML = "";

  if(words.length === 0){
     wordContainer.innerHTML = `
    
     <div class="text-center bg-sky-100 col-span-full rouned py-10 space-y-6">
      <img class = "mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl font-medium text-gray-400">আপনি এখনো কোন Lesson Select করেন নি</p>
        <h2 class="font-bold">একটি Lesson Select করুন।</h2>
      </div>
     `  }

  words.forEach((word)=>{
   
    const card = document.createElement("div")
    card.innerHTML = `<div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium text-bangla">${word.meaning? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation: "pronunciation পাওয়া যায়নি"}</div>
        <div class="flex justify-between items-center">
          <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>`;
    wordContainer.append(card)
  })
}

const displayLesson = (lessons) => {
 const levelContainer = document.getElementById('level-container')
levelContainer.innerHTML = ""
 for (let lesson of lessons){
  const btnDiv = document.createElement("div")
  btnDiv.innerHTML = `
  
  <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord (${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
                ><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button
              >
  `
  levelContainer.append(btnDiv)
 }
};

loadLesson();
