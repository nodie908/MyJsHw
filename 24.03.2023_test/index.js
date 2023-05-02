const questions = [
    {
        question: "Какой тип кузова у машины, которая имеет закрытую кабину и открытую грузовую площадку с невысокими сторонами и задней дверью?",
        answers: [
            { text: "Седан", correct: false },
            { text: "Пикап", correct: true },
            { text: "Хэтчбек", correct: false },
            { text: "Универсал", correct: false }
        ]
    },
    {
        question: "Что означает аббревиатура SUV?",
        answers: [
            { text: "Sport Utility Vehicle", correct: true },
            { text: "Super Ultimate Vehicle", correct: false },
            { text: "Safe Utility Vehicle", correct: false },
            { text: "Small Urban Vehicle", correct: false }
        ]
    },
    {
        question: "Какой тип двигателя чаще всего используется в современных легковых автомобилях?",
        answers: [
            { text: "Дизельный", correct: false },
            { text: "Бензиновый", correct: true },
            { text: "Электрический", correct: false },
            { text: "Гибридный", correct: false }
        ]
    },
    {
        question: "Как называется функция автоматического управления скоростью движения автомобиля?",
        answers: [
            { text: "ABS", correct: false },
            { text: "ESP", correct: false },
            { text: "ASR", correct: false },
            { text: "Cruise Control", correct: true }
        ]
    },
    {
        question: "Какую модель BMW можно отнести к классу спортивных купе-кабриолетов?",
        answers: [
            { text: "BMW 7 Series", correct: false },
            { text: "BMW X5", correct: false },
            { text: "BMW 2 Series", correct: true },
            { text: "BMW i3", correct: false }
        ]
    }
];

const resultMessages = [
    { minScore: 0, message: "Можно было и поискать в гугле." },
    { minScore: 1, message: "Вы явно не интересуетесь автомобилями." },
    { minScore: 2, message: "Ничего страшного, вы заложили основу для изучения автомобильного мира." },
    { minScore: 3, message: "Вы неплохо знаете автомобили, но есть еще куда расти." },
    { minScore: 4, message: "Хороший результат, автолюбитель." },
    { minScore: 5, message: "Вы явно интересуетесь автомобилями. " },
];
let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById("startButton");
const questionContainer = document.getElementById("questionContainer");
const resultContainer = document.getElementById("resultContainer");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startButton.classList.add("hide");
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.innerHTML = `
    <h2>${currentQuestion.question}</h2>
    <div class="answers">
      ${currentQuestion.answers.map(answer => `
        <label>
          <input type="radio" name="answer" value="${answer.text}" ${answer.checked ? "checked" : ""}>
          ${answer.text}
        </label>
      `).join("")}
    </div>
    <button id="nextButton">Дальше</button>
  `;
    questionContainer.appendChild(questionElement);

    const nextButton = questionElement.querySelector("#nextButton");
    nextButton.addEventListener("click", () => {
        const selectedAnswer = questionElement.querySelector("input[type='radio']:checked");
        if (selectedAnswer) {
            const selectedAnswerText = selectedAnswer.value;
            const correctAnswer = currentQuestion.answers.find(answer => answer.correct).text;
            if (selectedAnswerText === correctAnswer) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex === questions.length) {
                showResult();
            } else {
                questionContainer.removeChild(questionElement);
                showQuestion();
            }
        }
    });
}

function showResult() {
    const scorePercentage = Math.round(score / questions.length * 100);
    resultContainer.innerHTML = `
    <h2>Результат</h2>
    <p>Вы ответили правильно на ${score} из ${questions.length} вопросов (${scorePercentage}%).</p>
    <p>${resultMessages[score].message}</p>
  `;
}
