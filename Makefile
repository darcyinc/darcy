USERNAME := davipatricio

.PHONY: docker-build-all

docker-build-all: docker-build-frontend

docker-build-frontend:
	docker build . -t ${USERNAME}/darcy-frontend -f apps/darcy/Dockerfile &
