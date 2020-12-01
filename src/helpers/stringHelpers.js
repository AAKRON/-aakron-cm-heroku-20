const stringHelpers  = {};

stringHelpers.extractLeadingNumber = (str) => {
    const GLOBAL_WHITE_SPACE = /\s/g;
    str = str.replace(GLOBAL_WHITE_SPACE, '');
    return parseInt(str.slice(0, str.indexOf('-')), 10);
};

export { stringHelpers };


