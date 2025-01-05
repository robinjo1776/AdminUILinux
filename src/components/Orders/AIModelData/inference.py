import json
import numpy as np
import joblib  # Ensure you import joblib

def model_fn(model_dir):
    try:
        # Load the model from the directory, using the correct model name
        model_path = f"{model_dir}/logistic_regression_model.joblib"
        model = joblib.load(model_path)
        return model
    except Exception as e:
        raise RuntimeError(f"Error loading the model from {model_path}: {e}")

def predict_fn(input_data, model):
    if isinstance(input_data, np.ndarray):
        # If the input is a NumPy array, convert it to a list
        input_data = input_data.tolist()
    elif isinstance(input_data, bytes):
        # If the input is in bytes, decode it to a string
        input_data = input_data.decode('utf-8')
    
    try:
        # Parse the input data
        parsed_input = json.loads(input_data)
    except json.JSONDecodeError as e:
        raise ValueError(f"Error parsing JSON: {str(e)}")

    # Extract features (assuming 'features' key in the parsed input)
    features = parsed_input.get('features', [])

    # Reshape the data to ensure it's 2D (as required by sklearn models)
    features_array = np.array(features).reshape(1, -1)  # Reshaping to 2D array

    # Process the parsed input data for prediction
    prediction = model.predict(features_array)
    return prediction
