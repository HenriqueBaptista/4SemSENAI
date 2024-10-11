import { Octokit } from "octokit";

const token = "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";

export const octokit = new Octokit({
    auth : token
})