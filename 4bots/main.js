class board{
    constructor(width,height,bots){
        this.board=[]
        for(let x=0;x<width;x++){
            this.board.push([])
            for(let y=0;y<height;y++){
                this.board[x].push(0)
            }
        }
        this.bots=bots
        this.bots[0].color=1
        this.bots[1].color=2
	this.bots[2].color=3
	this.bots[3].color=4
        this.height=height
        this.width=width
        this.tiles=width*height
        //2 bots, bot 1 color:1 (red), bot 2 color:2 (blue)
        //New coloring: 1:orange, 2:green
    }
    render(canvas){
        let c=canvas.getContext("2d")
        let scaleW=canvas.width/this.width
        let scaleH=canvas.height/this.height
        for(let x=0;x<this.width;x++){
            for(let y=0;y<this.height;y++){
                if(this.board[x][y]==1){
                    c.beginPath()
                    c.rect(x*scaleW,y*scaleH,scaleW,scaleH)
                    c.fillStyle="rgb(230,131,28)"
                    c.fill()
                }else if(this.board[x][y]==2){
                    c.beginPath()
                    c.rect(x*scaleW,y*scaleH,scaleW,scaleH)
                    c.fillStyle="rgb(117,212,135)"
                    c.fill()
                }else if(this.board[x][y]==3){
                    c.beginPath()
                    c.rect(x*scaleW,y*scaleH,scaleW,scaleH)
                    c.fillStyle="rgb(217,102,253)"
                    c.fill()
                }else if(this.board[x][y]==4){
                    c.beginPath()
                    c.rect(x*scaleW,y*scaleH,scaleW,scaleH)
                    c.fillStyle="rgb(162,12,4)"
                    c.fill()
                }
            }
        }
    }
    tick(){
        let copy=this.board
        try{
            var bot0move=this.bots[0].main(this.board,this,this.bots[0])
        }catch{}
        try{
            var bot1move=this.bots[1].main(this.board,this,this.bots[1])
        }catch{}
	try{
	    var bot2move=this.bots[2].main(this.board,this,this.bots[2])
	}catch{}
	try{
	    var bot3move=this.bots[3].main(this.board,this,this.bots[3])
	}catch{}
        for(let x=0;x<this.width;x++){
            for(let y=0;y<this.width;y++){
                let q=this.nieghbor(x,y)
                if(q[0]>2){
                    copy[x][y]=1
                }else if(q[1]>2){
                    copy[x][y]=2
                }else if(q[2]>2){
		    copy[x][y]=3
		}else if(q[3]>2){
		    copy[x][y]=4
		}
                q=undefined
            }
        }
	let checkifsame=[JSON.stringify(bot0move),JSON.stringify(bot1move),JSON.stringify(bot2move),JSON.stringify(bot3move)]
	if(new Set(checkifsame).size==4){
            try{
                copy[bot0move[0]][bot0move[1]]=1
            }catch{}
            try{
                copy[bot1move[0]][bot1move[1]]=2
            }catch{}
	    try{
		copy[bot2move[0]][bot2move[1]]=3
	    }catch{}
	    try{
		copy[bot3move[0]][bot2move[1]]=4
	    }catch{}
        }
        this.board=copy
    }
    nieghbor(x,y){
        let a=0
        let b=0
	let c=0
	let d=0
        try{
            if(this.board[x-1][y]==1){
                a++
            }else if(this.board[x-1][y]==2){
                b++
            }else if(this.board[x-1][y]==3){
		c++
	    }else if(this.board[x-1][y]==4){
		d++
	    }
        }catch{}
        try{
            if(this.board[x+1][y]==1){
                a++
            }else if(this.board[x+1][y]==2){
                b++
            }else if(this.board[x+1][y]==3){
                c++
            }else if(this.board[x+1][y]==4){
                d++
            }
        }catch{}
        try{
            if(this.board[x][y+1]==1){
                a++
            }else if(this.board[x][y+1]==2){
                b++
            }else if(this.board[x][y+1]==3){
                c++
            }else if(this.board[x][y+1]==4){
                d++
            }
        }catch{}
        try{
            if(this.board[x][y-1]==1){
                a++
            }else if(this.board[x][y-1]==2){
                b++
            }else if(this.board[x][y-1]==3){
                c++
            }else if(this.board[x][y-1]==4){
                d++
            }
        }catch{}
        return [a,b,c,d]
    }
    count(){
        let a=0
        let b=0
	let c=0
	let d=0
        for(let x=0;x<this.width;x++){
            for(let y=0;y<this.width;y++){
                if(this.board[x][y]==1){
                    a++
                }else if(this.board[x][y]==2){
                    b++
                }else if(this.board[x][y]==3){
		    c++
		}else if(this.board[x][y]==4){
		    d++
		}
            }
        }
        return [a,b,c,d]
    }
    exec(func){
        for(let x=0;x<this.width;x++){
            for(let y=0;y<this.width;y++){
                func(x,y)
            }
        }
    }
}
//Bot will not be class, just a function of board
//Edit ^ Bots will be classes with a run function (classes so that they can store information about themselves such as name)

//Bots:
class bot{
    constructor(name_,func,init){
        this.main=func
        this.name=name_
        this.color=null
        this.memory={}
        this.opponent=null
        init=init||function(){}
        this.init=init
        init(this)
    }
}
BrainlessBob=new bot("Brainless Bob",(board,game,me)=>{
    return [Math.floor(Math.random()*game.width),Math.floor(Math.random()*game.height)]
})
ActiveAndy=new bot("Active Andy",(board,game,me)=>{
    for(let x=0;x<game.width;x++){
        for(let y=0;y<game.width;y++){
            if(board[x][y]!=me.color){
                return [x,y]
            }
        }
    }
    return [0,0]
})

CopycatCole=new bot("Copy-cat Cole",(board,game,me)=>{
    if(game.bots==[CopycatCole,CopycatCole]){
        throw new Error("Error; both bots are CopycatCole...")
    }else{
        if(me.color==1){
            try{
                let o=game.bots[1].main(board,game,game.bots[1])
                let z=[o[0]+Math.floor(Math.random()*3)-1,o[1]+Math.floor(Math.random()*3)-1]
                board[z[0]][z[1]]
                return z
            }catch{}
        }else{
            try{
                let o=game.bots[0].main(board,game,game.bots[0])
                let z=[o[0]+Math.floor(Math.random()*3)-1,o[1]+Math.floor(Math.random()*3)-1]
                board[z[0]][z[1]]
                return z
            }catch{}
        }
    }
    return [0,0]
})
GarbageGabriel=new bot("Garbage Gabriel",(board,game,me)=>{
    for(let x=game.width;x>0;x--){
        for(let y=game.height;y>0;y--){
            if(board[x-1][y-1]!=me.color){
                return [x-1,y-1]
            }
        }
    }
    return [0,0]
})
IllegitimateIvan=new bot("Illegitimate Ivan",(board,game,me)=>{
    let cp=me.memory["pos"]
    me.memory["pos"][0]+=Math.floor(Math.random()*3)-1
    me.memory["pos"][1]+=Math.floor(Math.random()*3)-1
    try{board[me.memory["pos"][0]][me.memory["pos"][1]]}catch{me.memory["pos"]=cp}
    return me.memory["pos"]
    return [0,0]
},(me)=>{
    me.memory["pos"]=[Math.floor(Math.random()*20),Math.floor(Math.random()*20)]
})
CheatyCharles=new bot("Cheaty Charles",(board,game,me)=>{
    game.exec((a,b)=>{board[a][b]=me.color})
    if(me.color==1){
        game.bots[1]=UselessUriel
    }else{
        game.bots[0]=UselessUriel
    }
    return [0,0]
})
StrategicSamuel=new bot("Strategic Samuel",(board,game,me)=>{
    if(ticks%2==0){
        for(let x=0;x<game.width;x++){
            for(let y=0;y<game.width;y++){
                if(board[x][y]!=me.color){
                    return [x,y]
                }
            }
        }
    }else{
        return [Math.floor(Math.random()*board.length),Math.floor(Math.random()*board.length)]
    }
    return [0,0]
})
BlobbingBodhi=new bot("Blobbing Bodhi",(board,game,me)=>{
    let valid=[]
    game.exec((a,b)=>{
        if(game.nieghbor(a,b)[me.color-1]==2&&!(board[a][b]==me.color)){
            valid.push([a,b])
        }
    })
    if(valid.length==0){
        return [Math.floor(Math.random()*board.length),Math.floor(Math.random()*board.length)]
    }else{
        return valid[Math.floor(Math.random()*valid.length)]
    }
})
botoptions=[BrainlessBob,ActiveAndy,CopycatCole,GarbageGabriel,IllegitimateIvan,CheatyCharles,StrategicSamuel,BlobbingBodhi]
//Run:



boardgame=new board(50,50,[BrainlessBob,BrainlessBob,BrainlessBob,BrainlessBob])
ticks=0
targetTicks=3000
BOT1=BrainlessBob
BOT2=BrainlessBob
BOT3=BrainlessBob
BOT4=BrainlessBob
init=()=>{
    document.getElementById("bot1").innerHTML=''
    document.getElementById("bot2").innerHTML=''
    document.getElementById("bot3").innerHTML=''
    document.getElementById("bot4").innerHTML=''
    botoptions.forEach((v,i)=>{
        var node1=document.createElement("option")
        node1.innerHTML=v.name
        node1.value=i
        var node2=node1.cloneNode(true)
	var node3=node2.cloneNode(true)
	var node4=node3.cloneNode(true)
        document.getElementById("bot1").appendChild(node1)
        document.getElementById("bot2").appendChild(node2)
	document.getElementById("bot3").appendChild(node3)
	document.getElementById("bot4").appendChild(node4)
    })
}
setTimeout(init,10)
tickfunction=()=>{
    boardgame.tick()
    boardgame.render(document.getElementById("main"))
    let c=boardgame.count()
    let b0=`${boardgame.bots[0].name} (Orange):${c[0]} (${Math.round(1000*(c[0]/boardgame.tiles))/10}%)`
    let b1=`${boardgame.bots[1].name} (Green):${c[1]} (${Math.round(1000*(c[1]/boardgame.tiles))/10}%)`
    let b2=`${boardgame.bots[2].name} (Purple):${c[2]} (${Math.round(1000*(c[2]/boardgame.tiles))/10}%)`
    let b3=`${boardgame.bots[3].name} (Red):${c[3]} (${Math.round(1000*(c[3]/boardgame.tiles))/10}%)`
    document.getElementById("score").innerHTML=`${b3}<br>${b2}<br>${b1}<br>${b0}<br>Days:${ticks}`
    if(c[0]>c[1]&&c[0]>c[2]&&c[3]<c[0]){
        document.getElementById("score").style.backgroundColor="rgb(230,131,28)"
    }else if(c[0]<c[1]&&c[2]<c[1]&&c[1]>c[3]){
        document.getElementById("score").style.backgroundColor="rgb(117,212,135)"
    }else if(c[2]>c[0]&&c[2]>c[1]&&c[2]>c[3]){
	document.getElementById("score").style.backgroundColor="rgb(217,102,253)"
    }else if(c[3]>c[1]&&c[3]>c[2]&&c[3]>c[0]){
	document.getElementById("score").style.backgroundColor="rgb(162,12,4)"
    }else{
        document.getElementById("score").style.backgroundColor="wheat"
    }
    ticks++
    if(ticks>=targetTicks){
        STOPGAME()
        if(c[0]>c[1]&&c[0]>c[2]&&c[0]>c[3]){
            document.getElementById("score").style.backgroundColor="rgb(230,131,28)"
            document.getElementById("score").innerHTML=`${boardgame.bots[0].name} (Orange) won!<br>${b3}<br>${b2}<br>${b1}<br>${b0}<br>Days:${ticks}`
        }else if(c[0]<c[1]&&c[1]>c[2]&&c[1]>c[3]){
            document.getElementById("score").style.backgroundColor="rgb(117,212,135)"
            document.getElementById("score").innerHTML=`${boardgame.bots[1].name} (Green) won!<br>${b3}<br>${b2}<br>${b1}<br>${b0}<br>Days:${ticks}`
        }else if(c[1]<c[2]&&c[2]>c[0]&&c[2]>c[3]){
	    document.getElementById("score").style.backgroundColor="rgb(217,102,253)"
	    document.getElementById("score").innerHTML=`${boardgame.bots[2].name} (Purple) won!<br>${b3}<br>${b2}<br>${b1}<br>${b0}<br>Days:${ticks}`
	}else if(c[3]>c[2]&&c[3]>c[1]&&c[3]>c[0]){
	    document.getElementById("score").style.backgroundColor="rgb(162,12,4)"
            document.getElementById("score").innerHTML=`${boardgame.bots[3].name} (Purple) won!<br>${b3}<br>${b2}<br>${b1}<br>${b0}<br>Days:${ticks}`
	}else{
            document.getElementById("score").style.backgroundColor="wheat"
            document.getElementById("score").innerHTML=`Tie!<br>${b3}<br>${b2}<br>${b1}<br>${b0}<br>Days:${ticks}`
        }
    }

}
var tickID;
STOPGAME=()=>{clearInterval(tickID)}
