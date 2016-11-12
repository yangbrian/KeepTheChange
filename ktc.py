import logging

# flask framework
from flask import Flask, render_template, Response, request
app = Flask(__name__)

# amazon advertising api
from amazon.api import AmazonAPI
import amazonkeys

# constants from amazonkeys.py
amazon = AmazonAPI(AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY, AMAZON_ASSOC_TAG)

# homepage
@app.route("/")
def index():
    return render_template("index.html")

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500

if __name__ == "__main__":
    app.run()
