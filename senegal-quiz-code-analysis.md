# Rapport d'Analyse de Code Détaillé avec Code Source - Quiz sur le Sénégal

## Table des matières

1. Introduction
2. Structure du projet
3. Analyse des fichiers avec code source
   3.1 index.html
   3.2 game.html
   3.3 game.js
   3.4 end.html
   3.5 end.js
   3.6 highscores.html
   3.7 highscores.js
4. Analyse approfondie des méthodes JavaScript
5. Conclusions et recommandations

## 1. Introduction

Ce rapport présente une analyse détaillée du code source d'une application web de quiz sur le Sénégal. L'application est conçue pour tester les connaissances des utilisateurs sur divers aspects de la culture, de l'histoire et de la géographie sénégalaises.

## 2. Structure du projet

Le projet est composé de plusieurs fichiers HTML et JavaScript, structurés comme suit :

- `index.html` : Page d'accueil
- `game.html` : Page du jeu de quiz
- `game.js` : Logique du jeu
- `end.html` : Page de fin de jeu
- `end.js` : Logique de la page de fin
- `highscores.html` : Page des meilleurs scores
- `highscores.js` : Logique de la page des meilleurs scores

## 3. Analyse des fichiers avec code source

### 3.1 index.html

#### Code source

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Sn_Quiz</title>
    <link rel="stylesheet" href="./app.css" />
    <link rel="icon" type="image/jpg" href="./assets/logo.jpg">
    <meta name="google-site-verification" content="iNzSj2wvdEOVu1PtrK5FfEiu_teOG2LQn5i3kg-xozQ" />
  </head>
  <body>
    <div class="container">
      <div id="home" class="flex-center flex-column">
        <h1>Sn_Quiz</h1>
        <a class="btn" href="./game.html">Play</a>
        <a class="btn" href="./highscores.html">High Scores</a>
      </div>
    </div>
  </body>
</html>
```

#### Analyse
- Structure HTML5 standard avec meta tags pour l'encodage et la compatibilité
- Liens vers une feuille de style CSS externe (app.css)
- Structure simple avec un conteneur principal et deux boutons de navigation
- Design minimaliste et fonctionnel

### 3.2 game.html

#### Code source

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Sn_Quiz - Play</title>
    <link rel="stylesheet" href="./app.css" />
    <link rel="stylesheet" href="./game.css" />
    <link rel="icon" type="image/jpg" href="./assets/play.jpg">
  </head>
  <body>
    <div class="container">
      <div id="loader"></div>
      <div id="game" class="justify-center flex-column hidden">
        <div id="hud">
          <div id="hud-item">
            <p id="progressText" class="hud-prefix">
              Question
            </p>
            <div id="progressBar">
              <div id="progressBarFull"></div>
            </div>
          </div>
          <div id="hud-item">
            <p class="hud-prefix">
              Score
            </p>
            <h1 class="hud-main-text" id="score">
              0
            </h1>
          </div>
        </div>
        <h2 id="question"></h2>
        <div class="choice-container">
          <p class="choice-prefix">A</p>
          <p class="choice-text" data-number="1"></p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">B</p>
          <p class="choice-text" data-number="2"></p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">C</p>
          <p class="choice-text" data-number="3"></p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">D</p>
          <p class="choice-text" data-number="4"></p>
        </div>
      </div>
    </div>
    <script src="./game.js"></script>
  </body>
</html>
```

#### Analyse
- Structure similaire à index.html, avec des éléments spécifiques au jeu
- Inclusion d'un loader pour indiquer le chargement
- HUD (Head-Up Display) pour afficher la progression et le score
- Quatre conteneurs pour les choix de réponses
- Lien vers le script game.js pour la logique du jeu

### 3.3 game.js

#### Code source (extrait)

```javascript
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
    // ... autres questions ...
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
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
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

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

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

startGame();
```

#### Analyse
- Utilisation de variables globales pour gérer l'état du jeu
- Array de questions avec leurs choix et réponses
- Fonctions principales : 
  - `startGame()` pour initialiser le jeu
  - `getNewQuestion()` pour afficher une nouvelle question
  - Event listeners pour gérer les clics sur les réponses
- Utilisation de localStorage pour sauvegarder le score
- Gestion de la progression et du score en temps réel

### 3.4 end.html

#### Code source

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Congratulations!</title>
    <link rel="stylesheet" href="./app.css" />
    <link rel="icon" type="image/jpg" href="./assets/Congo.jpg">
  </head>
  <body>
    <div class="container">
      <div id="end" class="flex-center flex-column">
        <h1 id="finalScore"></h1>
        <form>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
          <button
            type="submit"
            class="btn"
            id="saveScoreBtn"
            onclick="saveHighScore(event)"
            disabled
          >
            Save
          </button>
        </form>
        <a class="btn" href="./game.html">Play Again</a>
        <a class="btn" href="./">Go Home</a>
      </div>
    </div>
    <script src="./end.js"></script>
  </body>
</html>
```

#### Analyse
- Page de fin de jeu avec affichage du score final
- Formulaire pour sauvegarder le score avec un nom d'utilisateur
- Boutons pour rejouer ou retourner à l'accueil
- Lien vers le script end.js pour la logique de sauvegarde du score

### 3.5 end.js

#### Code source

```javascript
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};
```

#### Analyse
- Récupération du score depuis localStorage
- Gestion de l'activation/désactivation du bouton de sauvegarde
- Fonction `saveHighScore()` pour sauvegarder le score :
  - Ajout du nouveau score
  - Tri des scores
  - Limitation à 5 meilleurs scores
  - Sauvegarde dans localStorage

### 3.6 highscores.html

#### Code source

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>High Scores</title>
    <link rel="stylesheet" href="./app.css" />
    <link rel="stylesheet" href="./highscores.css" />
    <link rel="icon" href="icon_path" type="image/x-icon">
  </head>
  <body>
    <div class="container">
      <div id="highScores" class="flex-center flex-column">
        <h1 id="finalScore">High Scores</h1>
        <ul id="highScoresList"></ul>
        <a class="btn" href="/">Go Home</a>
      </div>
    </div>
    <script src="./highscores.js"></script>
  </body>
</html>
```

#### Analyse
- Page simple pour afficher les meilleurs scores
- Liste non ordonnée pour les scores
- Lien vers highscores.js pour la logique d'affichage des scores

### 3.7 highscores.js

#### Code source

```javascript
const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
```

#### Analyse
- Récupération des scores depuis localStorage
- Utilisation de la méthode `map()` pour générer les éléments HTML de la liste
- Insertion des scores dans le DOM

## 4. Analyse approfondie des méthodes JavaScript

[Cette section reste inchangée par rapport à la version précédente]

## 5. Conclusions et recommandations

### Points forts
1. Structure de projet claire et bien organisée
2. Interface utilisateur intuitive et réactive
3. Bonne utilisation du localStorage pour la persistance des données
4. Code JavaScript bien structuré et fonctionnel
5. Utilisation efficace des méthodes modernes de JavaScript (map, sort, etc.)

### Axes d'amélioration
1. **Sécurité** : Envisager l'utilisation d'une base de données côté serveur pour une meilleure sécurité des scores.
2. **Performance** : Optimiser le chargement des questions en les stockant dans un fichier JSON séparé.
3. **Accessibilité** : Ajouter des attributs ARIA et améliorer la structure sémantique du HTML.
4. **Internationalisation** : Implémenter un support multilingue pour élargir l'audience.
5. **Tests** : Ajouter des tests unitaires et d'intégration pour améliorer la fiabilité.
6. **Documentation** : Inclure plus de commentaires dans le code JavaScript pour une meilleure maintenabilité.
7. **Responsivité** : Vérifier et améliorer l'adaptabilité sur différents appareils.

### Conclusion finale
Ce projet de quiz sur le Sénégal présente une base solide