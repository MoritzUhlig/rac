const { navigateQuestions } = require('./navigateQuestions');

describe("Tort Liability Act Rule Tests", () => {
  test("Path 1: No damage occurred", () => {
    const answers = {
      "Has damage occurred?": "No",
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("end_card"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" }
      
    ]));
  });

  test("Path 2: damage occurred, contract exist, damages regulated in contract", () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"Yes", 
      "Is the responsibility for damages regulated in the contract?": "Yes", 
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("end_card"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" }
      
    ]));
  });


  test("Path 3: damage occurred, contract exist, damages not regulated in contract, regulated by another law", () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"Yes", 
      "Is the responsibility for damages regulated in the contract?": "No", 
      "Is the responsibility for tort regulated by another law?": "Yes", 
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("end_card"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" }
      
    ]));
  });


  test("Path 4: damage occurred, contract exist, damages not regulated in contract, not regulated by another law", () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"Yes", 
      "Is the responsibility for damages regulated in the contract?": "No", 
      "Is the responsibility for tort regulated by another law?": "No", 
      "Is there an adequate causality based upon the action of the person? Could a reasonable person have predicted that this action would likely lead to this type of damages?":"No",
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("end_card"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" }
      
    ]));
  });


  test(
    `Path 5: 
    damage occurred, 
    contract exists, 
    damages not regulated in contract, 
    not regulated by another law
    adequate causality 
    Not intentionally`, 
       
    () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"Yes", 
      "Is the responsibility for damages regulated in the contract?": "No", 
      "Is the responsibility for tort regulated by another law?": "No", 
      "Is there an adequate causality based upon the action of the person? Could a reasonable person have predicted that this action would likely lead to this type of damages?":"No",
      "Has the damage occurred intentionally or by negligence?": "No",
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("end_card"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" }
      
    ]));
  });

  test(
    `Path 6: 
    damage occurred, 
    contract exists, 
    damages not regulated in contract, 
    not regulated by another law
    adequate causality 
    intentionally
    personal damage
    person died`, 
       
    () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"Yes", 
      "Is the responsibility for damages regulated in the contract?": "No", 
      "Is the responsibility for tort regulated by another law?": "No", 
      "Is there an adequate causality based upon the action of the person? Could a reasonable person have predicted that this action would likely lead to this type of damages?":"Yes",
      "Has the damage occurred intentionally or by negligence?": "Yes",
      "What type of damage has occurred?": "Personal damage",
      "Has the person died?": "Yes", 
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("successful"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" }
      
    ]));
  });

  test(
    `Path 7: 
    damage occurred, 
    contract exists, 
    damages not regulated in contract, 
    not regulated by another law
    adequate causality 
    intentionally
    personal damage
    person didnt die`, 
       
    () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"Yes", 
      "Is the responsibility for damages regulated in the contract?": "No", 
      "Is the responsibility for tort regulated by another law?": "No", 
      "Is there an adequate causality based upon the action of the person? Could a reasonable person have predicted that this action would likely lead to this type of damages?":"Yes",
      "Has the damage occurred intentionally or by negligence?": "Yes",
      "What type of damage has occurred?": "Personal damage",
      "Has the person died?": "No", 
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("successful"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" },
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K5", text: "Chapter 5, section 7 §" }
    ]));
  });

  test(
    `Path 8: 
    damage occurred, 
    contract exists, 
    damages not regulated in contract, 
    not regulated by another law
    adequate causality 
    intentionally
    other damages
    `, 
       
    () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"Yes", 
      "Is the responsibility for damages regulated in the contract?": "No", 
      "Is the responsibility for tort regulated by another law?": "No", 
      "Is there an adequate causality based upon the action of the person? Could a reasonable person have predicted that this action would likely lead to this type of damages?":"Yes",
      "Has the damage occurred intentionally or by negligence?": "Yes",
      "What type of damage has occurred?": "Other damages",
      
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("end_card"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" },
      
    ]));
  });

  test(
    `Path 9: 
    damage occurred, 
    contract exists, 
    damages not regulated in contract, 
    not regulated by another law
    adequate causality 
    intentionally
    property damage
    `, 
       
    () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"Yes", 
      "Is the responsibility for damages regulated in the contract?": "No", 
      "Is the responsibility for tort regulated by another law?": "No", 
      "Is there an adequate causality based upon the action of the person? Could a reasonable person have predicted that this action would likely lead to this type of damages?":"Yes",
      "Has the damage occurred intentionally or by negligence?": "Yes",
      "What type of damage has occurred?": "Property damage",
      "Has the person died?": "No", 
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("successful"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" }
    ]));
  });

  test(
    `Path 10: 
    damage occurred, 
    contract dont exists, 
    regulated by aniother law`, 
       
    () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"No", 
      "Is the responsibility for tort regulated by another law?": "Yes", 
     
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("end_card"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" } 
    ]));
  });

  test(
    `Path 11: 
    damage occurred, 
    contract dont exists, 
    not regulated by another law, 
    No adequate causality `, 
       
    () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"No", 
      "Is the responsibility for tort regulated by another law?": "No", 
      "Is there an adequate causality based upon the action of the person? Could a reasonable person have predicted that this action would likely lead to this type of damages?": "No"
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("end_card"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" } 
    ]));
  });



  test(
    `Path 12: 
    damage occurred, 
    contract dont exists, 
    not regulated by another law
    adequate causality
    not intentionally or by negligence `, 
       
    () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"No", 
      "Is the responsibility for tort regulated by another law?": "No", 
      "Is there an adequate causality based upon the action of the person? Could a reasonable person have predicted that this action would likely lead to this type of damages?": "Yes", 
      "Has the damage occurred intentionally or by negligence?":"No"
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("end_card"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" } 
    ]));
  });

  test(
    `Path 13: 
    damage occurred, 
    contract dont exists, 
    not regulated by another law,
    adequate causality,
    intentionally or by negligence ,
    personal damage,
    person died`, 
       
    () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"No", 
      "Is the responsibility for tort regulated by another law?": "No", 
      "Is there an adequate causality based upon the action of the person? Could a reasonable person have predicted that this action would likely lead to this type of damages?": "Yes", 
      "Has the damage occurred intentionally or by negligence?":"Yes",
      "What type of damage has occurred?": "Personal damage",
      "Has the person died?": "Yes",
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("successful"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" },
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K5", text: "Chapter 5, section 1 §" }, 
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K5", text: "Chapter 5, section 2 §" }
    ]));
  });

  test(
    `Path 14: 
    damage occurred, 
    contract dont exists, 
    not regulated by another law,
    adequate causality,
    intentionally or by negligence ,
    personal damage,
    person didnt die`, 
       
    () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"No", 
      "Is the responsibility for tort regulated by another law?": "No", 
      "Is there an adequate causality based upon the action of the person? Could a reasonable person have predicted that this action would likely lead to this type of damages?": "Yes", 
      "Has the damage occurred intentionally or by negligence?":"Yes",
      "What type of damage has occurred?": "Personal damage",
      "Has the person died?": "No",
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("successful"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" },
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K5", text: "Chapter 5, section 7 §" }, 
      
    ]));
  });

  test(
    `Path 15: 
    damage occurred, 
    contract dont exists, 
    not regulated by another law,
    adequate causality,
    intentionally or by negligence ,
    property damage,
    `, 
       
    () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"No", 
      "Is the responsibility for tort regulated by another law?": "No", 
      "Is there an adequate causality based upon the action of the person? Could a reasonable person have predicted that this action would likely lead to this type of damages?": "Yes", 
      "Has the damage occurred intentionally or by negligence?":"Yes",
      "What type of damage has occurred?": "Property damage",
      
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("successful"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" },
         
    ]));
  });

  test(
    `Path 16: 
    damage occurred, 
    contract dont exists, 
    not regulated by another law,
    adequate causality,
    intentionally or by negligence ,
    other damages,
    `, 
       
    () => {
    const answers = {
      "Has damage occurred?": "Yes",
      "Is there a contract between the parties?":"No", 
      "Is the responsibility for tort regulated by another law?": "No", 
      "Is there an adequate causality based upon the action of the person? Could a reasonable person have predicted that this action would likely lead to this type of damages?": "Yes", 
      "Has the damage occurred intentionally or by negligence?":"Yes",
      "What type of damage has occurred?": "Other damages",
      
    };

    const result = navigateQuestions(answers);
    
    
    expect(result.final_card).toBe("end_card"); 
   
   expect(result.legal_reasons).toEqual(expect.arrayContaining([
      { url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skadestandslag-1972207_sfs-1972-207/#K2", text: "Chapter 2, section 1 §" },
         
    ]));
  });
});
