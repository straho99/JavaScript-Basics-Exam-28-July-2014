/**
 * Created by Strahil on 11/11/14.
 */
'use strict';

var sampleData = [
    'Rotate(0)',
    'js',
    'exam'
]

//rotateStrings(['hello', 'softuni', 'exam']);
rotateStringMatrix(sampleData);

function rotateStringMatrix(args) {
    var pattern = /\((\d+)\)/g;
    var angle = pattern.exec(args[0])[1];
    var numberOfRotations = parseInt(angle) / 90;
    if (numberOfRotations > 3) {
        numberOfRotations = numberOfRotations % 4;
    }
    var strings = [];
    for (var i = 1; i < args.length; i++) {
        strings.push(args[i]);
    }
    if (numberOfRotations == 0) {
        for (var i = 0; i < strings.length; i++) {
            console.log(strings[i]);
        }
        return;
    }
    var rotatedStrings= rotateStrings(strings);
    for (var i = 2; i <= numberOfRotations; i++) {
        rotatedStrings = rotateStrings(rotatedStrings);
    }
    for (var i in rotatedStrings) {
        console.log(rotatedStrings[i]);
    }


    function rotateStrings(strings) {
        var results = [];
        var length = findMaxLength(strings);
        for (var i = 0; i < length; i++) {
            var currentString = '';
            for (var j = strings.length -1; j >= 0; j--) {
                var currentChar = strings[j][i];
                if (currentChar) {
                    currentString += currentChar;
                } else {
                    currentChar = ' ';
                    currentString += currentChar;
                }
            }
            results.push(currentString);
        }
        return results;
    }

    function findMaxLength (strings) {
        var max = 0;
        for (var i in strings) {
            if (strings[i].length > max) {
                max = strings[i].length;
            }
        }
        return max;
    }
}



