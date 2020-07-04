#!/bin/sh

GREEN=$'\e[0;32m'
RED=$'\e[0;31m'
PINK=$'\e[0;35m'
RESET=$'\e[0m'

docker_menu () {
  local PS3="${RESET}${PINK}Select a container and press enter: ${RESET}"
  local options=("App" "Nginx" "MySQL" "Cancel")
  local opt
  select opt in "${options[@]}"
  do
    case "$REPLY" in
        1 )
            echo "${RED}Connecting to App Container...${RESET}"
            docker exec -it prpl_node bash
            break
            ;;
        2 )
            echo "${RED}Connecting to Nginx Container...${RESET}"
            docker exec -it prpl_nginx bash
            break
            ;;
        3 )
            echo "${RED}Connecting to MySQL Container...${RESET}"
            docker exec -it prpl_mysql bash
            break
            ;;
        4 )
            echo "${RED}Canceled${RESET}"
            break
            ;;
        *) echo "This is not a valid option, retry";;
      esac
  done
}

PS3="${RESET}${PINK}Select an option and press enter: ${RESET}"
OPTIONS=("Start Containers" "Stop Containers" "Install Server NPM Packages" "Connect to a Container" "Copy Server Files" "Cancel");
select opt in "${OPTIONS[@]}"; do
    case "$REPLY" in
        1 )
            echo "${RED}Starting Docker Containers...${RESET}"
            docker-compose up -d;
            break
            ;;
        2 )
            echo "${RED}Stopping Docker Containers...${RESET}"
            docker-compose down;
            break
            ;;
        3 )
            docker_menu
            break
            ;;
        4 )
            docker exec -it prpl_node bash
            break
            ;;
        5 )
            echo "${RED}Copying Server Files...${RESET}"
            cp server/package.json server/ormconfig.js server/package-lock.json server/.env server/build/
            echo "${GREEN}Done${GREEN}"
            break
            ;;
        6 )
            echo "${RED}Canceled${RESET}"
            break
            ;;
        *) echo "This is not a valid option, retry";;
    esac
done

