#!/bin/bash
cd /home/admin/phone
git pull origin exchange
npm i
npm run prod
pm2 restart ex
exit
