import logging

# flask framework
from flask import Flask, render_template, Response, request, jsonify
app = Flask(__name__)

# amazon advertising api
from amazon.api import AmazonAPI
import amazonkeys

# constants from amazonkeys.py
amazon = AmazonAPI(
    amazonkeys.AMAZON_ACCESS_KEY,
    amazonkeys.AMAZON_SECRET_KEY,
    amazonkeys.AMAZON_ASSOC_TAG
)

# homepage
@app.route("/")
def index():
    return render_template("index.html")

## Look up Amazon product info by ASIN
@app.route('/amazon/<prod_id>')
def amazon_search(prod_id) :
    product = amazon.lookup(ItemId=prod_id)
    result = {
        'name': product.title,
        'price': product.price_and_currency[0],
        'currency': product.price_and_currency[1]
    }
    return jsonify(**result)

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500

if __name__ == "__main__":
    app.run(debug=True)
