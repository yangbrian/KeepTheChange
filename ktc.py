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

# GET - return json of all transactions of that user
@app.route("/transactions/<user_id>", methods=['GET'])
def get_transactions(user_id):

    result = firebase.get('/' + user_id, None)
    transactions = {
        'user_data': result
    }
    return jsonify(**transactions), 200, {'Content-Type': 'application/json; charset=utf-8'}

# GET - get amount of one category
@app.route("/transactions/<user_id>/<category>", methods=['GET'])
def get_transactions_category(user_id, category):

    result = firebase.get('/' + user_id + '/' + category, None)
    transactions = {
        category: result
    }
    return jsonify(**transactions), 200, {'Content-Type': 'application/json; charset=utf-8'}

# POST - accept one new transaction for that user
@app.route("/transactions/<user_id>", methods=['POST'])
def put_transaction(user_id):

    result = firebase.put(
                '/' + user_id + '/',
                request.form['category'], # key
                int(request.form[category]) # value
            )
    return "{ \"success\" : true }", 200, {'Content-Type': 'application/json; charset=utf-8'}

# POST - accept one new transaction for that user
# Same as put_transaction but with category in URL
@app.route("/transactions/<user_id>/<category>", methods=['POST'])
def put_transaction_category(user_id, category):

    result = firebase.put(
                '/' + user_id + '/',
                category, # key
                int(request.form[category]) # value
            )
    return "{ \"success\" : true }", 200, {'Content-Type': 'application/json; charset=utf-8'}

# DELETE - delete transaction
@app.route("/transactions/<user_id>/<category>", methods=['DELETE'])
def delete_transation(user_id, category):

    firebase.delete('/' + user_id + '/', category)

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
