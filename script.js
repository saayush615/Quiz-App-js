const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text: "Shark" , correct: false},
            {text: "Bule whale" , correct: true},
            {text: "Elephant" , correct: false},
            {text: "Giraffe" , correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican city" , correct: true},
            {text: "Bhutan" , correct: false},
            {text: "Nepal" , correct: false},
            {text: "srilanka" , correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "kalahari" , correct: false},
            {text: "Gobi" , correct: false},
            {text: "Sahara" , correct: false},
            {text: "Antarctica" , correct: true},
        ]
    },
    {
        question: "Which is smallest continent in the world?",
        answers: [
            {text: "Asia" , correct: false},
            {text: "Australia" , correct: true},
            {text: "Arctic" , correct: false},
            {text: "Africa" , correct: false},
        ]
    }
];

const ques = document.getElementById("question");
const ansbtn = document.getElementsByClassName("answer");
const nextbtn = document.getElementsByClassName("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    // Reset the global variables
    currentQuestionIndex = 0;
    score = 0;
    nextbtn[0].children[0].innerText = "Next";
    showQuestion();
}

function showQuestion(){
    resetState(); // This function will clear the previous question and answer buttons.
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    ques.innerText = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach((e) => { 
        const button = document.createElement("button");
        button.innerText = e.text;
        button.classList.add("btn");
        ansbtn[0].appendChild(button);
        if(e.correct){
            button.dataset.correct = e.correct;
        }
        button.addEventListener("click", selectAnswer);
     })
}

function resetState(){
    nextbtn[0].style.display = "none";
    while(ansbtn[0].firstChild){
        ansbtn[0].removeChild(ansbtn[0].firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(ansbtn[0].children).forEach((button) => { 
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
     })
    nextbtn[0].style.display = "flex";
}

function showScore(){
    resetState();
    ques.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextbtn[0].children[0].innerHTML = "Play Again"
    nextbtn[0].style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextbtn[0].addEventListener("click", () => { 
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();