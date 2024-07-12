
const ODS = [
    { id: 1, name: "Fin de la Pobreza", image: "./img/ODS1.jpg" },
    { id: 2, name: "Hambre Cero",  image: "./img/ODS2.jpg"  },
    { id: 3, name: "Salud y Bienestar",  image: "./img/ODS3.jpg"},
    { id: 4, name: "Educación de Calidad",  image: "./img/ODS4.jpg"},
    { id: 5, name: "Igualdad de Género",  image: "./img/ODS5.jpg"},
    { id: 6, name: "Agua Limpia y Saneamiento", color: "#26bde2", image: "./img/ODS6.jpg" },
    { id: 7, name: "Energía Asequible y No Contaminante", color: "#fcc30b", image: "./img/ODS7.jpg" },
    { id: 8, name: "Trabajo Decente y Crecimiento Económico", color: "#a21942", image: "./img/ODS8.jpg" }
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

        setTimeout(() => {
            $('.card').addClass('flipped');
            setTimeout(() => {
                $('.card').removeClass('flipped');
                resetBoard();
                matches = 0;
                seconds = 0;
                score = 0;
                $('#timer').text(seconds);
                $('#score').text(score);
                clearInterval(timer);
                timer = setInterval(updateTimer, 1000);
            }, 1500);
        }, 1000);
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
            if (score > 0)
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
