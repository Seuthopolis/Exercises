document.getElementById("btn").addEventListener("click", showResult);

function showResult() {
    let textValue = document.getElementById('input-text').value;
    textValue = textValue.toLowerCase();
    textValue = textValue.replace(/'/g, '"');
    textValue = JSON.parse(textValue);
    let newArray = textValue.filter(function (string) {
        return ~string.indexOf("coin");
    });

    let newText = newArray.toString(),
        validate = /[+-]?\d+(\.\d+)?/g,
        validatedArr = (newText.match(validate)),
        arrayOfNumbers,
        integerNumbers = [];

    if (validatedArr == null) {
        document.getElementById('gold').innerHTML = 0;
        document.getElementById('silver').innerHTML = 0;
        document.getElementById('bronze').innerHTML = 0;
        return;
    } else {
        arrayOfNumbers = validatedArr.map(Number);
        for (let numVal of arrayOfNumbers) {
            if (numVal % 1 === 0) {
                integerNumbers.push(numVal);
            }
        }
    }


    function accumulator(a, b) {
        return a + b;
    }

    let goldArr = [],
        silverArr = [],
        bronzeArr = [],
        gold = 0,
        silver = 0,
        bronze = 0;
    for (let valueArr of integerNumbers) {
        if (valueArr >= 100) {
            goldArr.push(valueArr);
            gold = (goldArr.reduce(accumulator, 0)) / (100);
        } else if (valueArr >= 10 && valueArr < 100) {
            silverArr.push(valueArr);
            silver = (silverArr.reduce(accumulator, 0)) / (10);
        } else if (valueArr < 10) {
            bronzeArr.push(valueArr);
            bronze = bronzeArr.reduce(accumulator, 0);
        }
    }
    document.getElementById('gold').innerHTML = gold;
    document.getElementById('silver').innerHTML = silver;
    document.getElementById('bronze').innerHTML = bronze;
}