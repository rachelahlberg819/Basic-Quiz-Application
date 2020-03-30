const startButton = document.getElementById('start-btn'); 
const nextButton = document.getElementById('next-btn'); 
const questionContainerElement =document.getElementById('question-container'); 
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const number = document.getElementById('number')
const numberContainer = document.getElementById(counterContainer)
var counter = 0


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame () {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random()- .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    counterContainer.classList.remove('hide')

}

function setNextQuestion(){
    resetState()
    showQuestion (shuffledQuestions[currentQuestionIndex])
    increase() 
    number.innerText = counter
}

function increase(){
    number.value = counter; 
    counter ++; 
}


function showQuestion (question){
    questionElement.innerText = question.question
    question.answers.forEach (answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState () {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer (e){
    const selectedButton = e.target 
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        counter = 0
        number.innerText = counter
        counterContainer.classList.add('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Where is Yosemite National Park Located?',
        answers: [
            {text: 'California', correct: true},
            {text: 'Kansas', correct: false},
            {text: 'Utah', correct: false},
            {text: 'Nevada', correct: false}
        ]
    }
,
    {
        question: 'What state is Bend located in?',
        answers: [
            {text: 'California', correct: false},
            {text: 'Oregon', correct: true},
            {text: 'Washington', correct: false},
            {text: 'Texas', correct: false},
        ]
    },
    {
        question: 'What is the capital of Texas?',
        answers: [
            {text: 'Houston', correct: false},
            {text: 'San Antonio', correct: false},
            {text: 'Austin', correct: true},
            {text: 'Dallas', correct: false},
        ]
    }

]