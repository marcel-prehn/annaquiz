build:
   cd annaquiz-ui
   npm run build
   cd ..
   GOOS=linux
   GOARCH=amd64
   GO111MODULE=on
   GOBIN=${PWD}/functions go run .
