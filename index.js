require('dotenv').config()

const fs = require('fs')
const Octokit = require('@octokit/rest')

const octokit = new Octokit();

octokit.authenticate({
  token: process.env.ACCESS_TOKEN
})

async function onIssueComment() {
  console.log('GITHUB_EVENT_PATH', process.env.GITHUB_EVENT_PATH)
  const evetJSON = await JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
  const eventCommnet = evetJSON.comment;
  console.log('Comment Payload', eventCommnet);

}

onIssueComment();

// octokit.issues.listCommentsForRepo({
//   owner: 'explooosion',
//   repo: 'Agm-Direction',
//   sort: 'created'
// }).then(({ data }) => {
//   console.log(data);
// })

// octokit.repos
//   .listForOrg({
//     org: "octokit",
//     type: "public"
//   })
//   .then(({ data }) => {
//     console.log(data);
//   });
