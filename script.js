const quadrants = document.querySelectorAll('.quadrant');
const quadrantIds = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

const quadrantNumbers = {
    'a': [1, 10, 19, 28, 37, 46],
    'b': [2, 11, 20, 29, 38, 47],
    'c': [3, 12, 21, 30, 39, 48],
    'd': [4, 13, 22, 31, 40, 49],
    'e': [5, 14, 23, 32, 41, 50],
    'f': [6, 15, 24, 33, 42, 51],
    'g': [7, 16, 25, 34, 43, 52],
    'h': [8, 17, 26, 35, 44, 53],
    'i': [9, 18, 27, 36, 45, 54]
};

const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const showLinesButton = document.getElementById('show-lines-button');
const timerDisplay = document.getElementById('timer');
let timerInterval;
let seconds = 0;
let currentNumber = 1;
let lastQuadrant = null;
let isTimerRunning = false;
let allNumbersCircled = new Set();

function distributeNumbers() {
    quadrantIds.forEach(id => {
        const quadrant = document.getElementById(`quadrant-${id}`);
        const numbers = quadrantNumbers[id];
        
        const shuffledNumbers = shuffle(numbers);

        quadrant.innerHTML = ''; 

        shuffledNumbers.forEach(number => {
            const button = document.createElement('button');
            button.textContent = number;
            button.classList.add('number');

            const size = Math.floor(Math.random() * 40) + 30;
            button.style.width = `${size}px`;
            button.style.height = `${size}px`;
            button.style.fontSize = `${size / 2}px`;

            // Adiciona rotação aleatória em qualquer direção dos 360 graus
            const rotationDegree = Math.floor(Math.random() * 360);
            button.style.transform = `rotate(${rotationDegree}deg)`;

            button.addEventListener('click', function() {
                const numberValue = parseInt(this.textContent);

                if (numberValue === 1 && !isTimerRunning) {
                    startTimer();
                }

                if (numberValue === currentNumber) {
                    const currentQuadrantElem = this.parentNode;

                    if (lastQuadrant !== currentQuadrantElem || lastQuadrant === null) {
                        this.classList.add('clicked');
                        lastQuadrant = currentQuadrantElem;
                        currentNumber++;

                        allNumbersCircled.add(numberValue);

                        if (allNumbersCircled.size === 54) {
                            stopTimer();
                        }
                    }
                }
            });

            quadrant.appendChild(button);
        });
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }, 1000);
    }
}

function stopTimer() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
    }
}

function resetGame() {
    stopTimer();
    seconds = 0;
    timerDisplay.textContent = '00:00';
    currentNumber = 1;
    lastQuadrant = null;
    isTimerRunning = false;
    allNumbersCircled.clear();
    distributeNumbers();
}

function toggleLines() {
    quadrants.forEach(quadrant => {
        quadrant.classList.toggle('show-lines');
    });
}

startButton.addEventListener('click', () => {
    if (currentNumber === 1 && !isTimerRunning) {
        startTimer();
    }
});

resetButton.addEventListener('click', resetGame);

showLinesButton.addEventListener('click', toggleLines);

distributeNumbers();
