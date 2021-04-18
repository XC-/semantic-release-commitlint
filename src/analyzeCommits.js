const load = require("@commitlint/load").default;
const lint = require("@commitlint/lint").default;

const formatError = require("./formatError");

const configuration = {
    extends: ["@commitlint/config-conventional"]
};

async function analyzeCommits(pluginConfig, context) {
    let verified = true;

    const {failOnWarning, rules, warnOnly} = pluginConfig;
    const {logger} = context;

    // This should never happen! #tinfoilhat
    if (!Object.prototype.hasOwnProperty.call(context, "commits")) {
        return;
    }
    const {commits} = context;

    // The commits list might be empty, though...
    if (commits.length === 0) {
        return;
    }
    const options = await load({ ...configuration, rules });
    let results = [];
    if (warnOnly) {
        for (const key in options.rules) {
            options.rules[key][0] = Math.min(options.rules[key][0], 1);
        }
    }
    for (const commit of commits) {
        const result = await lint(
            commit.message,
            options.rules,
            options.parserPreset ? {parserOpts: options.parserPreset.parserOpts} : {}
        );
        results.push(result);
        if (!result.valid || (failOnWarning && result.warnings.length > 0)) {
            verified = false;
        }
    }
    if (!verified) {
        logger.error("semantic-release-commitlint: Commit validation failed!");
        throw new Error(formatError(results));
    }
    logger.success("semantic-release-commitlint: Commits validated successfully!");
}

module.exports = analyzeCommits;

// Semantic release index.js rivi 217 logErrors. logittaa kirjain kerrallaan jos stringi
