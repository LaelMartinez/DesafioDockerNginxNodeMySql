#!/bin/bash

# Script to delete all Docker images

# Prompt user for confirmation
read -p "This will delete all Docker images. Are you sure you want to continue? (y/n): " choice
if [ "$choice" != "y" ]; then
  echo "Aborted."
  exit 0
fi

echo "Parando os containers."
docker compose stop  
docker compose down
docker stop $(docker ps -a -q)

# Delete all Docker images
docker rmi -f $(docker images -a -q)

# Run the Docker system prune command
docker system prune --all --force

echo "All Docker images have been deleted."