# Internet Speed Test with speedtest.net speedtest-cli

## About
Just a simple app I made this to test my internet speed over time on my local machine for a day. It displays all results on one page so it might get slow if you run it for a long time. (can delete the json to start fresh).

## speedtest-cli
Install speedtest-cli from [speedtest.net](https://www.speedtest.net/apps/cli)

## CRON
Create a cron job
```cron
* * * * * /path/speedtest.sh
```
## BASH script
Change the paths in the script to match your system.

Make sure the script is executable
```bash
chmod +x speedtest.sh
```

## Create JSON files
Create the JSON files in the same directory as the script
```bash
touch results.json
touch results-clean.json
```

## Run the web
Run the web page to view the results

Wait a minute for the cron job to run and update the JSON files

Run npm install to install http-server or use your own web server
```bash
npm install
npm start
```