# TensorX

AI-powered placement risk and career predictor for students. This application uses machine learning models to predict placement probabilities, salary expectations, and risk assessments based on student profiles.

## Features

- Predict placement chances at 3, 6, and 12 months
- Salary estimation with confidence intervals
- Risk assessment and timeline predictions
- SHAP-based explainability for model decisions
- AI-generated summaries (requires Anthropic API key)
- Cohort benchmarking and percentile rankings
- Personalized recommendations and tips

## Installation

1. Clone or download the repository.

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. (Optional) Set up Anthropic API key for AI summaries:
   ```bash
   export ANTHROPIC_API_KEY=your_api_key_here
   ```
   Or create a `.env` file in the root directory with:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

## Setup

1. Generate synthetic student data:
   ```bash
   python scripts/generate_data.py
   ```

2. Precompute cohort statistics:
   ```bash
   python scripts/precompute_cohorts.py
   ```

3. Train the machine learning models:
   ```bash
   python scripts/train_model.py
   ```

## Running the Application

1. Start the backend API server:
   ```bash
   python backend/api.py
   ```
   The server will run on http://127.0.0.1:5000

2. Open the frontend in your web browser:
   - Open `frontend/index.html` in your browser
   - Or serve it with a local web server if needed

## API Endpoints

- `GET /health` - Health check
- `POST /predict` - Main prediction endpoint
- `POST /whatif` - What-if scenario analysis

## Project Structure

- `backend/` - Flask API server
- `frontend/` - HTML/CSS/JavaScript frontend
- `data/` - Student data CSV
- `models/` - Trained ML models and statistics
- `scripts/` - Data generation and model training scripts
- `config/` - Configuration mappings (if exists)

## Requirements

- Python 3.7+
- Flask
- Scikit-learn
- Pandas
- SHAP
- Anthropic (for AI summaries)