import { writable } from 'svelte/store';
import { defaultFieldsNum } from '../config/config';
import { getDefaultBlankData } from '../helpers/defaultDataBuilders';

const initialPollsData = [
    {
        id: 'U-LGf0Ju15yHsFqfzPNF9',
        optionsNum: 3,
        question: 'Should a man wear a mustache?',
        answerA: 'The walrus is the best',
        answerB: 'Only if you are F. Nietzsche',
        answerC: 'Not in this century',
        votesA: 6,
        votesB: 30,
        votesC: 0,
    },
    {
        id: 'Q-bIyKIQbJ9RsUZvDXdrK',
        optionsNum: 3,
        question: 'New York City or Dublin?',
        answerA: 'Tokyo?!',
        answerB: 'Bourbon on the rocks',
        answerC: 'I am lonely lemming in space',
        votesA: 0,
        votesB: 0,
        votesC: 0,
    },
];

function pollsStore() {
    const { subscribe, update } = writable(initialPollsData);

    return {
        subscribe,

        add(poll = {}) {
            update(polls => [poll, ...polls]);
        },

        upVote(id, optionTag = '') {
            update(polls => {
                const pollsCopy = [...polls];

                for (const poll of pollsCopy) {
                    if (poll.id === id) {
                        poll['votes' + optionTag]++;
                        break;
                    }
                }
                return pollsCopy;
            });
        },

        delete(id) {
            update(polls => polls.filter(poll => poll.id !== id));
        },
    };
}

export const polls = pollsStore();

export const formData = writable({
    fieldsNum: defaultFieldsNum,
    formInputs: getDefaultBlankData(),
});