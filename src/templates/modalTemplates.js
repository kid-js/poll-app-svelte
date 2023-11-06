export function getDeletePollModalTmpl(extraText = '') {
    return {
        title: 'Confirm deleting poll',
        strongTitle: extraText,
        confirmTitle: 'Delete',
    };
}