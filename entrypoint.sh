#!/bin/bash

echo "starting bash..."
echo $(date)

echo "current working directory is " $PWD
cd ../../
echo $(date)

yarn
echo $(date)

yarn start
echo $(date)
