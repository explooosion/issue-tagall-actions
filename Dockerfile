FROM node:lts-slim

LABEL "com.github.actions.name"="Trigger on Issue Comment"
LABEL "com.github.actions.description"="Trigger on issue comment when call keyWord"
LABEL "com.github.actions.icon"="box"
LABEL "com.github.actions.color"="green"

LABEL "repository"="https://github.com/explooosion/issue-tagall-actions"
LABEL "homepage"="https://github.com/explooosion/issue-tagall-actions"
LABEL "maintainer"="Robby <ta7382@gmail.com>"

ADD entrypoint.sh /entrypoint.sh
ADD package.json /package.json
ADD index.js /index.js

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
