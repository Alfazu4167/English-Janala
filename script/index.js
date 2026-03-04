const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data)
        )
}

const loadLevelWord = (id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=> res.json())
    .then(json=> displayLevelWord(json.data)
    )
}

const displayLevelWord =(words)=>{
const wordContainer=document.getElementById("word-container")
wordContainer.innerHTML=""
words.forEach(word=>{
    console.log(word);
    
    const wordDiv = document.createElement("div")
    wordDiv.innerHTML =`
    <div class="bg-white rounded-xl shadow-sm space-y-4 text-center h-full p-6">
            <h2 class="text-3xl font-bold">${word.word}</h2>
            <p>Meaning / Pronunciation</p>
            <h2 class="bangla-font text-3xl font-semibold text-[#464649]">${word.meaning} / ${word.pronunciation}</h2>
        <div class="flex justify-between items-center">
            <button class="btn bg-[#e8f4ff] hover:btn-primary"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#e8f4ff]"><i class="fa-solid fa-volume-high"></i></i></button>
        </div>
        </div>
    
    `
    wordContainer.append(wordDiv)
})



}

const displayLesson = (lessons) => {
    const lessonContainer = document.getElementById("level-container")
    lessonContainer.innerHTML = "";
    lessons.forEach(lesson => {
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
       <button" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}</button>
       `
        lessonContainer.append(btnDiv)
    });

}
loadLessons()