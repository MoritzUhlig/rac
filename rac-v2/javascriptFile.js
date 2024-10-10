const apiURL = "https://raw.githubusercontent.com/MoritzUhlig/my-json-api/main/data.json";

let questions;
let questionnumber = "1";
let questionDiv;
let questionLog = [];
let historyLog = []; // To store question history

function fetchData() {
    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            questions = data;
            document.querySelector("#lawHeading").textContent = questions.header.law_name;
            document.querySelector("#info").textContent = questions.header.description;
            questionDiv = document.querySelector("#questionDiv");
            questionDiv.textContent = questions["questions"][questionnumber].question_text;
            generateButtons();
            updateHistory(); // Display initial history
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function generateButtons() {
    let buttonDiv = document.querySelector("#buttonDiv");
    document.querySelectorAll(".choiceButton").forEach(button => {
        button.remove(); // This will only target choice buttons
    });

    const choices = questions["questions"][questionnumber]["choices"];

    Object.keys(choices).forEach(userChoice => {
        const button = document.createElement("button");
        button.textContent = userChoice;
        button.id = userChoice;
        button.className = "choiceButton";
        button.addEventListener("click", handleButtonClick);
        buttonDiv.appendChild(button);
    });

    document.querySelector("#back").style.display = questionnumber === "1" ? "none" : "inline-block";
}

function handleButtonClick(event) {
    let clickedButton = event.target;

    if (clickedButton.id === "restart") {
        // Reset everything
        questionnumber = "1";
        questionLog = [];
        historyLog = []; // Clear history log
        questionDiv.textContent = questions["questions"][questionnumber].question_text;
        generateButtons();
        document.querySelector("#restart").style.display = "none";
        document.querySelector("#back").style.display = "none";
        updateHistory(); // Update the history display
    } else if (clickedButton.id === "back") {
        if (questionLog.length > 0) {
            questionnumber = questionLog.pop(); // Go back one step
            historyLog.pop(); // Remove the last entry from the history
            questionDiv.textContent = questions["questions"][questionnumber].question_text;
            document.querySelector("#restart").style.display = "none";
            generateButtons();
            updateHistory(); // Update history display after going back
        }
    } else {
        let choice = questions["questions"][questionnumber]["choices"][clickedButton.id];
        logQuestionHistory(questions["questions"][questionnumber].question_text, clickedButton.id); // Log question and answer

        if (choice.next_question === "end_card") {
            questionLog.push(questionnumber);
            let tempLegalReason = choice.legal_reason;
            questionnumber = choice.next_question;
            questionDiv.textContent = questions["questions"][questionnumber].end_card_text + ": " + tempLegalReason;
            document.querySelectorAll(".choiceButton").forEach(button => button.style.display = "none");
            document.querySelector("#restart").style.display = "inline-block";
        } else if (choice.next_question === "successful") {
            questionLog.push(questionnumber);
            let tempLegalReason = choice.legal_reason;
            questionnumber = choice.next_question;
            questionDiv.textContent = questions["questions"][questionnumber].successful_card_text + " " + tempLegalReason;
            document.querySelectorAll(".choiceButton").forEach(button => button.style.display = "none");
            document.querySelector("#restart").style.display = "inline-block";
        } else {
            questionLog.push(questionnumber);
            questionnumber = choice.next_question;
            questionDiv.textContent = questions["questions"][questionnumber].question_text;
            generateButtons();
            document.querySelector("#back").style.display = "inline-block";
        }
        updateHistory(); // Update the history display after making a choice
    }
}

function logQuestionHistory(questionText, answer) {
    historyLog.push({ question: questionText, answer: answer }); // Store question and chosen answer
}

function updateHistory() {
    const historyDiv = document.querySelector("#historyDiv");
    historyDiv.innerHTML = "<h3>History</h3>"; // Clear and add a heading

    historyLog.forEach((entry, index) => {
        const historyItem = document.createElement("div");
        historyItem.textContent = `${index + 1}. ${entry.question} - Answer: ${entry.answer}`;
        historyDiv.appendChild(historyItem);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchData();
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", handleButtonClick);
    });
});
