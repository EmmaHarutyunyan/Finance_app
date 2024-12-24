## Installation

### Prerequisites
Make sure you have the following installed:
- Python 3.8+
- pip (Python package manager)
- Virtualenv (recommended for virtual environments)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/EmmaHarutyunyan/Finance_app.git
   cd Finance_app
   ```

2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:

   Create a `.env` file in the project root and add:
   ```bash
   SECRET_KEY=your_secret_key
   API_URL=your_api_url_from_exchangerate-api.com
   FINNHUB_API_URL=api_url
   FINNHUB_API_KEY=your_api_key
   COINGECKO_API_URL=api_url
   ```

5. Apply migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

7. Run the server:
   ```bash
   python manage.py runserver
   ```

## Screenshots and Video

Below are the video and some screenshots from the project:

- [Project Video](https://github.com/user-attachments/assets/0952e093-b650-4dfe-9231-2cd3807ea57a)

  ![Currency Exchange](https://github.com/user-attachments/assets/8e27722a-2b69-4f2a-8ae1-30cae3412419)

  ![Cryptocurrencies](https://github.com/user-attachments/assets/a40c30d9-d6d5-44a3-a335-f29d9807bb4e)
