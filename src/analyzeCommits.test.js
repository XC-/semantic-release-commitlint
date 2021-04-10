const test = require("ava");
const analyzeCommits = require("./analyzeCommits");

const doNotFailOnWarningConfig = {};
const failOnWarningConfig = {
    failOnWarning: true
};

const contextCommons = {
    logger: {
        success: console.log,
        error: console.log
    },
};

const validCommit = {
    subject: "fix(component): added new tests",
    message:
        `fix(component): added new tests

The component now has tests`
};

const invalidCommit = {
    subject: "Completely invalid according to conventional commits",
    message: "Completely invalid according to conventional commits"
};

const validButWarning = {
    subject: "fix: something iffy",
    message: "fix: something iffy\nin the body"
};

test("Single commit (valid)", async t => {
    await t.notThrowsAsync(analyzeCommits(doNotFailOnWarningConfig, {
        ...contextCommons,
        commits: [validCommit]
    }));
});

test("Single commit (invalid)", async t => {
    await t.throwsAsync(analyzeCommits(doNotFailOnWarningConfig, {
        ...contextCommons,
        commits: [invalidCommit]
    }));
});

test("Single commit (warning, do not fail)", async t => {
    await t.notThrowsAsync(analyzeCommits(doNotFailOnWarningConfig, {
        ...contextCommons,
        commits: [validButWarning]
    }));
});

test("Single commit (warning, fail)", async t => {
    await t.throwsAsync(analyzeCommits(failOnWarningConfig, {
        ...contextCommons,
        commits: [validButWarning]
    }));
});

test("Two commits (valid, warning) should not fail", async t => {
    await t.notThrowsAsync(analyzeCommits(doNotFailOnWarningConfig, {
        ...contextCommons,
        commits: [validCommit, validButWarning]
    }));
});

test("Two commits (valid, invalid) should fail", async t => {
    await t.throwsAsync(analyzeCommits(doNotFailOnWarningConfig, {
        ...contextCommons,
        commits: [validCommit, invalidCommit]
    }));
});

test("Two commits (valid, warning) should fail (failOnWarning true)", async t => {
    await t.throwsAsync(analyzeCommits(failOnWarningConfig, {
        ...contextCommons,
        commits: [validCommit, validButWarning]
    }));
});
