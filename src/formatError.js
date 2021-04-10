const format = require("@commitlint/format").default;

module.exports = (results) => {
    return format({
        results: results
    }, {color: true});
};
