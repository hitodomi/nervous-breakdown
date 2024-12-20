const cards = [
    { id: 1, image: 'image1.jpg' },
    { id: 2, image: 'image2.jpg' },
    { id: 3, image: 'image3.jpg' },
    { id: 4, image: 'image4.jpg' },
    { id: 5, image: 'image5.jpg' },
    { id: 6, image: 'image6.jpg' },
    { id: 7, image: 'image7.jpg' },
    { id: 8, image: 'image8.jpg' },
    { id: 9, image: 'image9.jpg' },
    { id: 10, image: 'image10.jpg' },
    { id: 11, image: 'image11.jpg' },
    { id: 12, image: 'image12.jpg' },
    { id: 13, image: 'image13.jpg' },
    { id: 14, image: 'image14.jpg' },
    { id: 15, image: 'image15.jpg' },
    { id: 16, image: 'image16.jpg' },
];

let shuffledCards;
let selectedCards = [];
let matchedPairs = 0;
let movesCount = 0;  // 手数をカウントする変数

function createCard(index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;

    const img = document.createElement('img');
    img.src = 'images/back.jpg';  // 裏面の画像
    img.alt = 'Card';
    card.appendChild(img);

    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (selectedCards.length < 2 && !selectedCards.includes(this)) {
        const cardIndex = this.dataset.index;
        this.firstChild.src = `images/${shuffledCards[cardIndex].image}`;
        selectedCards.push(this);

        if (selectedCards.length === 2) {
            movesCount++; // カードめくりのたびに手数をカウント
            updateMovesDisplay(); // 手数を表示する関数を呼び出す
            setTimeout(checkMatch, 1000);
        }
    }
}

function updateMovesDisplay() {
    const movesDisplay = document.getElementById('moves-counter');
    movesDisplay.textContent = `手数: ${movesCount}`;
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    const index1 = card1.dataset.index;
    const index2 = card2.dataset.index;

    if (shuffledCards[index1].id === shuffledCards[index2].id) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        card1.classList.add('matched');  // カードが揃ったらクラスを追加
        card2.classList.add('matched');

        matchedPairs++;

        if (matchedPairs === cards.length) {
            setTimeout(() => {
                alert(`おめでとう！ゲームクリア！\n手数: ${movesCount}`);
                resetGame();
            }, 1000);
        }
    } else {
        // カードが揃わなかった場合は裏返す
        setTimeout(() => {
            card1.firstChild.src = 'images/back.jpg';
            card2.firstChild.src = 'images/back.jpg';
        }, 1000);
    }

    

    selectedCards = [];
}

function resetGame() {
    shuffledCards = [...cards, ...cards].sort(() => Math.random() - 0.5);
    matchedPairs = 0;
    movesCount = 0; // 手数を初期化

    const board = document.getElementById('board');
    board.innerHTML = '';

    for (let i = 0; i < shuffledCards.length; i++) {
        const card = createCard(i);
        board.appendChild(card);
    }

    updateMovesDisplay(); // 手数の初期表示を更新
}


// ゲームの初期化
window.onload = function () {
    resetGame();
    updateMovesDisplay(); // 手数の初期表示

    // リセットボタンにイベントリスナーを追加
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetGame);
};