#!/bin/bash

## check commands used in this bash file are all installed
check_tools () {
	if ! [ -x "$(command -v $1)" ]; then
		echo 'Error:' $1 'is not installed.' >&2
		return 1
	fi
	return 0
}

declare -a tools=( 'docker' 'git' )
check_result=0
for tool in "${tools[@]}"
do
	check_tools $tool
	if [ $? -eq 1 ]; then
		check_result=$?
	fi
done

declare -a commands=("build")

commit_date="$(git show -s --format=%ci --date=short)"
version=v"$(git log -1 --pretty=format:%h)"-"$(echo $commit_date | cut -d' ' -f1 | tr "-" .)"

user=tingkai
project_name=resign

backend_image_name=$user/$project_name-backend
frontend_image_name=$user/$project_name-frontend

container_prefix=$project_name
backend_container_name=$container_prefix-backend
frontend_container_name=$container_prefix-frontend

if [ "$1" = 'build' ]; then
	if [ "$2" = 'backend' ]; then
		cd server
		docker container stop $backend_container_name
		docker container rm $backend_container_name
		cd ..
		cd backend
		docker build --no-cache . --rm --tag=$backend_image_name:latest --tag=$backend_image_name:$version
		docker push $backend_image_name:latest
		docker push $backend_image_name:$version
		docker image rm $backend_image_name:latest $backend_image_name:$version
		cd ..
	elif [ "$2" = 'frontend' ]; then
		cd server
		docker container stop $frontend_container_name
		docker container rm $frontend_container_name
		cd ..
		cd frontend
		docker build --no-cache . --rm --tag=$frontend_image_name:latest --tag=$frontend_image_name:$version
		docker push $frontend_image_name:latest
		docker push $frontend_image_name:$version
		docker image rm $frontend_image_name:latest $frontend_image_name:$version
		cd ..
	fi

else
	echo ""
	echo "usage: ./execute.sh [ARGS]"
	echo ""
	echo "ARGS:"
	echo -e "  build backend          use docker build backend spring boot image"
	echo -e "  build frontend         use docker build frontend react app image"
fi

exit 0
