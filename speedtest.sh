#!/bin/bash

# Replace this with the path to your speedtest-cli
SPEEDTEST="/usr/local/bin/speedtest-cli"

# Replace this with the path where you want to save the results
RESULTS="/Users/jeffreyruoss/Projects/speedtest/results.json"

# Replace this with the path where you want to save the cleaned results
CLEAN_RESULTS="/Users/jeffreyruoss/Projects/speedtest/results-clean.json"

# Run the speedtest-cli command, save the output
$SPEEDTEST --json >> $RESULTS

# Clean up the results into proper JSON format
echo '[' > $CLEAN_RESULTS
sed '$!s/$/,/' $RESULTS >> $CLEAN_RESULTS
echo ']' >> $CLEAN_RESULTS