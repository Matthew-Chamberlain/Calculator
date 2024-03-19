
let queue = [];
function operate(num1, opp, num2)
{
    let result;
    if(opp == "+")
    {
        result = num1 + num2;
    }
    else if(opp == "-")
    {
        result = num1 - num2;
    }
    else if(opp == "*")
    {
        result = num1 * num2;
    }
    else if(opp == "/")
    {
        if(num2 != 0)
        {
            result = num1 / num2;
        }
        else
        {
            alert("Cannot divide by 0");
        }
    }
    return result;
}

function buttonPress(buttonID)
{
    const display = document.querySelector(".display");
    const currentNumDisplay = document.querySelector(".currentNum");
    const expressionDisplay = document.querySelector(".expression")
    switch(buttonID)
    {
        case "zero":
            editDisplay("0");            
            break;
        case "one":
            editDisplay("1");
            break;
        case "two":
            editDisplay("2");
            break;
        case "three":
            editDisplay("3");
            break;
        case "four":
            editDisplay("4");
            break;
        case "five":
            editDisplay("5");
            break;
        case "six":
            editDisplay("6");
            break;
        case "seven":
            editDisplay("7");
            break;
        case "eight":
            editDisplay("8");
            break;
        case "nine":
            editDisplay("9");
            break;
        case "addition":
            if(currentNumDisplay.textContent.length != 0)
            {
                editDisplay("+");
            }
            break;
        case "subtract":
            if(currentNumDisplay.textContent.length != 0)
            {
                editDisplay("-");
            }
            break;
        case "multiply":
            if(currentNumDisplay.textContent.length != 0)
            {
                editDisplay("*");
            }
            break;
        case "divide":
            if(currentNumDisplay.textContent.length != 0)
            {
                editDisplay("/");
            }
            break;
        case "equals":
            if(expressionDisplay.textContent.length != 0)
            {
                expressionDisplay.textContent += currentNumDisplay.textContent;
                currentNumDisplay.textContent = null;
                let number = "";
                for(let i = 0; i < expressionDisplay.textContent.length; i++)
                {
                    if(expressionDisplay.textContent.charAt(i) != "+" && expressionDisplay.textContent.charAt(i) != "-" && expressionDisplay.textContent.charAt(i) != "*" && expressionDisplay.textContent.charAt(i) != "/")
                    {
                        number += expressionDisplay.textContent.charAt(i);
                    }
                    else
                    {   
                        queue.push(Number(number));
                        queue.push(expressionDisplay.textContent.charAt(i));
                        number = "";
                    }
                }
                queue.push(Number(number));
                queue = queue.reverse();
                let result;
                for(let i = queue.length; i>1; i = queue.length)
                {
                    let number1 = queue.pop();
                    let operator = queue.pop();
                    let number2 = queue.pop();
                    result = operate(number1, operator, number2);
                    if(result == undefined || isNaN(result))
                    {
                        break;
                    }
                    queue.push(result);
                }
                clearAll()
                if(result != undefined || !isNaN(result))
                {
                    editDisplay(result);
                }
            }
            break;
        case "clear":
            clearDigit();
            break;
        case "clear-all":
            clearAll();
            break;
        case "decimal":
            if(!currentNumDisplay.textContent.includes("."))
            {
                if(currentNumDisplay.textContent.length == 0)
                {
                    editDisplay("0.");
                }
                else
                {
                    editDisplay(".");
                }
            }
            break;
        case "percentage":
            if(currentNumDisplay.textContent.length != 0)
            {
                currentNumDisplay.textContent = Number(currentNumDisplay.textContent)/100;
            }
            break;
        case "negative":
            if(currentNumDisplay.textContent.length >= 1)
            {
                if(currentNumDisplay.textContent != "-")
                {
                    currentNumDisplay.textContent = Number(currentNumDisplay.textContent)*-1;
                }
                else
                {
                    currentNumDisplay.textContent = null;
                }
                
            }
            break;
    }
}

function editDisplay(character)
{
    const currentNumDisplay = document.querySelector(".currentNum");
    const expressionDisplay = document.querySelector(".expression");
    if(character == "+" || character == "-" || character == "*" || character == "/")
    {
        expressionDisplay.textContent+= currentNumDisplay.textContent;
        currentNumDisplay.textContent = null;
        expressionDisplay.textContent+= character;
    }
    else
    {
        if(currentNumDisplay.textContent.length < 15)
        {   
            currentNumDisplay.textContent+=(character);
        }
    }
    
}

function clearDigit()
{  
    const currentNumDisplay = document.querySelector(".currentNum");
    currentNumDisplay.textContent = currentNumDisplay.textContent.slice(0,-1);
}

function clearAll()
{
    queue = [];
    const currentNumDisplay = document.querySelector(".currentNum");
    if(currentNumDisplay.firstChild){currentNumDisplay.removeChild(currentNumDisplay.firstChild);}
    const expression = document.querySelector(".expression");
    if(expression.firstChild){expression.removeChild(expression.firstChild);}
}