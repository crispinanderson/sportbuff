export const mockApiResponse = JSON.parse(`{"response_code":0,"results":[{"category":"Sports","type":"multiple","difficulty":"medium","question":"Which of these teams is a member of the NHL era?","correct_answer":"Philadelphia Flyers","incorrect_answers":["New York Rangers","Toronto Maple Leafs","Boston Bruins"]}]}`);
export const mockStateNullEdit = {
    edit: null,
    questions: [{
        category: "Sports",
        correct_answer: "Philadelphia Flyers",
        difficulty: "medium",
        incorrect_answers: ["New York Rangers", "Toronto Maple Leafs", "Boston Bruins"],
        question: "Which of these teams is a member of the NHL era?",
        type: "multiple",
    },
    {
        category: "Random",
        correct_answer: "Some Answer",
        difficulty: "medium",
        incorrect_answers: ["No answer", "Don't know", "Fred Flintstone"],
        question: "What is the answer to some question?",
        type: "multiple",
    }
    ]
}
export const mockStateWithEdit = {
    edit: {
        index: 0,
        edited: true,
        category: "Sports",
        correct_answer: "The Philadelphia Flyers",
        difficulty: "medium",
        incorrect_answers: ["New York Rangers", "Toronto Maple Leafs", "Boston Bruins"],
        question: "Which of these teams is a member of the NHL era?",
        type: "multiple",
    },
    questions: [{
        category: "Sports",
        correct_answer: "Philadelphia Flyers",
        difficulty: "medium",
        incorrect_answers: ["New York Rangers", "Toronto Maple Leafs", "Boston Bruins"],
        question: "Which of these teams is a member of the NHL era?",
        type: "multiple",
    },
    {
        category: "Random",
        correct_answer: "Some Answer",
        difficulty: "medium",
        incorrect_answers: ["No answer", "Don't know", "Fred Flintstone"],
        question: "What is the answer to some question?",
        type: "multiple",
    }
    ]
}