/*
How to make a bot:
A bot is an object. It has a few arguments to the contstructor:
1. Name, a string
2. Main function. A function of board, game, and me. Board is the 2d array of tiles. Game is the game object, me is the bot object.
3. A (optional) init function, takes 1 argument: me (the bot objecct), init function called in constructor.

The bot object is assigned a few things upon initiation of the board:
bot.color, the bot's color. Either 1 or 2, because a square can be either 0 (empty), 1 (orange), or 2 (green).

The game argument has a few useful functions.
game.exec( function( x, y ) ) calls the function on every x y position of the board.
game.neighbor( x, y ) finds all of the neighbors of position x y. Returns a list, where item 1 is the number of neighboring orange tiles, and item 2 is the number of neighboring green tiles. NOTE: uses the Von Neumann neighborhood.
*/
UselessUriel=new bot("Useless Uriel",(board,game,me)=>{return}); //This bot won't move.
botoptions.push(UselessUriel); //Append it to the list of bots on the html page
//Here is a decent bot. If it goes in a checkerboard, it will automatically claim all of tiles.
SmartSilas=new bot("Smart Silas",(board,game,me)=>{
    for(let x=0;x<game.width;x++){
        for(let y=0;y<game.width;y++){
            if(board[x][y]!=me.color&&Math.abs((x-y)%2)==0){
                return [x,y]
            }
        }
    }
})
botoptions.push(SmartSilas)
BrainyBob=new bot("Brainy Bob",(board,game,me)=>{
    let valid=[]
    for(let x=0;x<game.width;x++){
        for(let y=0;y<game.width;y++){
            if(board[x][y]!=me.color){
                valid.push([x,y])
            }
        }
    }
    return valid[Math.floor(Math.random()*valid.length)]
})
botoptions.push(BrainyBob)
