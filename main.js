// Create a 500px by 340px game in the 'gameDiv' element of the index.html
var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');

// We create our only state, called 'mainState'
var mainState = {
    // We define the 3 default Phaser functions
    preload: function () {
        'use strict';
        // This function will be executed at the beginning 
        // That's where we load the game's assets
        game.load.image('player', 'assets/player.png');
    },
    create: function () {
        'use strict';
        // This function is called after the preload function 
        // Here we set up the game, display sprites, etc.
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        // Tell Phaser that the player will use the Arcade physics engine
        game.physics.arcade.enable(this.player);
        
        // Add vertical gravity to the player
        this.player.body.gravity.y = 500;
        this.cursor = game.input.keyboard.createCursorKeys();
    },
    update: function () {
        'use strict';
        // This function is called 60 times per second 
        // It contains the game's logic
        this.movePlayer();
    },
    movePlayer: function () {
        'use strict';
        
        if (this.cursor.left.isDown) {// If the left arrow key is pressed 
            // Move the player to the left
            this.player.body.velocity.x = -200;
        } else if (this.cursor.right.isDown) {// If the right arrow key is pressed
            // Move the player to the right 
            this.player.body.velocity.x = 200;
        } else {// If neither the right or left arrow key is pressed
            // Stop the player 
            this.player.body.velocity.x = 0;
        }
        
        // If the up arrow key is pressed and the player is touching the ground
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            // Move the player upward (jump) 
            this.player.body.velocity.y = -320;
        }
    }
    // And here we will later add some of our own functions
};

// Add the 'mainState' to Phaser, and call it 'main'
game.state.add('main', mainState);
game.state.start('main');