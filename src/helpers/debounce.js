export const debounce = (func, delay = 0) => {
    let timer;

    return function () {
        const context = this;

        clearTimeout(timer);
        timer = setTimeout(() => func.apply(context), delay);
    };
};