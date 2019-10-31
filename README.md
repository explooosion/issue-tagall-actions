# Issue Tagall Actions

The actions that you can use `/tagall` in comment to mention all users.

## Usage

Create `.github/workflows/main.yml`

For example: 

```yml
name: Commit Issue Commenter

on:
  issue_comment:
    types: created

jobs:
  issueComment:
    name: Comment From Issue
    runs-on: ubuntu-latest
    steps:
      - name: Use Issue TagAll Actions
        uses: explooosion/issue-tagall-actions@master
        env:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          MEMO: ${{ '(Tag by actions)' }}

```

