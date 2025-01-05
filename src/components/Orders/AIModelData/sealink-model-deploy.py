import sagemaker
from sagemaker import get_execution_role
from sagemaker.sklearn import SKLearnModel
import pandas as pd
import json
from datetime import datetime

# 1. Set up the SageMaker environment
role = get_execution_role()

# Specify framework version and Python version
model = SKLearnModel(
    model_data='s3://logistics-data-sealink/logistic_regression_model.tar.gz',
    role=role,
    entry_point='inference.py',
    framework_version='1.0-1',
    py_version='py3',
)

# 2. Deploy the model to an endpoint
predictor = model.deploy(instance_type='ml.t2.xlarge', initial_instance_count=1)

# 3. Prepare new data
new_order = {
    'created_at': '2024-12-28T14:14:57.156521',
    'status': 'shipped'
}

# Process input
new_order['created_at'] = pd.to_datetime(new_order['created_at'])
new_order['year'] = new_order['created_at'].year
new_order['month'] = new_order['created_at'].month
new_order['day_of_week'] = new_order['created_at'].dayofweek
new_order['hour'] = new_order['created_at'].hour
new_order['day'] = new_order['created_at'].day
new_order['timestamp'] = new_order['created_at'].timestamp()
new_order['status_encoded'] = pd.factorize([new_order['status']])[0][0]

# Prepare feature array
X_new = [
    [
        new_order['timestamp'],
        new_order['status_encoded'],
        new_order['year'],
        new_order['month'],
        new_order['day_of_week'],
        new_order['hour'],
        new_order['day']
    ]
]

X_new_json = json.dumps({"features": [float(value) for value in X_new[0]]})
response = predictor.predict(X_new_json)


# Parse and print the response
print("Prediction:", response)

# 5. Clean up
predictor.delete_endpoint()
