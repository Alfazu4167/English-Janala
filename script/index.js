const createElement = (arr) => {
    const htmlElement = arr.map(el => `<span class="btn">${el}</span>`)
    return htmlElement.join(" ")

}
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data)

        )
}

const removeActive = () => {
    const lessonBtns = document.querySelectorAll(".lesson-btn")
    lessonBtns.forEach(btn => btn.classList.remove("active")
    )

}

const loadLevelWord = (id) => {
    manageSpinner(true)

    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            removeActive()
            const selectedBtn = document.getElementById(`lesson-btn-${id}`)
            selectedBtn.classList.add("active")
            displayLevelWord(json.data)
        }
        )
    
}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    console.log(url);
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetails(details.data);



}



const displayWordDetails = (wordDetails) => {
    console.log(wordDetails);

    const detailsContainer = document.getElementById("details-container")
    detailsContainer.innerHTML = `
   <div>
            <h2 class="bangla-font text-2xl font-bold">${wordDetails.word} (<i class="fa-solid fa-microphone-lines"></i> : ${wordDetails.pronunciation})</h2>
        </div>
        <div>
            <h2 class="font-bold">Meaning</h2>
            <p>${wordDetails.meaning}</p>
        </div>
        <div>
            <h2 class="font-bold">Example</h2>
            <p>${wordDetails.sentence}</p>
        </div>
        <div>
            <h2 class="font-bold mb-4">Synonyms</h2>
            <div>${createElement(wordDetails.synonyms)}</div>
        </div>
        
   `
    document.getElementById("word_modal").showModal();

}

const displayLevelWord = (words) => {

    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = ""

    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full py-10 space-y-5">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="bangla-font text-[#79716b]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h3 class="bangla-font text-4xl font-bold">অন্য একটি Lesson এ যান</h3>
        </div>
        `
        manageSpinner(false);
        return
    }
    words.forEach(word => {


        const wordDiv = document.createElement("div")
        wordDiv.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm space-y-4 text-center h-full p-6">
            <h2 class="text-3xl font-bold">${word.word ? word.word : "Word not fund"}</h2>
            <p>Meaning / Pronunciation</p>
            <h2 class="bangla-font text-3xl font-semibold text-[#464649]">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation not fund"}</h2>
        <div class="flex justify-between items-center">
            <button onclick="loadWordDetails(${word.id})" class="btn bg-[#e8f4ff] hover:btn-primary"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#e8f4ff]"><i class="fa-solid fa-volume-high"></i></i></button>
        </div>
        </div>
    
    `
        wordContainer.append(wordDiv)
    })

    manageSpinner(false)

}

const displayLesson = (lessons) => {
    const lessonContainer = document.getElementById("level-container")
    lessonContainer.innerHTML = "";
    lessons.forEach(lesson => {
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
       <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}</button>
       `
        lessonContainer.append(btnDiv)
    });

}
loadLessons()