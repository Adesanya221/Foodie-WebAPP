@echo off
echo Creating placeholder images...
cd foodie-web-app
call npm run create-placeholders
echo Starting development server...
call npm run dev 