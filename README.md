# Keep The Change
[YHack 2016](http://yhack.org) Project

College students tend to spend too much money on food, clothing, and textbooks. (Insert cool description here)

## Requirements
* [Python 3.5.2](https://www.python.org)
* [Virtualenv](https://virtualenv.pypa.io/en/stable/)
* [Google Chrome](https://www.google.com/chrome)

## Getting Started
Keep The Change is a Python [Flask](http://flask.pocoo.org) app and a Chrome extension.

Start by setting the constants in ```amazonkeys.py``` to match your [Amazon Associates and Advertising API](http://docs.aws.amazon.com/AWSECommerceService/latest/DG/CHAP_GettingStarted.html) accounts.

To run the Flask app, [create a virtualenv](https://virtualenv.pypa.io/en/stable/userguide/#usage), then run the following:

```
pip install -r requirements.txt
python ktc.py
```

## RESTful operations
Until we implement authentication, the user ID is not taken into account. Just use whatever for now.

***GET /transactions/1*** - Get all category amounts of user 1

***GET /transactions/1/food*** - Get the amount for the food category of user 1

***POST /transactions/1*** - Insert or update a new category (post form data - 'amount' and 'category')

***POST /transactions/1/food*** - Insert or update the food category with an amount (post form data - 'amount')

***DELETE /transactions/1/food*** - Delete food category from user 1

The expected success response for all queries is a JSON document with a 200 OK status code.

## Amazon
The other component of this app is finding cheaper alternatives to products users purchase on Amazon.

***GET /amazon/B000OOYECC*** - Get name, price, and cheaper alternative to ASIN [B000OOYECC](https://www.amazon.com/gp/product/B000OOYECC).

## Try it out
Keep The Change is available at [https://keepthechange.herokuapp.com/](https://keepthechange.herokuapp.com/).
