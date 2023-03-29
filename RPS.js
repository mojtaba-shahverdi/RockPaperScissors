const CHOICES = [
    {
        name: 'paper',
        beats: 'rock'
    },
    {
        name: 'scissors',
        beats: 'paper'
    },
    {
        name: 'rock',
        beats: 'scissors'
    },
]
const choiceButtons = document.querySelectorAll('.choice-btn')
const gameDiv = document.getElementById('game_section')
const resultsDiv = document.getElementById('result_section')
const resultDivs = document.querySelectorAll('.results_result')
const resultWinner = document.getElementById('result-text')
const resultText = document.getElementById('relusts_text_hide')
const scoreCount = document.getElementById('score_number')
let score = 0;


choiceButtons.forEach( button => {
    button.addEventListener('click', () =>{
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name === choiceName)
        choose(choice)
    })
})
const choose = (choice) => {
    const aiChoice = aiChoose();
    displayResults([choice, aiChoice]);
    displayWinner([choice, aiChoice]);
}
const aiChoose = () => {
    const randomChoice = Math.floor(Math.random() * CHOICES.length)
    return CHOICES[randomChoice]
}

const displayResults = (results) => {
    resultDivs.forEach((resultDiv, resultIndex) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="choice ${results[resultIndex].name}">
                    <img src="img/icon-${results[resultIndex].name}.svg" alt="${results[resultIndex].name}
                    "/>
                </div>
            `;
        }, resultIndex * 650);
    });
    setTimeout(() => {
        document.getElementById(`result_section`).style.display = 'grid';
        document.getElementById(`game_section`).style.display = 'none';
    }, 400)
    setTimeout(() => {
        document.getElementById(`result_section`).style.display = 'none';
        document.getElementById(`game_section`).style.display = 'grid';
    }, 2300)
    setTimeout(() => {
        document.getElementById(`clear_result_2`).innerHTML = '';
    }, 2350)
} 
const displayWinner = (results) => {
    setTimeout(() => {
        const userWins = isWinner(results)
        const aiWins = isWinner(results.reverse())
        
        document.getElementById(`result-text`).style.display = 'grid';

        if(userWins) {
            resultText.innerHTML= "you win";
            scoreCounter(1)
        }else if(aiWins) {
            resultText.innerHTML= "you lose"
            scoreCounter(-1)
        }else {
            resultText.innerHTML = "draw"
        }
    }, 1000)
    setTimeout(() => {
        document.getElementById(`result-text`).style.display = 'none';
    }, 2300)
}
const isWinner = (results) => {
    return results[0].beats === results[1].name
}
function scoreCounter (points) {
    score += points
    scoreCount.innerText = score
}