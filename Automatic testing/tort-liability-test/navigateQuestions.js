const fs = require('fs');

// Load the rule file
const ruleFile = JSON.parse(fs.readFileSync('./rule-file.json', 'utf8'));


function navigateQuestions(answers) {
    let currentQuestion = ruleFile.questions["1"];
    let outcome = { legal_reasons: [] };
 
  while (currentQuestion != undefined && currentQuestion.choices != undefined) {
      
        const answer = answers[currentQuestion.question_text];
       
      const choice = currentQuestion.choices[answer];
      
  
      if (!choice) {
        throw new Error(`Invalid answer '${answer}' for question: '${currentQuestion.question_text}'`);
      }
  
      // Add legal reasons if present
      if (choice.legal_reason) {
        outcome.legal_reasons.push(...choice.legal_reason);
        
      } 
  
        
        if ( choice.next_question === "successful") {
        outcome.final_card = "successful";
        
        } else {
          
        outcome.final_card = "end_card";
    }

      // Move to the next question
  
      currentQuestion = ruleFile.questions[choice.next_question];
      
    }
  console.log(outcome.final_card);
    // Assign the final card
    
  
    return outcome;
  }
  

  module.exports = { navigateQuestions };