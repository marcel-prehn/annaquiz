echo "Building UI"
npm install --prefix ui/
npm run build --prefix ui/
echo "Building Backend"
GOBIN=$(pwd)/functions go install ./...
echo "Copying UI"
mkdir -p functions/ui
cp -r ui/build functions/ui/