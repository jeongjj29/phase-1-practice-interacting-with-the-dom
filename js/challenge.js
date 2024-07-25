const counterH1 = document.querySelector("#counter");
const minusBtn = document.querySelector("#minus");
const plusBtn = document.querySelector("#plus");
const heartBtn = document.querySelector("#heart");
const pauseBtn = document.querySelector("#pause");
const likesUl = document.querySelector(".likes");
const commentForm = document.querySelector("#comment-form");
const commentListDiv = document.querySelector("#list");


let count = 0;
let counter;
let isPaused = false;
const likedNumbers = [];

function startCounter() {
    counter = setInterval(() => {
        if (!isPaused) {
            count++;
            updateCounterDisplay();
        }
    }, 1000)
}

function updateCounterDisplay() {
    counterH1.textContent = count;
}

function plusCounter() {
    if (!isPaused) {
        count++;
        updateCounterDisplay();
    }
}

function minusCounter() {
    if (!isPaused) {
        count--;
        updateCounterDisplay();
    }
}

function likeCounter() {
    if (!likedNumbers.includes(count)) {
        likedNumbers.push(count);
        const newLikeLi = document.createElement("li");
        newLikeLi.id = count;
        newLikeLi.innerHTML = `${count} has been liked <span>1</span> times.`
        likesUl.append(newLikeLi);
    } else {
        const likeLi = document.getElementById(count);
        const likeCountSpan = likeLi.querySelector("span");
        likeCountSpan.textContent = parseInt(likeCountSpan.textContent) + 1;
    }
        
}

function pauseCounter() {
    isPaused = true;
    clearInterval(counter);
    minusBtn.disabled = true;
    plusBtn.disabled = true;
    heartBtn.disabled = true;
    pauseBtn.textContent = "resume";
}

function resumeCounter() {
    isPaused = false;
    startCounter();
    minusBtn.disabled = false;
    plusBtn.disabled = false;
    heartBtn.disabled = false;
    pauseBtn.textContent = "pause";
}

minusBtn.addEventListener("click", minusCounter);
plusBtn.addEventListener("click", plusCounter);
heartBtn.addEventListener("click", likeCounter);
pauseBtn.addEventListener("click", () => {
    if (isPaused) {
        resumeCounter();
    } else {
        pauseCounter();
    }
});
commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    newComment = document.createElement("p");
    newComment.textContent = commentForm.comment.value;
    commentListDiv.append(newComment);
})


startCounter();