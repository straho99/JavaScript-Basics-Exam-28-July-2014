/**
 * Created by Strahil on 11/11/14.
 */
'use strict';

var sampleInput = [
    [5, 8],
    [11210, 11215],
    [55555, 55560],
    [100, 300],
    [1000, 1200],
];

//for (var i = sampleInput[1][0]; i <= sampleInput[1][1]; i++) {
//    console.log(isRakiika(i));
//};

findRakiikaNumbers(sampleInput[2]);

function findRakiikaNumbers(input) {
    var start = parseInt(input[0]);
    var end = parseInt(input[1]);
    var html = '<ul>\n';
    for (var i = start; i <= end; i++) {
        var className = '';
        if (isRakiika(i)) {
            className = 'rakiya';
            html += '<li><span class=\'' +className + '\'>' + i + '</span><a href="view.php?id=' + i + '>View</a></li>\n'
        } else {
            className = 'num';
            html += '<li><span class=\'' +className + '\'>' + i + '</span></li>\n'
        }

    }
    html+= '</ul>\n';
    console.log(html);

    function isRakiika(number) {
        var numberToString = number.toString();
        for (var i = 0; i < numberToString.length - 1; i++) {
            var couple = numberToString[i] + numberToString[i + 1];
            var stringBefore = numberToString.substring(0, i);
            var stringAfter = numberToString.substring(i + 2, numberToString.length);
            var before = stringBefore.indexOf(couple);
            var after = stringAfter.indexOf(couple);
            if (before >= 0 || after >= 0) {
                return true;
            }
        }
        return false;
    }
}

