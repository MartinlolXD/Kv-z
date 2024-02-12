const questions = [
    {
        question: "When heavy update was released?",
        optionA: "11.3.",
        optionB: "27.9.",
        optionC: "Never",
        optionD: "12.10.",
        correctOption: "optionC"
    },
 
    {
        question: "How many classes are in tf2?",
        optionA: "10",
        optionB: "9",
        optionC: "8",
        optionD: "5",
        correctOption: "optionB"
    },
 
    {
        question: "What company made tf2?",
        optionA: "Valve",
        optionB: "Bethesda",
        optionC: "Blizzard",
        optionD: "Supercell",
        correctOption: "optionA"
    },
 
    {
        question: "How many game modes has TF2?",
        optionA: "12",
        optionB: "4",
        optionC: "9",
        optionD: "7",
        correctOption: "optionC"
    },
 
    {
        question: "When was mvm update released? (12.02.2024)",
        optionA: "4 years ago",
        optionB: "8 years ago ",
        optionC: "5 years ago ",
        optionD: "12 years ago ",
        correctOption: "optionD"
    },
 
    {
        question: "What things you need to play ranked in tf2?",
        optionA: "Atleast casual level 3, Premium TF2 account, Steam guard",
        optionB: "Atleast MVM level 3, Premium TF2 account, Buy TF2 ranked ticket ",
        optionC: "Atleast casual level 5, Premium TF2 account, Steam guard",
        optionD: "Atleast community level 5, Premium TF2 account, Steam guard",
        correctOption: "optionA"
    },
 
    {
        question: "In beta version of TF2. 2FORT did not have...",
        optionA: "Intel Room",
        optionB: "Health cabinets",
        optionC: "Roof over the bridge",
        optionD: "Sewers",
        correctOption: "optionC"
    },
 
    {
        question: "When TF2 was released?",
        optionA: "2007",
        optionB: "2006",
        optionC: "2008",
        optionD: "2009",
        correctOption: "optionA"
    },
 
    {
        question: "Which TF2 character's face wasn't exposed?",
        optionA: "Spy's",
        optionB: "Sniper's",
        optionC: "Engineer's",
        optionD: "Pyro's",
        correctOption: "optionD"
    },
 
    {
        question: "Which one from these TF2 character is the biggest psycho?",
        optionA: "Scout",
        optionB: "Demoman",
        optionC: "Engineer",
        optionD: "Sniper",
        correctOption: "optionC"
    },

 
]
 
 
let shuffledQuestions = []
 
function handleQuestions() {
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}
 
 
let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0
let indexNumber = 0
 
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
 
}
 
 
function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption
    const options = document.getElementsByName("option");
    let correctOption = null
 
    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })
 
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }
 
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
 
        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}
 
 
 
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}
 
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}
 
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}
 
function handleEndGame() {
    let remark = null
    let remarkColor = null
 
    if (playerScore <= 3) {
        remark = "špatné známky, procvičuj ještě."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "průměrný známky, to umíš lépe snad ne?"
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "nádhera, jen tak dál"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100
 
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
 
}
 
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}
 
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}