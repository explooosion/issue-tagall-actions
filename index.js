require('dotenv').config();

const fs = require('fs');
const Octokit = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.ACCESS_TOKEN
});

let evetJSON = {};

/**
 * Comment to issue
 * @param {object} payload
 */
async function onIssueComment(payload) {
  return await octokit.issues.createComment(payload)
    .then(({ status }) => status)
    .catch(({ status }) => status);
}

/**
 * Get issue participants
 * @param {object} payload
 * @param {number} issue_number
 */
async function onIssueGetUsers(payload, issue_number) {
  return await octokit.issues.listCommentsForRepo(payload)
    .then(({ data }) =>
      data
        .filter(({ issue_url }) => String(issue_url).split('/issues/')[1] === String(issue_number))
        .map(({ user }) => `@${user.login}`)
        .filter((user, index, arr) => arr.indexOf(user) === index)
        .join(' '));
}

async function work() {
  evetJSON = await JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  console.log('GITHUB_EVENT_PATH', process.env.GITHUB_EVENT_PATH);
  console.log('Payload', evetJSON);

  const owner = evetJSON.repository.owner.login;
  const repo = evetJSON.repository.name;
  const issue_number = evetJSON.issue.number;
  const BODY = evetJSON.comment.body;

  const users = await onIssueGetUsers({ owner, repo }, issue_number);

  if (String(BODY).includes('/tagall')) {
    const payload = {
      owner,
      repo,
      issue_number,
      body: `${users}${process.env.MEMO}`,
    };
    const status = await onIssueComment(payload, users);
    console.log(status);
  } else {
    console.log(0);
  }
}

work();
