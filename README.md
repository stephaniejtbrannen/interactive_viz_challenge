# Interactive_Visualizations


conda create -n belly_button_biodiversity_env python=3.6
source activate belly_button_biodiversity_env

pip install gunicorn
pip install psycopg2
pip install flask
pip install flask-sqlalchemy
pip install pandas

# Test by initializing DB
python initdb.py

# Run app
FLASK_APP=Belly_Button_Biodiversity/app.py flask run

# save package name and version to file
pip freeze > requirements.txt

# pet_pals is the name of our Python package (due to __init__.py file)
echo “web: gunicorn Belly_Button_Biodiversity.app:app” > Procfile

# To initialize in Heroku
heroku run python initdb.py# interactive_viz_challenge
