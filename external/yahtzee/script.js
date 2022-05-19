// Declare Variables
var aiDiceValues = [];
var aiDiceScores = [];
var aiCheckedScores = [];
var aiCompDice = [];
var aiCompDiceCount = [];
var aiCompDiceCompleted = [];
var aiAllCompDice = [];
var iCheckedScore = 0;
var iTotalScore = 0;
var iCompTotalScore = 0;
var iRollValue;
var iRollCounter;
var iCheckedScoreIndex;
var iCompTurnScore;
var iCompDiceKeepValue;

// New Turn
function newTurn(){

    // Reset Rolls Left
    iRollCounter = 3;
    document.getElementById("rollsLeft").innerHTML = iRollCounter + " rolls left";

    // Enable Roll Button and Fix Hover
    document.getElementById("rollDiceButton").disabled = false;
    document.getElementById("rollDiceButton").style.backgroundColor = 'black';
    document.getElementById("rollDiceButton").style.color = 'white';
    document.getElementById("rollDiceButton").onmouseover = function(){
            document.getElementById("rollDiceButton").style.backgroundColor = 'white';
            document.getElementById("rollDiceButton").style.color = 'black';
        };
        document.getElementById("rollDiceButton").onmouseout = function(){
            document.getElementById("rollDiceButton").style.backgroundColor = 'black';
            document.getElementById("rollDiceButton").style.color = 'white';
        };

    // Enable and Uncheck Checkboxes
    for(let iCount = 1; iCount <=6; iCount++){
        document.getElementById("diceKeep" + iCount).checked = false;
        document.getElementById("diceKeep" + iCount).disabled = false;
    }

    // Disable End Turn Button
    document.getElementById("endTurnButton").disabled = true;
    document.getElementById("endTurnButton").style.backgroundColor = 'white';
    document.getElementById("endTurnButton").style.color = 'black';

    // Disable Radio Buttons and Clear Labels (Unless Previously Checked)
    for(let iCount = 1; iCount <= 6; iCount++){

        // Disable and Uncheck
        document.getElementById("score" + iCount).disabled = true;
        document.getElementById("score" + iCount).checked = false;

        // Modify Previously Checked Radio Buttons
        if(aiCheckedScores.includes(iCount)){
            document.getElementById("score" + iCount + "Text").style.color = "white";
            document.getElementById("score" + iCount + "Text").style.backgroundColor = "grey";
        }
        // Reset Other Radio Buttons
        else{
            document.getElementById("score" + iCount + "Text").innerHTML = "";
            document.getElementById("score" + iCount + "Text").style.backgroundColor = "white";
        }
    }
}

// Roll Dice
function rollDice(){

    // Enable Done Button and Fix Hover
    document.getElementById("calculateScoresButton").disabled = false;
    document.getElementById("calculateScoresButton").style.backgroundColor = 'black';
    document.getElementById("calculateScoresButton").style.color = 'white';
    document.getElementById("calculateScoresButton").onmouseover = function(){
            document.getElementById("calculateScoresButton").style.backgroundColor = 'white';
            document.getElementById("calculateScoresButton").style.color = 'black';
        };
        document.getElementById("calculateScoresButton").onmouseout = function(){
            document.getElementById("calculateScoresButton").style.backgroundColor = 'black';
            document.getElementById("calculateScoresButton").style.color = 'white';
        };

    // Decrease Rolls Left
    iRollCounter--;
    document.getElementById("rollsLeft").innerHTML = iRollCounter + " rolls left";

    // Iterate Through Dice
    for(let iCount = 1; iCount <= 6; iCount++){

        // See if Checked
        if(!(document.getElementById("diceKeep" + iCount).checked)){

            // Show Dice
            document.getElementById("dice" + iCount).style.width = "150px";
            document.getElementById("dice" + iCount).style.height = "150px";

            // Roll Number and Pull Image
            iRollValue = (Math.floor(Math.random() * 6) + 1);
            document.getElementById("dice" + iCount).src = "images/die" + iRollValue + ".png";

            // Refresh Dice List
            aiDiceValues[iCount - 1] = iRollValue;
        }

        // Show Checkboxes and Text, Hide Instructions
        document.getElementById("rollsLeft").style.display = "block";
        document.getElementById("diceKeep" + iCount).style.display = "block";
        document.getElementById("checkboxInstructions").style.display = "inline-block";
        document.getElementById("calculateScoresButton").style.display = "inline-block";
        document.getElementById("startInstructions").style.display = "none";
    }
    // Disable Button and Dice When 0 Rolls Left
    if(iRollCounter <= 0){
        // Disable Roll
        document.getElementById("rollDiceButton").disabled = true;
        document.getElementById("rollDiceButton").style.backgroundColor = 'white';
        document.getElementById("rollDiceButton").style.color = 'black';

        // Disable Dice Checkboxes
        for(let iCount = 1; iCount <=6; iCount++){
            document.getElementById("diceKeep" + iCount).checked = true;
            document.getElementById("diceKeep" + iCount).disabled = true;
        }
    }
}

// Calculate Scores
function calculateScores(){

    // Initalize Variables
    aiDiceScores = [0,0,0,0,0,0];

    // Disable Done Button after Click
    document.getElementById("calculateScoresButton").disabled = true;
    document.getElementById("calculateScoresButton").style.backgroundColor = 'white';
    document.getElementById("calculateScoresButton").style.color = 'black';

    // Hide Rolls Left
    document.getElementById("rollsLeft").innerHTML = "";
    
    // Disable Roll
    document.getElementById("rollDiceButton").disabled = true;
    document.getElementById("rollDiceButton").style.backgroundColor = 'white';
    document.getElementById("rollDiceButton").style.color = 'black';

    // Disable Dice Checkboxes
    for(let iCount = 1; iCount <=6; iCount++){
        document.getElementById("diceKeep" + iCount).checked = true;
        document.getElementById("diceKeep" + iCount).disabled = true;
    }

    // Add Dice to Each Score
    aiDiceValues.forEach(function(num){
        for(let iCount = 1; iCount <=6; iCount++){
            if(num == iCount){
                aiDiceScores[iCount - 1] += num;
            }
        }
    });

    for(let iCount = 1; iCount <=6; iCount++){
        // Leave Submitted Score Disabled
        if(!(aiCheckedScores.includes(iCount))){
            // Output Potential scores
            document.getElementById("score" + iCount + "Text").innerHTML = aiDiceScores[iCount - 1];
            document.getElementById("score" + iCount + "Text").style.color = "black";
            // Enable Radio Buttons
            document.getElementById("score" + iCount).disabled = false;
        }
    }
}

// Highlight Checked Radio Button
function highlightLabel() {

    // Highlight Selected Label
    var form = document.forms[0];
    for (let iCount = 0; iCount < form.length; iCount++) {

        // Highlight Only What is Selected
        if (form[iCount].checked) {
            document.getElementById("score" + (iCount + 1) + "Text").style.color = "white";
            document.getElementById("score" + (iCount + 1) + "Text").style.backgroundColor = "black";

            // Save as Score
            iCheckedScore = aiDiceScores[iCount];

            // Remember that it was checked (Use to Disable Later)
            iCheckedScoreIndex = iCount + 1;
        }
        // Don't Unhighlight if Previously Selected
        else if(aiCheckedScores.includes(iCount + 1)){
            document.getElementById("score" + (iCount + 1) + "Text").style.color = "white";
            document.getElementById("score" + (iCount + 1) + "Text").style.backgroundColor = "grey";
        }
        // Reset Other Radio Buttons
        else{
            document.getElementById("score" + (iCount + 1) + "Text").style.color = "black";
            document.getElementById("score" + (iCount + 1) + "Text").style.backgroundColor = "white";
        }
    }

    // Enable End Turn Button
    document.getElementById("endTurnButton").disabled = false;
    document.getElementById("endTurnButton").style.backgroundColor = 'black';
    document.getElementById("endTurnButton").style.color = 'white';

    // Fix End Turn Button Hover
    document.getElementById("endTurnButton").onmouseover = function(){
        document.getElementById("endTurnButton").style.backgroundColor = 'white';
        document.getElementById("endTurnButton").style.color = 'black';
    };
    document.getElementById("endTurnButton").onmouseout = function(){
        document.getElementById("endTurnButton").style.backgroundColor = 'black';
        document.getElementById("endTurnButton").style.color = 'white';
    };
}

function endTurn(){

    // Load Score
    iTotalScore += iCheckedScore;
    document.getElementById("totalScore").innerHTML = iTotalScore;

    // Save Previously Checked Score
    aiCheckedScores.push(iCheckedScoreIndex);

    // Computer's Turn
    computerTurn();

    // End Game When Done
    if(aiCheckedScores.length >= 6){

        // Disable End Turn Button
        document.getElementById("endTurnButton").disabled = true;
        document.getElementById("endTurnButton").style.backgroundColor = 'white';
        document.getElementById("endTurnButton").style.color = 'black';

        // Disable Radio Buttons
        for(let iCount = 1; iCount <= 6; iCount++){
            document.getElementById("score" + iCount).disabled = true;
            document.getElementById("score" + iCount).checked = false;
            document.getElementById("score" + iCount + "Text").style.color = "white";
            document.getElementById("score" + iCount + "Text").style.backgroundColor = "grey";
        }

        // Game Over
        gameOver();
    }
    else{
        // Hide Dice and Checkboxes
        for(let iCount = 1; iCount <= 6; iCount++){
            document.getElementById("dice" + iCount).src = "";
            document.getElementById("dice" + iCount).style.height = "150px";
            document.getElementById("dice" + iCount).style.width = "0px";
            document.getElementById("diceKeep" + iCount).style.display = "none";
        }

        // New Turn
        newTurn();
    }
}

// Computer Turn
function computerTurn(){

    // Initialize Turn Score, Turn Record, and Keep Value
    iCompTurnScore = 0;
    iCompDiceKeepValue = 0;
    aiAllCompDice = [];

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

        // Add Dice to Computer Turn Record
        aiAllCompDice.push(Array.from(aiCompDice));

        // Test Alert
        //alert("Dice: " + aiCompDice + "\nCount: " + aiCompDiceCount + "\nCompleted: " + aiCompDiceCompleted + "\nKeep: " + iCompDiceKeepValue)
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
    document.getElementById("compScore" + iCompDiceKeepValue).innerHTML = iCompTurnScore;
    iCompTotalScore += iCompTurnScore;
    document.getElementById("compTotalScore").innerHTML = iCompTotalScore;

    // Display Alert
    document.getElementById("compScoreAlertContainer").style.display = "inline-block"

    // Output Computer Dice
    for(let iTurn = 0; iTurn < 3; iTurn++){
        for(let iDice = 0; iDice < 6; iDice++){
            document.getElementById("compDice" + iTurn + iDice).src = "images/die" + aiAllCompDice[iTurn][iDice] + "White.png";
        }
    }
    
    // Display Scores
    document.getElementById("compScoreAlert").innerHTML = aiAllCompDice.join("<br>");

}

// Game Over
function gameOver(){

    // Display Scoreboard
    document.getElementById("scoreboardContainer").style.display = "block";

    // Display Game Outcome
    if (iTotalScore > iCompTotalScore){
        document.getElementById("gameOutcomeHeader").innerHTML = "Congrats!";
        document.getElementById("gameOutcomeText").innerHTML = "You beat the computer!";
    }
    else if(iTotalScore < iCompTotalScore){
        document.getElementById("gameOutcomeHeader").innerHTML = "Sorry!";
        document.getElementById("gameOutcomeText").innerHTML = "You lost to the computer.";
    }
    else{
        document.getElementById("gameOutcomeHeader").innerHTML = "Wow!";
        document.getElementById("gameOutcomeText").innerHTML = "You tied with the computer!";
    }

    // Display Scores
    let iMyScoreHold;
    let iCompScoreHold;
    if(iTotalScore < 38){
        iMyScoreHold = 45;
    }
    else if(iTotalScore > 110){
        iMyScoreHold = 418;
    }
    else{
        iMyScoreHold = (iTotalScore - 28.5) * 5.12;
    }
    if(iCompTotalScore < 38){
        iCompScoreHold = 45;
    }
    else if(iCompTotalScore > 110){
        iCompScoreHold = 418;
    }
    else{
        iCompScoreHold = (iCompTotalScore - 28.5) * 5.12;
    }
    document.getElementById("myScoreDisplay").style.width = iMyScoreHold + "px";
    document.getElementById("myScoreNum").innerHTML = iTotalScore;
    document.getElementById("compScoreDisplay").style.width = iCompScoreHold + "px";
    document.getElementById("compScoreNum").innerHTML = iCompTotalScore;
}