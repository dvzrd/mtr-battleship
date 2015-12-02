let relativeFormat = (date, format) => {
    return moment(date, format).fromNow();
};

DateHelpers = {
    relativeFormat: relativeFormat
};