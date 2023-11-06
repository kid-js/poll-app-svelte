import {
    defaultFieldsNum,
    formFields,
    optionsTags,
} from '../config/config';

export function getDefaultBlankData(fieldsNum = defaultFieldsNum) {
    const resultObj = {};

    for (let i = 0; i < fieldsNum; i++) {
        resultObj[formFields[i].field] = '';
    }

    return resultObj;
}

export function getInitialPollVotes(optionsNum = defaultFieldsNum - 1) {
    const resultObj = {};

    for (let i = 0; i < optionsNum; i++) {
        resultObj['votes' + optionsTags[i]] = 0;
    }

    return resultObj;
}