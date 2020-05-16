var fightOrSkip = function() {
    // ask user if they would like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // enter the conditional recursive function call here!
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

        promptFight = promptFight.toLowerCase();

    if  (promptFight === "skip") {
        // confirm skip
        var confirmSkip = window.confirm("Are you sure that you'd like to quit?");

    // If yes (true), leave fight
    if (confirmSkip) {
        window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");
            //subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            // return true if user wants to leave
            return true;
        }
    } else {
        return false;
    }
}

var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;

    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    // repeat and execute as long as the enemy robot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {
        if (isPlayerTurn) {
            // ask user fight or skip
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }    
            // Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and use that result to update the value in 'enemy.health' variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // remove enemy health by subtracting the amount we set in the damage variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
            
                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while loop() since enemy is dead
                break;
            }else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }   
        // player gets attacked first 
        }else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use the result to update the value in the 'playerInfo.health' variable.
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // Check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                //leave while() loop if player died
                break;
            } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};

//function to start a new game
var startGame = function() {
    playerInfo.reset; 

    // This is a loop
    for(var i = 0; i < enemyInfo.length; i++) {
            if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        

            // pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            //pass the pickedenemy.name variable's value into the fight function, where it will assume the value of enemy.name parameter
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
            // ask if user wants to use the store before the next round
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
            //if yes, take them to the store() function
            if (storeConfirm) {
                shop();
            }
            }
            }
            else {
                window.alert("You have lost your robot in battle! Game Over!");
                break;
            }
    }
    // play again
    endGame();
    
};

//function endGame()
var endGame = function() {
    // if player is still alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?") 
        if (playAgainConfirm) {
            //restart the game
            startGame();
        }
        else {
            window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        }
}

var shop = function () {
    // ask a player what they would like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 LEAVE to make a choice."
    );
    // use switch to carry out action
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1: 
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            //call shop() again to force the player to pick a valid option
            shop();
            break;
    }
};

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    
    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
        window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
        window.alert("You don't have enough money!");
        }
    }
};
// You can also log multiple values at once like this console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo= [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];
 //start the game when the page loads
    startGame();





