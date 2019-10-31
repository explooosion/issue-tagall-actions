require('dotenv').config()

const fs = require('fs')
const Octokit = require('@octokit/rest')

const octokit = new Octokit({
  auth: process.env.ACCESS_TOKEN
});

// octokit.authenticate({
//   token: process.env.ACCESS_TOKEN
// })

async function onIssueComment() {
  console.log('GITHUB_EVENT_PATH', process.env.GITHUB_EVENT_PATH)
  const evetJSON = await JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
  console.log('Payload', evetJSON)

  const OWNER = evetJSON.repository.owner.login;
  const REPOSITORY = evetJSON.repository.name;
  const NUMBER = evetJSON.issue.number;
  const BODY = evetJSON.comment.body;

  console.log('Comment Payload', BODY);

  const payload = {
    owner: OWNER,
    repo: REPOSITORY,
    issue_number: NUMBER,
    body: 'tag somebody.',
  };

  if (String(BODY).includes('/tagall')) {
    //add a comment to the issue
    await octokit.issues.createComment(payload)
      .then(({ data, headers, status }) => {
        // handle data
        console.log('BOT has send message.')
      })
  }
}

onIssueComment();
