
export const mockQuizState = {
    withoutEdit: {
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
    },
    withEdit: {
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
}
