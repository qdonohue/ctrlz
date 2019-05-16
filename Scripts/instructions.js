

function instructions() {

    var instructionParent = document.createElement('div');
    instructionParent.id = "instructionsScreen";

    var instructions = document.createElement('div');
    instructions.className = "instructionsBox";
    instructionParent.appendChild(instructions);

    var label = document.createElement('H1');
    label.innerHTML = "How to Play:";
    label.className = "title";
    instructions.appendChild(label);

    var objective = document.createElement('H3');
    objective.innerHTML = "Goal of the game: ";
    objective.className = "subheader";
    instructions.appendChild(objective);

    var objectiveInstructions = document.createElement('P');
    objectiveInstructions.className = "instructionText";
    objectiveInstructions.innerHTML = "Your goal in this game is to protect your fort and destroy the fort of your opponent. You will begin by building your fort, and you will see your fort appear on the game board over time. You can shoot your opponent to send them back in time to a prior position of theirs - undoing whatever building happened in the interim period. Win by either completely destroying your opponents fort (no blocks left on their side of the gameboard), or by sending your opponent back in time to the start.";
    instructions.appendChild(objectiveInstructions);

    var building = document.createElement('H3');
    building.innerHTML = "Building your fort: ";
    building.className = "subheader";
    instructions.appendChild(building);

    var buildingInstructions = document.createElement('P');
    buildingInstructions.className = "instructionText";
    buildingInstructions.innerHTML = "You will build your fort on the fort building screen. You will see a gameboard, with various types of blocks on the left (along with how many of each type you have left). At the bottom there is a spawn box indicating where you will start. Your opponent's fort is in the direction of the top of the screen (The enemy's gate is up, not down.... whoops). As you click on the board, blocks of the selected type will be placed. You'll notice that blocks have a number in them - this indicates their build order. The 0th block will be placed first (this is a COS class after all - arrays start at 0), and so on. The first 10 blocks will be placed immediatley at the start - but after that blocks will spawn in over time. Box blocks are basic - they just impede your opponents movements and block enemy projectiles. Turret blocks will target your opponent and try to shoot at them - they can damage your opponent's blocks, so if they hide eventually the turret will get to them. Cannons will shoot in the direction of your opponents fort, helping demolish it over time.";
    instructions.appendChild(buildingInstructions);

    var gamePlay = document.createElement('H3');
    gamePlay.innerHTML = "Game play: ";
    gamePlay.className = "subheader";
    instructions.appendChild(gamePlay);

    var gamePlayInstructions = document.createElement('P');
    gamePlayInstructions.className = "instructionText";
    gamePlayInstructions.innerHTML = "Set your controls before playing. Then simply use those controls to move and shoot. The swap button switches between weapons - right now there are only 2, but try them both out!";
    instructions.appendChild(gamePlayInstructions);

    var ready = document.createElement('INPUT');
    ready.type = 'button';
    ready.value = "Let's Play!";
    ready.id = "instructions-button";
    ready.className = "fancyButton";

    ready.onclick = function() {
        $('#instructionsScreen').remove();
        $(document.body).css("overflow", "hidden");
        $('#startScreen').show();
    };

    instructions.appendChild(ready);
    $(document.body).css("overflow", "scroll");

    document.body.appendChild(instructionParent);
}