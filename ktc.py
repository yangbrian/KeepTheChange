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

from firebase import firebase
firebase = firebase.FirebaseApplication('https://keep-the-change.firebaseio.com', None)

# homepage
@app.route("/")
def index():
    return render_template("index.html")

# GET - return json of all user of that user
@app.route("/user/<user_id>", methods=['GET'])
def get_user(user_id):

    result = firebase.get('/' + user_id, None)
    user = {
        'user_data': result
    }
    return jsonify(**user), 200, {'Content-Type': 'application/json; charset=utf-8'}

# GET - get amount of one property
@app.route("/user/<user_id>/<property>", methods=['GET'])
def get_user_property(user_id, property):

    result = firebase.get('/' + user_id + '/' + property, None)
    user = {
        property: result
    }
    return jsonify(**user), 200, {'Content-Type': 'application/json; charset=utf-8'}

# POST - update budget
# Input - Raw JSON in request body
@app.route("/user/<user_id>/total_budget", methods=['POST'])
def update_user_budget(user_id):
    result = firebase.put(
                '/' + user_id + '/',
                'total_budget', # key
                request.get_json(force=True) # value
            )
    return "{ \"success\" : true }", 200, {'Content-Type': 'application/json; charset=utf-8'}

# POST - add new transaction
# Input - Encoded form data (4 fields - company, category, cost, date)
# Each transaction will then be randomly assigned an ID
@app.route("/user/<user_id>/transactions", methods=['POST'])
def put_user_transaction(user_id):

    data = {
        'company': request.form['company'],
        'category': request.form['category'],
        'cost': request.form['cost'],
        'date': request.form['date']
    }

    result = firebase.post('/' + user_id + '/transactions', data)
    return "{ \"success\" : true }", 200, {'Content-Type': 'application/json; charset=utf-8'}

# DELETE - delete transaction
@app.route("/user/<user_id>/transactions/<transaction_id>", methods=['DELETE'])
def delete_transation(user_id, transaction_id):

    firebase.delete('/' + user_id + '/transactions/', transaction_id)

    return "{ \"success\" : true }", 200, {'Content-Type': 'application/json; charset=utf-8'}

## Look up Amazon product info by ASIN
@app.route('/amazon/<prod_id>')
def amazon_search(prod_id) :
    product = amazon.lookup(ItemId=prod_id)
    item = {'offer_id': product.offer_id, 'quantity': 1}
    cart = amazon.cart_create(item, ResponseGroup='Cart,CartSimilarities')
    # cart = amazon.cart_create(item)
    print(cart.cart_id)
    similars = cart._safe_get_element('Cart.SimilarViewedProducts.SimilarViewedProduct')

    # find cheapest alternative
    alt_items = []
    for similar in similars:
        alt_items.append(similar.ASIN);

    # bulk lookup names and prices of all alt_items
    alt_products = amazon.lookup(ItemId=','.join(map(str, alt_items)))

    # determine if any item is lower prices
    lowest_price_item = product # initially the original item
    for alt_product in alt_products:
        if alt_product.price_and_currency[0] < lowest_price_item.price_and_currency[0]:
            lowest_price_item = alt_product

    # was there a cheaper alternative?
    cheaper_found = True
    if lowest_price_item == product:
        cheaper_found = False

    result = {
        'asin': product.asin,
        'name': product.title,
        'price': '%.2f'%(product.price_and_currency[0]),
        'currency': product.price_and_currency[1],
        'cheaper_available': cheaper_found
    }

    if cheaper_found:
        result['alternative'] = {
            'asin': lowest_price_item.asin,
            'name': lowest_price_item.title,
            'price': '%.2f'%(lowest_price_item.price_and_currency[0]),
            'currency': lowest_price_item.price_and_currency[1],
        }
    return jsonify(**result), 200, {'Content-Type': 'application/json; charset=utf-8'}

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500

if __name__ == "__main__":
    app.run(debug=True)
