USERNAME := davipatricio


.PHONY: build-docker

docker-build-all: build-darcy-frontend

docker-build-frontend:
	docker build . -t ${USERNAME}/darcy-frontend -f apps/darcy/Dockerfile &
