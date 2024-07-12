
const ODS = [
    { id: 1, name: "Fin de la Pobreza", image: "./img/1.png" },
    { id: 2, name: "Hambre Cero",  image: "./img/2.png"  },
    { id: 3, name: "Salud y Bienestar",  image: "./img/3.png"},
    { id: 4, name: "Educación de Calidad",  image: "./img/4.png"},
    { id: 5, name: "Igualdad de Género",  image: "./img/5.png"},
    { id: 6, name: "Agua Limpia y Saneamiento", color: "#26bde2", image: "./img/6.png" },
    { id: 7, name: "Energía Asequible y No Contaminante", color: "#fcc30b", image: "./img/7.png" },
    { id: 8, name: "Trabajo Decente y Crecimiento Económico", color: "#a21942", image: "./img/8.png" }
];

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matches = 0;
    let timer;
    let seconds = 0;
    let score = 0;

    $(document).ready(function() {
        startGame();
        $('#restart').click(restartGame);
    });

    function startGame() {
        const cards = [...ODS, ...ODS];
        console.log(cards[0].image);
        cards.sort(() => 0.5 - Math.random());
        $('#game-board').empty();
    
        cards.forEach(card => {
            console.log(card.image);
    
            const cardElement = $(`
                <div class="card">
                    <div class="card-inner" data-id="${card.id}">
                        <div class="card-front"></div>
                        <div class="card-back" style="background-image: url('${card.image}');"></div>
                    </div>
                </div>
            `);
            $('#game-board').append(cardElement);
            cardElement.click(handleCardClick);
        });

        matches = 0;
        seconds = 0;
        score = 0;
        $('#timer').text(seconds);
        $('#score').text(score);
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
    }

    function restartGame() {
        clearInterval(timer);
        startGame();
    }

    function updateTimer() {
        seconds++;
        $('#timer').text(seconds);
    }

    function handleCardClick() {
        if (lockBoard) return;
        if ($(this).hasClass('flipped')) return;

        $(this).addClass('flipped');

        if (!firstCard) {
            firstCard = $(this);
            return;
        }

        secondCard = $(this);
        lockBoard = true;

        const firstCardId = firstCard.find('.card-inner').data('id');
        const secondCardId = secondCard.find('.card-inner').data('id');

        if (firstCardId === secondCardId) {
            matches++;
            score += 10; 
            $('#score').text(score);
            resetBoard();
            if (matches === ODS.length) {
                clearInterval(timer);
                alert(`¡Felicidades! Has encontrado todos los pares en ${seconds} segundos con una puntuación de ${score}.`);
            }
        } else {
            score -= 2; 
            $('#score').text(score);
            setTimeout(() => {
                firstCard.removeClass('flipped');
                secondCard.removeClass('flipped');
                resetBoard();
            }, 1000);
        }
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }
