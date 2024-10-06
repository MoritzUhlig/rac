const apiURL = "https://raw.githubusercontent.com/MoritzUhlig/my-json-api/main/data.json";

let questions;
let questionnumber = "1"; 
let questionDiv;
let questionLog = []; 

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
            questionDiv = document.querySelector("#questionDiv");       
            questionDiv.textContent = questions["questions"][questionnumber].question_text;    
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function handleButtonClick(event) {
    let clickedButton = event.target;

    if (clickedButton.id == "yes" || clickedButton.id == "no") {
        
        if (questions["questions"][questionnumber][clickedButton.id].next_question == "end_card") {
            let tempLegalreason = questions["questions"][questionnumber][clickedButton.id].legal_reason;
            questionLog.push(questionnumber);
            questionnumber = questions["questions"][questionnumber][clickedButton.id].next_question;
            questionDiv.textContent =  questions["questions"][questionnumber].end_card_text + ": " + tempLegalreason;           
            document.querySelectorAll(".choiceButton").forEach(button => { button.style.display = "none" });
            document.querySelector("#restart").style.display = "inline-block";
           
            
        } else if(questions["questions"][questionnumber][clickedButton.id].next_question == "successful"){
            questionnumber = questions["questions"][questionnumber][clickedButton.id].next_question;
            questionDiv.textContent =  questions["questions"][questionnumber].successful_card_text;
            document.querySelectorAll(".choiceButton").forEach(button => { button.style.display = "none" });
            document.querySelector("#restart").style.display = "inline-block";
        }
        
        else {
            questionLog.push(questionnumber); 
            questionnumber = questions["questions"][questionnumber][clickedButton.id].next_question;
            questionDiv.textContent = questions["questions"][questionnumber].question_text;
            document.querySelector("#back").style.display = "inline-block"; 
        }    

        
    } else if (clickedButton.id == "restart") {
        questionnumber = "1";
        questionLog = []; 
        questionDiv.textContent = questions["questions"][questionnumber].question_text;
        document.querySelectorAll(".choiceButton").forEach(button => { button.style.display = "inline-block" });
        document.querySelector("#restart").style.display = "none";
        document.querySelector("#back").style.display = "none"; 


    } else if (clickedButton.id == "back") {
        if (questionLog.length > 0) {
 
            questionnumber = questionLog.pop(); 
            questionDiv.textContent = questions["questions"][questionnumber].question_text;}
            document.querySelectorAll(".choiceButton").forEach(button => {button.style.display = "inline-block"});
            document.querySelector("#restart").style.display = "none"
            if (questionLog.length === 0) {
                document.querySelector("#back").style.display = "none"; 
            }
        }
    }


document.addEventListener('DOMContentLoaded', function() {   
    fetchData();  
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", handleButtonClick);
    });
});
