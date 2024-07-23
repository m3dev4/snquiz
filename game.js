const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        "question": "Quel est le plus grand fleuve du Sénégal?",
        "choices": [
            "Fleuve Gambie",
            "Fleuve Sénégal",
            "Fleuve Casamance",
            "Fleuve Saloum"
        ],
        "answer": 2
    },
    {
        "question": "Quelle est la capitale du Sénégal?",
        "choices": [
            "Saint-Louis",
            "Touba",
            "Dakar",
            "Ziguinchor"
        ],
        "answer": 3
    },
    {
        "question": "Qui est considéré comme le père de la nation sénégalaise?",
        "choices": [
            "Léopold Sédar Senghor",
            "Cheikh Anta Diop",
            "Blaise Diagne",
            "Amadou Bamba"
        ],
        "answer": 1
    },
    {
        "question": "Quelle est la langue nationale parlée par la majorité des Sénégalais?",
        "choices": [
            "Français",
            "Wolof",
            "Pulaar",
            "Serer"
        ],
        "answer": 2
    },
    {
        "question": "Quel est le nom de l'île historique connue pour sa maison des esclaves?",
        "choices": [
            "Île de Gorée",
            "Île de Ngor",
            "Île de Fadiouth",
            "Île de Carabane"
        ],
        "answer": 1
    },
    {
        "question": "Quel est le plat national du Sénégal?",
        "choices": [
            "Yassa",
            "Couscous",
            "Thieboudienne",
            "Mafé"
        ],
        "answer": 3
    },
    {
        "question": "Quelle est la plus grande ethnie du Sénégal?",
        "choices": [
            "Sérères",
            "Wolofs",
            "Peuls",
            "Diolas"
        ],
        "answer": 2
    },
    {
        "question": "Comment dit-on 'Bonjour' en Wolof?",
        "choices": [
            "Mbalen",
            "Salaam",
            "Naka nga def?",
            "Jërëjëf"
        ],
        "answer": 3
    },
    {
        "question": "Quel est le monument le plus emblématique de Dakar?",
        "choices": [
            "Monument de la Renaissance africaine",
            "Phare des Mamelles",
            "Cathédrale de Dakar",
            "Mosquée de la Divinité"
        ],
        "answer": 1
    },
    {
        "question": "Qui a écrit l'hymne national sénégalais?",
        "choices": [
            "Birago Diop",
            "Ousmane Sembène",
            "Léopold Sédar Senghor",
            "David Diop"
        ],
        "answer": 3
    },
    {
        "question": "Quelle est la superficie approximative du Sénégal?",
        "choices": [
            "96,722 km²",
            "196,722 km²",
            "296,722 km²",
            "396,722 km²"
        ],
        "answer": 2
    },
    {
        "question": "Quel est le nom du désert qui couvre une partie du nord du Sénégal?",
        "choices": [
            "Désert du Sahara",
            "Désert de Ferlo",
            "Désert du Namib",
            "Désert de Kalahari"
        ],
        "answer": 2
    },
    {
        "question": "Quel est l'arbre national du Sénégal?",
        "choices": [
            "Baobab",
            "Palmier",
            "Fromager",
            "Acacia"
        ],
        "answer": 1
    },
    {
        "question": "Qui est le premier président du Sénégal?",
        "choices": [
            "Léopold Sédar Senghor",
            "Abdou Diouf",
            "Macky Sall",
            "Abdoulaye Wade"
        ],
        "answer": 1
    },
    {
        "question": "Quelle est la devise monétaire du Sénégal?",
        "choices": [
            "Dollar",
            "Naira",
            "CFA franc",
            "Shilling"
        ],
        "answer": 3
    },
    {
        "question": "Quelle ville est surnommée 'la Venise de l'Afrique'?",
        "choices": [
            "Saint-Louis",
            "Dakar",
            "Ziguinchor",
            "Thiès"
        ],
        "answer": 1
    },
    {
        "question": "Quel est le nom du lac célèbre pour sa couleur rose au Sénégal?",
        "choices": [
            "Lac de Guiers",
            "Lac Rose",
            "Lac Retba",
            "Lac Tana"
        ],
        "answer": 2
    },
    {
        "question": "Quel est le nom du célèbre musicien sénégalais connu pour sa chanson '7 Seconds'?",
        "choices": [
            "Youssou N'Dour",
            "Baaba Maal",
            "Omar Pène",
            "Ismaël Lô"
        ],
        "answer": 1
    },
    {
        "question": "Quel animal est représenté sur le blason du Sénégal?",
        "choices": [
            "Lion",
            "Éléphant",
            "Antilope",
            "Hippopotame"
        ],
        "answer": 1
    },
    {
        "question": "Quel est le port principal du Sénégal?",
        "choices": [
            "Port de Dakar",
            "Port de Saint-Louis",
            "Port de Ziguinchor",
            "Port de Rufisque"
        ],
        "answer": 1
    }
];

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // Go to the end page
        return window.location.assign('./end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion.choices[number - 1];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 20;

startGame();
