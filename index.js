

let score = 0;
let timeLeft = 10;
let interval;
let highScore = 0;
let isGameOver = true;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    return { question: `${num1} + ${num2}`, answer: num1 + num2 };
}

function updateDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('time').textContent = timeLeft;
}

function startGame() {
    if (isGameOver) {
        score = 0;
        timeLeft = 10;
        updateDisplay();
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('restart-button').style.display = 'none';
        document.getElementById('answer').value = '';
        document.getElementById('answer').focus();

        const equationElement = document.getElementById('equation');

        function countdown() {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(interval);
                isGameOver = true;
                document.getElementById('start-button').style.display = 'block';
                document.getElementById('restart-button').style.display = 'block';
                equationElement.textContent = 'Game Over';
                if (score > highScore) {
                    highScore = score;
                }
            }
        }

        interval = setInterval(countdown, 1000);

        const question = generateQuestion();
        equationElement.textContent = question.question;

        const answerInput = document.getElementById('answer');
        if (answerInput) {
            answerInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    const userAnswer = parseInt(answerInput.value, 10);
                    if (userAnswer === question.answer) {
                        score++;
                        timeLeft++;
                        updateDisplay();
                        const newQuestion = generateQuestion();
                        equationElement.textContent = newQuestion.question;
                        answerInput.value = '';
                    }
                }
            });
        }

        isGameOver = false;
    }
}

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('restart-button').addEventListener('click', startGame);
