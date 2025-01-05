import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from joblib import dump

# Sample training data
data = pd.DataFrame({
    'created_at': pd.date_range(start='2024-01-01', periods=100, freq='H'),
    'status': ['shipped'] * 50 + ['pending'] * 50
})

data['status_encoded'] = pd.factorize(data['status'])[0]
data['year'] = data['created_at'].dt.year
data['month'] = data['created_at'].dt.month
data['day_of_week'] = data['created_at'].dt.dayofweek
data['hour'] = data['created_at'].dt.hour
data['day'] = data['created_at'].dt.day
data['timestamp'] = data['created_at'].astype(int) / 10**9

# Features and labels
X = data[['timestamp', 'status_encoded', 'year', 'month', 'day_of_week', 'hour', 'day']]
y = data['status_encoded']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# Train logistic regression model
model = LogisticRegression()
model.fit(X_train_scaled, y_train)

# Save the model and scaler
dump(model, 'logistic_regression_model.joblib')
dump(scaler, 'scaler.joblib')
