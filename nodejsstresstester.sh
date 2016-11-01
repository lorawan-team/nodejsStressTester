#!/bin/bash

DATE="$(date)"
COUNT=0
echo "multithreading test " > output.txt
while [ $COUNT -lt 20 ]; do
 curl http://localhost:8000 >> output.txt &
 curl http://localhost:8000 >> output.txt &
 curl http://localhost:8000 >> output.txt &
 curl http://localhost:8000 >> output.txt &
 curl http://localhost:8000 >> output.txt &
 curl http://localhost:8000 >> output.txt &
 curl http://localhost:8000 >> output.txt &
 curl http://localhost:8000 >> output.txt
 let COUNT=COUNT+1
done
echo "Started testing at $DATE"
echo "Finished testing at $(date)"
