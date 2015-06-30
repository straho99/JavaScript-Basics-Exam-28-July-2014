/**
 * Created by Strahil on 11/11/14.
 */
'use strict';

var sampleTable = [
    '<table>',
    '<tr><th>Product</th><th>Price</th><th>Votes</th></tr>',
    '<tr><td>aaa</td><td>2</td><td>+12</td></tr>',
    '<tr><td>aa,</td><td>2.9</td><td>+33</td></tr>',
    '<tr><td>ccc</td><td>2</td><td>+1</td></tr>',
    '<tr><td>ddd</td><td>2.5</td><td>+7</td></tr>',
    '<tr><td>!ccv</td><td>2</td><td>+7</td></tr>',
    '<tr><td>cad</td><td>2</td><td>+11</td></tr>',
    '</table>'
];

sortTable(sampleTable);

function sortTable(tableHTML) {
    var Product = function (name, price, html) {
        this.productName = name;
        this.price = price;
        this.rowHTML = html;
    }
    var products = [];
    var regExpression = /<td>(.*?)<\/td><td>(.*?)<\/td>/i;
    for (var i = 2; i < tableHTML.length - 1; i++) {
        var match = regExpression.exec(tableHTML[i]);
        var name = match[1];
        var price = Number(match[2]);
        var product = new Product(name, price, tableHTML[i]);
        products.push(product);
    }
    products.sort(function(a, b) {
        return a.price >= b.price;
    });
    products.sort(function(a, b) {
        if (a.price != b.price) {
            return a.price - b.price;
        } else {
            return a.productName == b.productName ? 0 : a.productName < b.productName ? -1 : 1;
        }
    });
    console.log(tableHTML[0]);
    console.log(tableHTML[1]);
    for (var i = 0; i < products.length; i++) {
        console.log(products[i].rowHTML);
    }
    console.log(tableHTML[tableHTML.length - 1]);

    //for (var i = 0; i<products.length; i++) {
    //    console.log(products[i].price + '==' + products[i].productName);
    //}
}
