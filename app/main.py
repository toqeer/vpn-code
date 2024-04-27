import requests
from model.cnn_model import create_cnn_model, process_data

# Function to retrieve data from the blockchain
def get_blockchain_data():
    # Replace with the actual API endpoint
    url = 'http://your-blockchain-node/api/vpn-data'
    response = requests.get(url)
    if response.status_code == 200:
        return process_data(response.json())
    else:
        return None

def main():
    data = get_blockchain_data()
    if data is not None:
        X_train, y_train = data['features'], data['labels']
        input_shape = X_train.shape[1:]  # Shape of the input data

        model = create_cnn_model(input_shape)
        model.fit(X_train, y_train, epochs=10, batch_size=64)

        # Evaluate the model on test VPN forensics data
        X_test, y_test = data['test_features'], data['test_labels']
        evaluation = model.evaluate(X_test, y_test)
        print(f"Test Loss: {evaluation[0]}, Test Accuracy: {evaluation[1]}")

        predictions = model.predict(X_test)
        predicted_classes = [1 if p > 0.5 else 0 for p in predictions]
        # Compare predicted_classes with y_test to further analyze model performance

if __name__ == '__main__':
    main()
