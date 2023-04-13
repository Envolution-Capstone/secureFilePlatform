

setup:
	cd ./server && npm install -y --force --silent
	cd ./client && npm install -y --force --silent

run:
	cd ./server && npm start &
	cd ./client && npm start