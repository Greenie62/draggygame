var pieces = document.querySelectorAll(".piece");
var puzzleSlots = document.querySelectorAll(".puzzle");
var puzzleBoard = document.querySelector(".puzzleBoard");
var scoreDOM = document.querySelector(".score")
var timerDOM = document.querySelector(".timer")
var dialogueDOM=document.querySelector(".dialogue");
var bars = document.querySelectorAll('.bar');

var playSpan = document.querySelector(".playSpan")
var playTimerBtn = document.querySelector(".playTimerBtn")
var noTimerBtn = document.querySelector(".noTimerBtn")

var dynoBar = document.querySelector(".dynoBar");
var dynamite = document.querySelector(".dynamite");
var dynoWidth=0;

var score=0;
var counter = 0;
var timeCounter = 10;

var congrats=['Nice job!!','Smooth! :)', 'Correct!', 'Awesome!!']
var fail=['Idiot', "No, no, no!", "Thats not right!", " :("]

function flashDialogue(status){
    if(status === 'success'){
        dialogueDOM.innerHTML = congrats[Math.random() * congrats.length | 0]
    }
    else{
        dialogueDOM.innerHTML = fail[Math.random() * fail.length | 0]

    }
    setTimeout(()=>{
        dialogueDOM.innerHTML = ""
    },2000)
}

pieces.forEach(p=>{
    p.ondragstart=dragStart
    p.ondragend=dragStop
})


puzzleSlots.forEach(p=>{
    p.ondragenter=dragEnter;
    p.ondragleave=dragLeave;
    p.ondragover=dragOver;
    p.ondrop=dragDrop;
})

let currentPiece;
let currentShape;
let currentColor

function dragStart(e){
    currentPiece = e.target
    currentShape = e.target.getAttribute('data-shape')
    currentColor = e.target.getAttribute('data-color')
    console.log("dragStart()")
    setTimeout(()=>{
        e.target.style.backgroundColor='black'
    },100)
}

function dragStop(e){
    console.log("dragEnd()")
}

function dragDrop(e){
    e.target.style.opacity=1;
    // console.log(currentPiece)
    let destShape = e.target.getAttribute("data-shape");
    // console.log("Destshape: " + destShape)

    if(currentShape === destShape){
        console.log("its a match!!")
        score+=100;
        bars[counter].style.display='block'
        bars[counter].style.backgroundColor=currentColor
        flashDialogue('success')
        e.target.style.backgroundColor = currentColor
        counter++
    }
    else{
        console.log("you stink!!")
        flashDialogue('failure')
        score-=10;
        resetBoard()
        currentPiece.style.backgroundColor=currentColor
    }
    console.log("onDrop()")
    scoreDOM.innerHTML = score;


    if(counter === 3){
        setTimeout(()=>{
        alert("GameOver! \n Your score is " + score + " !")
        window.location.reload()
        },1250);
    }
    
}

function dragEnter(e){
    e.preventDefault()
    e.target.style.opacity=.7;
    console.log('dragEnter!!')
}
function dragLeave(e){
    e.target.style.opacity=1;
    e.preventDefault()

    console.log('dragLeave!!')
}
function dragOver(e){
    e.preventDefault()

    console.log('dragOver!!')
}

console.log(dynoBar)

function countDown(){

    timerDOM.innerHTML = timeCounter;
    dynoBar.style.width=`${dynoWidth}%`

    if(timeCounter > 0){
        setTimeout(()=>{
            timeCounter--
            countDown()
        },1000)
        dynoWidth+=10

    }
    else{
        console.log("GAME OVER!!")
        alert("GAME OVER!!")
    }
}

//   countDown()


function resetBoard(){
    console.log('reset game!')
    console.log(puzzleBoard)
     puzzleBoard.innerHTML = ""
  if(Math.random() < .3){
        puzzleBoard.appendChild(puzzleSlots[2])
        puzzleBoard.appendChild(puzzleSlots[0])
        puzzleBoard.appendChild(puzzleSlots[1])
     }
  else if(Math.random() > .3 && Math.random() < .6){
    puzzleBoard.appendChild(puzzleSlots[1])
    puzzleBoard.appendChild(puzzleSlots[2])
    puzzleBoard.appendChild(puzzleSlots[0])
  }
  else{
    puzzleBoard.appendChild(puzzleSlots[0])
    puzzleBoard.appendChild(puzzleSlots[1])
    puzzleBoard.appendChild(puzzleSlots[2])
  }
}

// resetBoard()


playTimerBtn.onclick=()=>{
    countDown()
    dialogueDOM.innerHTML="Brave player!!"
    playSpan.style.display='none'

    setTimeout(()=>{
        dialogueDOM.innerHTML=""
    },1500)
}


noTimerBtn.onclick=()=>{
    playSpan.style.display='none'
}

