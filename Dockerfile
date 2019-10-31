FROM node:8-slim

LABEL "com.github.actions.name"="Trigger on Issue Comment"
LABEL "com.github.actions.description"="Trigger on issue comment when call keyWord"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="green"

LABEL "repository"="https://github.com/explooosion/issue-tagall-actions"
LABEL "homepage"="https://github.com/explooosion/issue-tagall-actions"
LABEL "maintainer"="Robby <ta7382@gmail.com>"

ADD entrypoint.sh /action/entrypoint.sh
ADD package.json /action/package.json
ADD app.js /action/app.js
ADD utils.js /action/utils.js

RUN chmod +x /action/entrypoint.sh

ENTRYPOINT ["/action/entrypoint.sh"]
