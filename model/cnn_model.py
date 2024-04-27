import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, Dropout

def process_data(data):
    # Placeholder function to convert data to the appropriate format for CNN
    # Example: Assuming data is a list of dicts containing 'image' and 'label'
    processed_data = {'features': [], 'labels': []}
    for item in data:
        processed_data['features'].append(item['image'])  # This should be pre-processed images
        processed_data['labels'].append(item['label'])
    return processed_data

def create_cnn_model(input_shape):
    model = Sequential()
    model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=input_shape))
    model.add(Conv2D(64, (3, 3), activation='relu'))
    model.add(Flatten())
    model.add(Dense(128, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(1, activation='sigmoid'))

    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    return model
