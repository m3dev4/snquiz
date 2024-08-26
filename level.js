document.addEventListener('DOMContentLoaded', () => {
    const difficultySelection = document.getElementById('difficulty-selection');
    const easyButton = document.getElementById('easy');
    const mediumButton = document.getElementById('medium');
    const hardButton = document.getElementById('hard');
    const gameContainer = document.getElementById('game');
    const loaderElement = document.getElementById('loader');

    function startGame(difficulty) {
        difficultySelection.classList.add('hidden');
        loaderElement.classList.remove('hidden');
        
        // Ici, vous pouvez ajouter une logique pour ajuster la difficulté du jeu
        // Par exemple, vous pourriez filtrer les questions en fonction de la difficulté choisie
        
        setTimeout(() => {
            loaderElement.classList.add('hidden');
            gameContainer.classList.remove('hidden');
            window.startGame(difficulty); // Appel à la fonction startGame dans game.js
        }, 1000); // Simuler un chargement d'une seconde
    }

    easyButton.addEventListener('click', () => startGame('easy'));
    mediumButton.addEventListener('click', () => startGame('medium'));
    hardButton.addEventListener('click', () => startGame('hard'));
});