#!/bin/bash

if [ ! -f "./.env" ]; then
    cp ./.env.example ./.env
fi

npm ci --silent

npx prisma migrate dev

npm run live-reload