# Keep The Change
YHack 2016 Project - Help college students budget their money and watch their spending

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

***GET /amazon/B0016J8AOC*** - Get name, price, and cheaper alternative to ASIN [B01M3NDY8X](https://www.amazon.com/gp/product/B01M3NDY8X).
