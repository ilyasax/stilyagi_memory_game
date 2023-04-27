// Grab a couple of things
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 7;
const defeatSound = new Audio('./sounds/pisk.mp3');
const winSound = new Audio('./sounds/bugiWugi.mp3');

// Link text
playerLivesCount.textContent = playerLives;

// Generate the data object
const getData = () => [
    { imgSrc: './img/kal.jpg', name: 'kal' },
    { imgSrc: './img/chir.jpg', name: 'chir' },
    { imgSrc: './img/sim.jpg', name: 'sim' },
    { imgSrc: './img/ham.jpg', name: 'ham' },
    { imgSrc: './img/detina.jpg', name: 'detina' },
    { imgSrc: './img/mikh.jpg', name: 'mikh' },
    { imgSrc: './img/kanak.jpg', name: 'kanak' },
    { imgSrc: './img/lesch.jpg', name: 'lesch' },
    { imgSrc: './img/kal.jpg', name: 'kal' },
    { imgSrc: './img/chir.jpg', name: 'chir' },
    { imgSrc: './img/sim.jpg', name: 'sim' },
    { imgSrc: './img/ham.jpg', name: 'ham' },
    { imgSrc: './img/detina.jpg', name: 'detina' },
    { imgSrc: './img/mikh.jpg', name: 'mikh' },
    { imgSrc: './img/kanak.jpg', name: 'kanak' },
    { imgSrc: './img/lesch.jpg', name: 'lesch' }
];

// Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

// Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    // Generate the HTML
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList.add('card');
        face.classList.add('face');
        back.classList.add('back');
        // Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        // Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });
    });
};
// Check Cards 
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
    // Logic
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            });
        } else {
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggleCard'), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                setTimeout(() => {
                    defeatSound.play();
                    restart('КОМУ ТЫ ПИЗДИШЬ?! НИ ХУЯ ТЫ НЕ ЛЮБИШЬ БУГИ-ВУГИ!');
                }, 950);
            }
        }
    }
    // Run a check to see if we won the game
    if (toggleCard.length === 16) {
        setTimeout(() => {
            winSound.play();
            restart('НИ ХУЯ СЕБЕ, КАК СИЛЬНО ТЫ ЛЮБИШЬ БУГИ-ВУГИ!');
        }, 950);
    }
};

// Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        // Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1000);
    });
    playerLives = 7;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 500);
};

cardGenerator();
