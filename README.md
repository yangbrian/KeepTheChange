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

***GET /user/1*** - Get all information of user 1

***GET /user/1/transactions*** - Get the list of transactions of user 1

***POST /user/1/total_budget*** - Update user 1's budget. Expects raw JSON as request body.

Sample request body:

```
    [
        {
            "category": "Food",
            "percentage": 30.0
        },
        {
            "category": "Electronics",
            "percentage": 10.0
        },
        {
            "category": "Textbooks",
            "percentage": 25.0
        },
        {
            "category": "Clothes",
            "percentage": 25.0
        },
        {
            "category": "Misc",
            "percentage": 20.0
        }
    ]
```

***POST /user/1/transactions*** - Insert a transaction for user 1 (encoded form data: company, cost, date, and category)

Sample request body:

```
category=food&cost=6&company=Chick+fil-A&date=2016-11-12
```

***DELETE /user/1/transactions/9876554*** - Delete transaction 9876554 from user 1

The expected success response for all queries is a JSON document with a 200 OK status code.

## Amazon
The other component of this app is finding cheaper alternatives to products users purchase on Amazon.

***GET /amazon/B000OOYECC*** - Get name, price, and cheaper alternative to ASIN [B000OOYECC](https://www.amazon.com/gp/product/B000OOYECC).

## Try it out
Keep The Change is available at [https://keepthechange.herokuapp.com/](https://keepthechange.herokuapp.com/).
