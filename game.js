document.addEventListener('DOMContentLoaded', () => {
    const question = document.getElementById('question');
    const choices = Array.from(document.getElementsByClassName('choice-text'));
    const progressText = document.getElementById('progressText');
    const scoreText = document.getElementById('score');
    const progressBarFull = document.getElementById('progressBarFull');
    const skipButton = document.getElementById('skip-button')

    let currentQuestion = {};
    let acceptingAnswers = false;
    let score = 0;
    let questionCounter = 0;
    let availableQuestions = [];

    let questions = [
        {
            "question": "Quel est le plus grand fleuve du Sénégal?",
            "choices": ["Fleuve Gambie", "Fleuve Sénégal", "Fleuve Casamance", "Fleuve Saloum"],
            "answer": 2,
            "difficulty": "easy"
        },
        {
            "question": "Quelle est la capitale du Sénégal?",
            "choices": ["Saint-Louis", "Touba", "Dakar", "Ziguinchor"],
            "answer": 3,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le climat prédominant au Sénégal?",
            "choices": ["Tropical", "Arctique", "Méditerranéen", "Désertique"],
            "answer": 1,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom du pays voisin au sud du Sénégal?",
            "choices": ["Gambie", "Mauritanie", "Guinée-Bissau", "Mali"],
            "answer": 3,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom du président actuel du Sénégal?",
            "choices": ["Léopold Sédar Senghor", "Macky Sall", "Abdoulaye Wade", "Bassirou Diomaye Faye"],
            "answer": 4,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom du célèbre lac salé au Sénégal?",
            "choices": ["Lac Rose", "Lac de Guiers", "Lac de Sokone", "Lac de Saint-Louis"],
            "answer": 1,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le sport le plus populaire au Sénégal?",
            "choices": ["Basketball", "Football", "Rugby", "Handball"],
            "answer": 2,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom de l’île au large de Dakar?",
            "choices": ["Île de Gorée", "Île de Madeleine", "Île de Ngor", "Île de Yoff"],
            "answer": 1,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le fruit typique du Sénégal?",
            "choices": ["Mangue", "Pomme", "Banane", "Orange"],
            "answer": 1,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom de l’instrument de musique traditionnel du Sénégal?",
            "choices": ["Guitar", "Balafon", "Piano", "Batterie"],
            "answer": 2,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom de la danse traditionnelle sénégalaise?",
            "choices": ["Sabar", "Tango", "Salsa", "Bachata"],
            "answer": 1,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom du célèbre monument situé à Dakar?",
            "choices": ["La Tour Eiffel", "Le Christ Rédempteur", "La Monument de la Renaissance Africaine", "La Statue de la Liberté"],
            "answer": 3,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom du marché principal de Dakar?",
            "choices": ["Marché Sandaga", "Marché de Rive Gauche", "Marché de Saint-Louis", "Marché Kermel"],
            "answer": 1,
            "difficulty": "easy"
        },
        {
            "question": "Quelle est la langue officielle du Sénégal?",
            "choices": ["Anglais", "Français", "Espagnol", "Allemand"],
            "answer": 2,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le plus grand parc national du Sénégal?",
            "choices": ["Parc National du Niokolo-Koba", "Parc National de la Langue de Barbarie", "Parc National du Saloum", "Parc National de la Basse Casamance"],
            "answer": 1,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom du fleuve qui traverse Dakar?",
            "choices": ["Fleuve Sénégal", "Fleuve Gambie", "Fleuve Casamance", "Fleuve Saloum"],
            "answer": 1,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom de l’ancien président du Sénégal?",
            "choices": ["Léopold Sédar Senghor", "Macky Sall", "Abdoulaye Wade", "Ousmane Sonko"],
            "answer": 1,
            "difficulty": "easy"
        },
        {
            "question": "Quelle est la monnaie utilisée au Sénégal?",
            "choices": ["Dollar", "Euro", "Franc CFA", "Livre Sterling"],
            "answer": 3,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom du célèbre musicien sénégalais connu pour le mbalax?",
            "choices": ["Youssou N'Dour", "Oumou Sangaré", "Salif Keita", "Amadou & Mariam"],
            "answer": 1,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom de la plage populaire de Dakar?",
            "choices": ["Plage de N'Gor", "Plage de Saly", "Plage de Yoff", "Plage de Saint-Louis"],
            "answer": 3,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom du site archéologique au Sénégal?",
            "choices": ["Gorée", "Tombouctou", "Djenne", "Mopti"],
            "answer": 1,
            "difficulty": "easy"
        },
        {
            "question": "Quel est le nom du célèbre festival de musique à Dakar?",
            "choices": ["Fesman", "Jazz à Ouaga", "Festival des Arts de la Rue", "Festival de la Musique d'Afrique"],
            "answer": 1,
            "difficulty": "easy"
        },
        {
            "question": "Qui est considéré comme le père de la nation sénégalaise?",
            "choices": ["Léopold Sédar Senghor", "Cheikh Anta Diop", "Blaise Diagne", "Amadou Bamba"],
            "answer": 1,
            "difficulty": "medium"
        },
        {
            "question": "Quelle est la langue nationale parlée par la majorité des Sénégalais?",
            "choices": ["Français", "Wolof", "Pulaar", "Serer"],
            "answer": 2,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom de l’ancien président du Sénégal de 2000 à 2012?",
            "choices": ["Léopold Sédar Senghor", "Abdoulaye Wade", "Macky Sall", "Cheikh Anta Diop"],
            "answer": 2,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du festival culturel qui se déroule à Saint-Louis?",
            "choices": ["Fesman", "Festival de Saint-Louis", "Festival de Jazz", "Festival des Arts"],
            "answer": 2,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom de la structure qui gère le patrimoine historique du Sénégal?",
            "choices": ["L'Institut des Arts", "La Direction du Patrimoine Culturel", "La Société Historique du Sénégal", "Le Musée National"],
            "answer": 2,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du célèbre écrivain sénégalais connu pour son roman *Les Bouts de Bois de Dieu*?",
            "choices": ["Ousmane Sembene", "Cheikh Anta Diop", "Léopold Sédar Senghor", "Amadou Hampâté Bâ"],
            "answer": 1,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du célèbre peintre sénégalais connu pour ses œuvres modernes?",
            "choices": ["Ousmane Sow", "Ibrahima Fall", "Pape Seydi", "El Hadji Sy"],
            "answer": 4,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du célèbre écrivain et historien sénégalais connu pour ses recherches sur l’histoire africaine?",
            "choices": ["Cheikh Anta Diop", "Léopold Sédar Senghor", "Ousmane Sembene", "Amadou Hampâté Bâ"],
                   "answer": 1,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du plus grand parc national marin du Sénégal?",
            "choices": ["Parc National de la Langue de Barbarie", "Parc National du Saloum", "Parc National du Niokolo-Koba", "Parc National des Iles de la Madeleine"],
            "answer": 4,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du chef religieux sénégalais fondateur de la confrérie Mouride?",
            "choices": ["Amadou Bamba", "Cheikh Anta Diop", "Ousmane Sembene", "Léopold Sédar Senghor"],
            "answer": 1,
            "difficulty": "medium"
        },
        {
            "question": "Quelle est la saison des pluies au Sénégal?",
            "choices": ["Hivernage", "Saison sèche", "Saison des récoltes", "Saison des pluies"],
            "answer": 4,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du célèbre marché de Dakar connu pour sa grande diversité de produits?",
            "choices": ["Marché Sandaga", "Marché Kermel", "Marché de Rive Gauche", "Marché de la Rue 10"],
            "answer": 2,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du chef d’État actuel du Sénégal?",
            "choices": ["Léopold Sédar Senghor", "Macky Sall", "Abdoulaye Wade", "Ousmane Sonko"],
            "answer": 2,
            "difficulty": "medium"
        },
        {
            "question": "Quelle est la date de l'indépendance du Sénégal?",
            "choices": ["4 avril 1960", "14 juillet 1789", "25 décembre 1962", "1er janvier 1960"],
            "answer": 1,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du célèbre lac salé situé à 30 km de Dakar?",
            "choices": ["Lac Rose", "Lac de Guiers", "Lac de Saint-Louis", "Lac de Mbayang"],
            "answer": 1,
            "difficulty": "medium"
        },
        {
            "question": "Quelle était l'ancienne capitale du Sénégal ?",
            "choices": ["Dakar", "Thies", "Saint-Louis", "Tambacounda"],
            "answer": 3,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du célèbre écrivain sénégalais auteur du livre *L’Aventure ambiguë*?",
            "choices": ["Amadou Hampâté Bâ", "Ousmane Sembene", "Cheikh Anta Diop", "Léopold Sédar Senghor"],
            "answer": 1,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du célèbre danseur sénégalais connu pour ses spectacles internationaux?",
            "choices": ["Germaine Acogny", "Youssou N'Dour", "Ousmane Sow", "El Hadji Sy"],
            "answer": 1,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du célèbre marché de Saint-Louis?",
            "choices": ["Marché de Sandaga", "Marché de Saint-Louis", "Marché Kermel", "Marché de Gorée"],
            "answer": 2,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du fleuve qui forme la frontière naturelle entre le Sénégal et la Mauritanie?",
            "choices": ["Fleuve Gambie", "Fleuve Sénégal", "Fleuve Saloum", "Fleuve Casamance"],
            "answer": 2,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du célèbre écrivain sénégalais qui a remporté le Prix Renaudot en 2005?",
            "choices": ["Ousmane Sembene", "Cheikh Anta Diop", "Amadou Hampâté Bâ", "Mohamed Mbougar Sarr"],
            "answer": 4,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom de la confrérie religieuse fondée par Cheikh Ahmadou Bamba?",
            "choices": ["Tidianes", "Mourides", "Qadiriyya", "Chrétiens"],
            "answer": 2,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du célèbre site de pêche situé au sud de Dakar?",
            "choices": ["La Petite Côte", "Les Almadies", "Gorée", "La Langue de Barbarie"],
            "answer": 2,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du grand lac situé au centre du Sénégal?",
            "choices": ["Lac de Guiers", "Lac Rose", "Lac de Saint-Louis", "Lac de Mbayang"],
            "answer": 1,
            "difficulty": "medium"
        },
        {
            "question": "Quel est le nom du célèbre chef d'État sénégalais qui a mené le pays vers l'indépendance?",
            "choices": ["Léopold Sédar Senghor", "Macky Sall", "Abdoulaye Wade", "Ousmane Sonko"],
            "answer": 1,
            "difficulty": "medium"
        },
        {
            "question": "Quelle est la superficie approximative du Sénégal?",
            "choices": ["96,722 km²", "196,722 km²", "296,722 km²", "396,722 km²"],
            "answer": 2,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du désert qui couvre une partie du nord du Sénégal?",
            "choices": ["Désert du Sahara", "Désert de Ferlo", "Désert du Namib", "Désert de Kalahari"],
            "answer": 2,
            "difficulty": "hard"
        },
        {
            "question": "Où se situe le sénegal",
            "choices": ["Europe", "Amérique", "Asie", "Afrique"],
            "answer": 4,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du célèbre festival de musique traditionnelle se tenant chaque année à Dakar?",
            "choices": ["Fesman", "Festival International de Jazz de Dakar", "Festival des Arts", "Festival de la Musique du Sénégal"],
            "answer": 1,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du célèbre poète et écrivain sénégalais du XXe siècle?",
            "choices": ["Léopold Sédar Senghor", "Cheikh Anta Diop", "Amadou Hampâté Bâ", "Ousmane Sembene"],
            "answer": 1,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du célèbre acteur sénégalais qui a joué dans le film *Mandabi*?",
            "choices": ["Ousmane Sembene", "Cheikh Anta Diop", "Youssou N'Dour", "Oumar Sanda"],
            "answer": 1,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du plus grand lac d'eau douce au Sénégal?",
            "choices": ["Lac de Guiers", "Lac Rose", "Lac de Saint-Louis", "Lac de Mbayang"],
            "answer": 1,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du célèbre monument sénégalais symbolisant la renaissance de l’Afrique?",
            "choices": ["Monument de la Renaissance Africaine", "Statue de la Liberté", "Christ Rédempteur", "Tour Eiffel"],
            "answer": 1,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du grand site archéologique découvert au Sénégal?",
            "choices": ["Gorée", "Tombouctou", "Djenne", "Ségou"],
            "answer": 1,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du poète sénégalais lauréat du Grand Prix de Littérature de l'Académie Française?",
            "choices": ["Léopold Sédar Senghor", "Cheikh Anta Diop", "Ousmane Sembene", "Amadou Hampâté Bâ"],
            "answer": 1,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du grand écrivain sénégalais ayant écrit *Les Bouts de Bois de Dieu*?",
            "choices": ["Ousmane Sembene", "Cheikh Anta Diop", "Amadou Hampâté Bâ", "Léopold Sédar Senghor"],
            "answer": 1,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du grand parc national situé au sud-est du Sénégal?",
            "choices": ["Parc National de la Basse Casamance", "Parc National du Niokolo-Koba", "Parc National des Iles de la Madeleine", "Parc National du Saloum"],
            "answer": 2,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du festival international de musique organisé à Dakar?",
            "choices": ["Festival de Jazz de Dakar", "Fesman", "Festival des Arts de la Rue", "Festival de la Musique du Sénégal"],
            "answer": 2,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du célèbre festival de musique traditionnelle du Sénégal?",
            "choices": ["Festival de Saint-Louis", "Fesman", "Festival de Gorée", "Festival de Dakar"],
            "answer": 2,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du célèbre archipel de l’Atlantique situé au large de Dakar?",
            "choices": ["Les Îles de la Madeleine", "Les Îles de Gorée", "Les Îles de Saint-Louis", "Les Îles de Casamance"],
            "answer": 1,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du célèbre site de pêche au Sénégal, situé sur la Petite Côte?",
            "choices": ["La Petite Côte", "Les Almadies", "Gorée", "La Langue de Barbarie"],
            "answer": 1,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du célèbre écrivain sénégalais qui a écrit *L'Aventure ambiguë*?",
            "choices": ["Amadou Hampâté Bâ", "Ousmane Sembene", "Cheikh Anta Diop", "Léopold Sédar Senghor"],
            "answer": 1,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du célèbre groupe de musique sénégalais fondé par Youssou N'Dour?",
            "choices": ["Super Etoile", "La Troupe de Gorée", "Les Bouts de Bois de Dieu", "Les Musiciens de Saint-Louis"],
            "answer": 1,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom de l'instrument traditionnel sénégalais fait de calebasse et de cordes?",
            "choices": ["Balafon", "Guitar", "Kora", "Tam-Tam"],
            "answer": 3,
            "difficulty": "hard"
        },
        {
            "question": "Quel est le nom du célèbre écrivain sénégalais qui a remporté le Prix Renaudot pour son livre *La Plus Secrète Mémoire des hommes*?",
            "choices": ["Mohamed Mbougar Sarr", "Ousmane Sembene", "Cheikh Anta Diop", "Amadou Hampâté Bâ"],
            "answer": 1,
            "difficulty": "hard"
        }
    
    ];

    const CORRECT_BONUS = 10;
    let MAX_QUESTIONS = 20; 

    window.startGame = (difficulty) => {
        console.log(`Starting game with difficulty: ${difficulty}`);
        questionCounter = 0;
        score = 0;

        // Filtrer les questions en fonction de la difficulté
        switch(difficulty) {
            case 'easy':
                availableQuestions = questions.filter(q => q.difficulty === 'easy');
                break;
            case 'medium':
                availableQuestions = questions.filter(q => q.difficulty === 'easy' || q.difficulty === 'medium');
                break;
            case 'hard':
                availableQuestions = [...questions]; // Toutes les questions pour le niveau difficile
                break;
            default:
                availableQuestions = [...questions];
        }

        // Ajuster MAX_QUESTIONS si nécessaire
        MAX_QUESTIONS = Math.min(MAX_QUESTIONS, availableQuestions.length);

        getNewQuestion();
    };

    skipButton.addEventListener('click', () => {
        if(acceptingAnswers){
            getNewQuestion()
        }
    })

    const getNewQuestion = () => {
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

    const incrementScore = (num) => {
        score += num;
        scoreText.innerText = score;
    };
});

