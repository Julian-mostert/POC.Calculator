var calculator = function () {
    var calc = this;
    calc.enteredValue = "";
    calc.calculatedValue = "";
    calc.setValue = "";
    calc.Logging = "";
    calc.FloatValue = true;
    calc.ResetValue = "";

    function roundValue(val) {
        val = val.toString().split("");
        if (val.indexOf(".") !== -1) {
            var valTest = val.slice(val.indexOf(".") + 1, val.length);
            val = val.slice(0, val.indexOf(".") + 1);
            var i = 0;
            while (valTest[i] < 1) {
                i++;
            }
            valTest = valTest.join("").slice(0, i + 2);
            if (valTest[valTest.length - 1] === "0") {
                valTest = valTest.slice(0, -1);
            }
            return val.join("") + valTest;
        } else {
            return val.join("");
        }
    }
    function setEntry(element) {
        calc.enteredValue = $(element).attr("value");
        console.log("Entry: " + calc.enteredValue);
    }
    function runRest() {
        if (calc.ResetValue) {
            switch (calc.enteredValue) {
                case "/":
                case "*":
                case "-":
                case "+":
                    calc.Logging = calc.calculatedValue;
                    break;
                default:
                    calc.calculatedValue = "";
                    break;
            }
        }
        calc.ResetValue = false;
    }
    function validateFistDigit() {
        if (calc.calculatedValue.length === 0 && isNaN(calc.enteredValue) && calc.enteredValue !== "." || calc.calculatedValue.length === 0 && calc.enteredValue === "0") {
            calc.enteredValue = "";
            calc.calculatedValue = "";
        }
    }
    function preventBadOperators() {
        if (calc.setValue !== "noChange") {
            if (calc.setValue === "" && isNaN(calc.enteredValue) && calc.enteredValue !== "." || isNaN(calc.setValue) && isNaN(calc.enteredValue) && calc.enteredValue !== ".") {
                calc.enteredValue = "";
            }
        }
    }
    function resetAfterEval() {
        calc.enteredValue = "";

        if (calc.ResetValue) {
            calc.Logging = "";
        }
    }
    function combineDigets() {
        while (Number(calc.enteredValue) || calc.enteredValue === "0" || calc.setValue === ".") {

            if (isNaN(calc.setValue) && calc.enteredValue === "0" && calc.setValue !== ".") {
                calc.enteredValue = "";
            } else if (isNaN(calc.setValue) && Number(calc.enteredValue) && calc.setValue !== ".") {
                calc.setValue = "";
            }
            if (calc.enteredValue === ".") {
                calc.FloatValue = false;
            }
            if (calc.setValue === "0." && isNaN(calc.enteredValue)) {
                calc.enteredValue = "";
            } else {
                if (calc.setValue[calc.setValue.length - 1] === ".") {
                    calc.setValue = calc.setValue.concat(calc.enteredValue);
                } else {
                    calc.setValue += calc.enteredValue;
                }
                calc.calculatedValue += calc.enteredValue;
                $("#answer").html(calc.setValue);
                calc.Logging += calc.enteredValue;
                calc.enteredValue = "";
            }
        }
    }
    function validateDigitCount() {
        if ($("#entry").children().text().length > 8) {
            $("#answer").html("0");
            calc.setValue = "";
            calc.calculatedValue = "";
            calc.Logging = "";
            calc.FloatValue = true;
        }
    }
    function logValues() {
        console.log("decimal: " + calc.FloatValue);
        console.log("current: " + calc.setValue);
        console.log("answer: " + calc.calculatedValue);
    }

    calc.buttonClicks = {
        clear: function () {
            if (calc.enteredValue === "ac" || calc.enteredValue === "ce" && calc.setValue === "noChange") {
                calc.calculatedValue = "";
                calc.setValue = "";
                calc.enteredValue = "";
                calc.Logging = "";
                $("#answer").html("0");
                calc.FloatValue = true;
            } else if (calc.enteredValue === "ce") {
                $("#history").html(calc.Logging.slice(0, - current.length));
                calc.Logging = log.slice(0, -calc.setValue.length);
                calc.calculatedValue = ans.slice(0, -calc.setValue.length);
                calc.setValue = ans;
                $("#answer").html("0");
                calc.enteredValue = "";
                calc.FloatValue = true;
            }
        },
        decimalPoint: function () {
            if (calc.enteredValue === "." || calc.enteredValue === "0.") {
                if (!calc.FloatValue) {
                    calc.enteredValue = "";
                }
            }
        },
        runOperator: function () {
            var operatorDecimal = function () {
                if (calc.setValue === "" || isNaN(calc.setValue[calc.setValue.length - 1])) {
                    calc.setValue = "0.";
                    calc.calculatedValue += entry;
                    $("#answer").html("0.");
                    calc.Logging += calc.setValue;
                } else {
                    calc.setValue = calc.setValue.concat(".");
                    calc.calculatedValue = calc.calculatedValue.concat(".");
                    calc.Logging = calc.calculatedValue;
                    $("#answer").html(calc.setValue);
                }
                calc.enteredValue = "";
                calc.FloatValue = false;
            }
            var operatorDivision = function () {
                calc.setValue = "/";
                calc.calculatedValue = roundValue(eval(ans)) + current;
                calc.Logging += current;
                $("#answer").html("/");
                calc.enteredValue = "";
                calc.FloatValue = true;
            }
            var operatorMultiply = function () {
                calc.setValue = "*";
                calc.calculatedValue = roundValue(eval(calc.calculatedValue)) + calc.setValue;
                calc.Logging += "x";
                $("#answer").html("x");
                calc.enteredValue = "";
                calc.FloatValue = true;
            }
            var operatorMinus = function () {
                calc.setValue = "-";
                calc.calculatedValue = roundValue(eval(calc.calculatedValue)) + calc.setValue;
                calc.Logging += calc.setValue;
                $("#answer").html("-");
                calc.enteredValue = "";
                calc.FloatValue = true;
            }
            var opeatorPlus = function () {
                calc.setValue = "+";
                calc.calculatedValue = roundValue(eval(calc.calculatedValue)) + calc.setValue;
                calc.Logging += calc.setValue;
                $("#answer").html("+");
                calc.enteredValue = "";
                calc.FloatValue = true;
            }
            var operatorEquals = function () {
                if (calc.setValue[calc.setValue.length - 1] === ".") {
                    calc.enteredValue = "";
                } else {
                    calc.setValue = eval(calc.calculatedValue).toString();
                    $("#answer").html(roundValue(eval(calc.calculatedValue)));
                    calc.calculatedValue = roundValue(eval(calc.calculatedValue));
                    calc.Logging += calc.enteredValue + calc.calculatedValue;
                    calc.Logging = calc.calculatedValue;
                    calc.enteredValue = "";
                    calc.ResetValue = true;
                    calc.FloatValue = true;
                }
                calc.setValue = "noChange";
            }

            switch (calc.enteredValue) {
                case ".":
                    operatorDecimal();
                    break;
                case "/":
                    operatorDivision();
                    break;
                case "*":
                    operatorMultiply();
                    break;
                case "-":
                    operatorMinus();
                    break;
                case "+":
                    opeatorPlus();
                    break;
                case "=":
                    operatorEquals();
                    break;
            }
        }
    };

    function setClickEvents() {
        $("button").click(function () {
            setEntry(this);

            runRest();

            calc.buttonClicks.clear();

            calc.buttonClicks.decimalPoint();

            validateFistDigit();

            preventBadOperators();

            combineDigets();

            calc.buttonClicks.runOperator();

            resetAfterEval();

            validateDigitCount();

            logValues();
        });
    }

    $(document).ready(function () {
        setClickEvents();
    });

    return calc;
}