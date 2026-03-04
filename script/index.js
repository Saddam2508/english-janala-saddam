const loadLesson = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

const displayLesson = (lessons) => {
 const levelContainer = document.getElementById('level-container')
 console.log(levelContainer);
 for (let lesson of lessons){
  console.log(lesson);
  const btnDiv = document.createElement("div")
  btnDiv.innerHTML = `
  
  <button class="btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button
              >
  `
  levelContainer.append(btnDiv)
 }
};
loadLesson();
