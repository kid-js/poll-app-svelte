export const formFields = [
    {
        field: 'question',
        label: 'Question',
        minLength: 3,
        errorMsg: 'must be more than 2 symbols',
    },
    {
        field: 'answerA',
        label: 'Answer A',
        minLength: 1,
        errorMsg: 'cannot be empty',
    },
    {
        field: 'answerB',
        label: 'Answer B',
        minLength: 1,
        errorMsg: 'cannot be empty',
    },
    {
        field: 'answerC',
        label: 'Answer C',
        minLength: 1,
        errorMsg: 'cannot be empty',
    },
    {
        field: 'answerD',
        label: 'Answer D',
        minLength: 1,
        errorMsg: 'cannot be empty',
    },
    {
        field: 'answerE',
        label: 'Answer E',
        minLength: 1,
        errorMsg: 'cannot be empty',
    },
];

export const optionsTags = ['A', 'B', 'C', 'D', 'E'];

export const defaultFieldsNum = 3;