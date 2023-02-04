// class for each player in the three player game
class Player
{
    constructor(name, color, turn)
    {
        this.name = name;
        this.color = color;
        this.turn = turn
        this.points = 0;
    }
}

// player objects referenced by color, turn, and points throughout code
let player1 = new Player("player1", "blue", true);
let player2 = new Player("player2", "red", false);
let player3 = new Player("player3", "green", false);

// class that tracks lines within each square and if the square is complete
class Square
{
    constructor(top, left, bottom, right, id)
    {
        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
        this.id = id;
        this.top_chosen = false;
        this.left_chosen = false;
        this.bottom_chosen = false;
        this.right_chosen = false;
        this.taken = false;
    }
}

// all lines have ids corresponding to main.html and such ids are used to check if line is selected
// all square objects are stored in an array of objects to loop through for checks and updates
let squares = [];

// row one
let squareA = new Square(20,0,24,1,40);
squares.push(squareA);
let squareB = new Square(21,1,25,2,41);
squares.push(squareB);
let squareC = new Square(22,2,26,3,42);
squares.push(squareC);
let squareD = new Square(23,3,27,4,43);
squares.push(squareD);

// row two
let squareE = new Square(24,5,28,6,44);
squares.push(squareE);
let squareF = new Square(25,6,29,7,45);
squares.push(squareF);
let squareG = new Square(26,7,30,8,46);
squares.push(squareG);
let squareH = new Square(27,8,31,9,47);
squares.push(squareH);

// row three
let squareI = new Square(28,10,32,11,48);
squares.push(squareI);
let squareJ = new Square(29,11,33,12,49);
squares.push(squareJ);
let squareK = new Square(30,12,34,13,50);
squares.push(squareK);
let squareL = new Square(31,13,35,14,51);
squares.push(squareL);

// row four
let squareM = new Square(32,15,36,16,52);
squares.push(squareM);
let squareN = new Square(33,16,37,17,53);
squares.push(squareN);
let squareO = new Square(34,17,38,18,54);
squares.push(squareO);
let squareP = new Square(35,18,39,19,55);
squares.push(squareP);

// update line within square with color and boolean
function updateSquare(id, color)
{
    for(let i = 0; i < squares.length; i++)
    {
        if(squares[i].top === id)
        {
            squares[i].top_chosen = true;
            squares[i].top_color = color;
        }
        if(squares[i].left === id)
        {
            squares[i].left_chosen = true;
            squares[i].left_color = color;
        }
        if(squares[i].bottom === id)
        {
            squares[i].bottom_chosen = true;
            squares[i].bottom_color = color;
        }
        if(squares[i].right === id)
        {
            squares[i].right_chosen = true;
            squares[i].right_color = color;
        }
    }
}

// check if all squares are chosen to end game
function allSquareChosen()
{
    let points = 0;
    for(let i = 0; i < squares.length; i++)
    {
        if(squares[i].top_chosen === true && squares[i].left_chosen === true && squares[i].bottom_chosen === true && squares[i].right_chosen === true)
        {
            points++;
        }
    }
    return points === 16;
}

// check if all lines in square are chosen
function isChosen(id)
{
    for(let i = 0; i < squares.length; i++)
    {
        if(squares[i].top === id && squares[i].top_chosen)
            return true;
        if(squares[i].left === id && squares[i].left_chosen)
            return true;
        if(squares[i].bottom === id && squares[i].bottom_chosen)
            return true;
        if(squares[i].right === id && squares[i].right_chosen)
            return true;
    }
    return false;
}

// check results logic to decipher the winner or tie game
function checkWinner(p1, p2, p3)
{
    if((p1 === p2 && p1 > p3) || (p1 === p3 && p1 > p2) || (p2 === p3 && p2 > p1) || (p1 === p2 && p1 === p3))
    {
        document.getElementById("winner").innerHTML = "Tie Game!"
    }
    else if(p1 > p2 && p1 > p3)
    {
        let winner = document.getElementById("winner");
        winner.style.color = "blue";
        winner.innerHTML = "Blue is the winner!"
    }
    else if(p2 > p1 && p2 > p3)
    {
        let winner = document.getElementById("winner");
        winner.style.color = "red";
        winner.innerHTML = "Red is the winner!"
    }
    else if(p3 > p1 && p3 > p2)
    {
        let winner = document.getElementById("winner");
        winner.style.color = "green";
        winner.innerHTML = "Green is the winner!"
    }
}

// write score to results.html
function writeFinalScore()
{
    const points1 = localStorage.getItem("p1");
    const points2 = localStorage.getItem("p2");
    const points3 = localStorage.getItem("p3");
    document.getElementById("blue2").innerHTML = "Blue: " + points1;
    document.getElementById("red2").innerHTML = "Red: " + points2;
    document.getElementById("green2").innerHTML = "Green: " + points3;
    checkWinner(points1, points2, points3);
}

// write score to main.html
function writeScore(color)
{
    if(player1.color === color)
    {
        document.getElementById("blue").innerHTML = "Blue: " + player1.points;
    }
    else if(player2.color === color)
    {
        document.getElementById("red").innerHTML = "Red: " + player2.points;
    }
    else if(player3.color === color)
    {
        document.getElementById("green").innerHTML = "Green: " + player3.points;
    }
}

// dynamically updates score each legal click
function updateScore(color)
{
    let points = 0;
    for(let i = 0; i < squares.length; i++)
    {
        if(squares[i].top_chosen && squares[i].left_chosen && squares[i].bottom_chosen && squares[i].right_chosen)
        {
            if(squares[i].taken === false)
            {
                document.getElementById(squares[i].id).style.background = color;
                document.getElementById(squares[i].left).style.opacity = 0;
                document.getElementById(squares[i].bottom).style.opacity = 0;
                document.getElementById(squares[i].right).style.opacity = 0;
                document.getElementById(squares[i].top).style.opacity = 0;
                document.getElementById(squares[i].id).style.border = "0.01em solid black";
                squares[i].taken = true;
                points++;
            }
        }
    }
    if(player1.color === color)
    {
        player1.points += points;
        return player1.points;
    }
    else if(player2.color === color)
    {
        player2.points += points;
        return player2.points;
    }
    else if(player3.color === color)
    {
        player3.points += points;
        return player3.points;
    }
}

// return number of player points
function getPoints(color)
{
    if(player1.color === color)
    {
        return player1.points;
    }
    else if(player2.color === color)
    {
        return player2.points;
    }
    else if(player3.color === color)
    {
        return player3.points;
    }
}

// handles each click by deciphering game logic and rules (legal/illegal moves). Calls helper function
function handleClick(node, color)
{
    let id = Number(node.getAttribute('id'));
    console.log(id);
    if(isChosen(id))
    {
        choose_player();
    }
    else
    {
        let currentPoints = getPoints(color);
        node.style.backgroundColor = color;
        updateSquare(id, color);
        let updatedPoints = updateScore(color);
        writeScore(color);
        console.log(currentPoints, updatedPoints);
        if(currentPoints < updatedPoints)
            choose_player();
        else
        {
            if(player1.turn)
            {
                player1.turn = false;
                player2.turn = true;
            }
            else if(player2.turn)
            {
                player2.turn = false;
                player3.turn = true;
            }
            else if(player3.turn)
            {
                player3.turn = false;
                player1.turn = true;
            }
            choose_player();
        }
    }
}

// listens for click to change color of lines and uses promises for waiting
function changeColor(player) {
    return new Promise((resolve, reject) => {
        let color = player.color;
        let nodes = document.querySelectorAll(".horiz_line, .vert_line, .vert_line2")
        for(let i = 0; i < nodes.length; i++)
        {
            nodes[i].onclick = () => handleClick(nodes[i], color);
        }
        resolve(false);
        reject(true);
    })
}

// switches each player after turn until all squares chosen and game is over
function choose_player()
{
   if(allSquareChosen())
   {
       localStorage.setItem("p1", player1.points);
       localStorage.setItem("p2", player2.points);
       localStorage.setItem("p3", player3.points);
       document.location.href="results.html";
   }
   else
   {
       if(player1.turn)
       {
           player1.turn = changeColor(player1);
       }
       else if(player2.turn)
       {
           player2.turn = changeColor(player2);
       }
       else if(player3.turn)
       {
           player3.turn = changeColor(player3);
       }
   }
}
choose_player();