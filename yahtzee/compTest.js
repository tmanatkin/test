// Declare Variables
var aiCompDice;
var aiCompDiceCount;
var aiCompDiceCompleted;
var iCompTotalScore;
var iCompTurnScore;
var iCompDiceKeepValue;

// Initialize Variables
function initVars(){
    aiCompDice = [];
    aiCompDiceCount = [];
    aiCompDiceCompleted = [];
    iCompTotalScore = 0;
    iCompTurnScore = 0;
    iCompDiceKeepValue = 0;
}

// Computer Turn
function computerTurn(){

    // Initialize Turn Score and Keep Value
    iCompTurnScore = 0;
    iCompDiceKeepValue = 0;

    // Roll 3 Times
    for(let iCountOutside = 0; iCountOutside < 3; iCountOutside++){

        // Initialize Counter and Keep Value
        aiCompDiceCount = [0,0,0,0,0,0];

        // Roll Dice
        for(let iCount = 0; iCount < 6; iCount++){

            // If First Turn Skip Statement
            if(iCompDiceKeepValue == 0){
                aiCompDice[iCount] = Math.floor(Math.random() * 6) + 1;
            }
            // Otherwise Replace Values not Equal to Keep Value
            else if (aiCompDice[iCount] != iCompDiceKeepValue){
                aiCompDice[iCount] = Math.floor(Math.random() * 6) + 1;
            }

            if (!(aiCompDiceCompleted.includes(aiCompDice[iCount]))){
                // Add Die to Counter
                aiCompDiceCount[(aiCompDice[iCount] - 1)]++;
            }
            
        }
        // If Roll Doesn't Contain Any Dice For Scores Left
        if((aiCompDiceCount.reduce((a, b) => a + b, 0)) == 0){
            for(let iCount = 1; iCount <= 6; iCount++){
                if(!(aiCompDiceCompleted.includes(iCount))){
                    iCompDiceKeepValue = iCount;
                }
            }
        }
        // Decide Goal Die to Go for (Most Common Die)
        else{
            iCompDiceKeepValue = (aiCompDiceCount.indexOf(Math.max.apply(null, aiCompDiceCount)) + 1);
        }

        // Test Alert
        //alert("Dice: " + aiCompDice + "\nCount: " + aiCompDiceCount + "\nCompleted: " +aiCompDiceCompleted + "\nKeep: " + iCompDiceKeepValue)
    }

    // Add Completed Dice Value to List
    aiCompDiceCompleted.push(iCompDiceKeepValue);

    // Calculate Ouptut
    for(let iCount = 0; iCount < 6; iCount++){
        if(aiCompDice[iCount] == iCompDiceKeepValue){
            iCompTurnScore += aiCompDice[iCount];
        }
    }

    // Calculate Total
    iCompTotalScore += iCompTurnScore;

    // Return Turn Score
    return iCompTurnScore;
}

// Computer Game
function computerGame(){
    for(let iCount = 0; iCount < 6; iCount++){
        computerTurn();
    }

    // Return Game Score
    return iCompTotalScore;
}

// Calculate Averages from Multiple Games
function computerMultipleGames(){

    // Create Output Variables
    let output = 0;
    let outputList = [];
    let numTimes = 10000;

    for(let iCount = 0; iCount < numTimes; iCount++){
        initVars(); // Reset Game
        outputList[iCount] = computerGame();
        output += outputList[iCount];
    }

    output = output / numTimes

    document.getElementById("output").innerHTML = "[" + outputList + "]";
}