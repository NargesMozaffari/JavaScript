"use strict";

const creatCells = function () {
  const container = document.querySelector(".container");
  for (let i = 0; i < 81; i++) {
    const divTag = document.createElement("div");
    divTag.classList.add("cell");
    container.appendChild(divTag);
  }
};

const matrix = function (rows, cols, AllCells, counter) {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr.push([]);
    arr[i].push([]);
    for (let j = 0; j < cols; j++) {
      arr[i][j] = AllCells[counter];
      counter++;
    }
  }
  return arr;
};

const reset = function () {
  let appleX;
  let appleY;

  const apple = function (cells, snake) {
    appleX = Math.floor(Math.random() * 9);
    appleY = Math.floor(Math.random() * 9);
    if (cells[appleY][appleX].classList.contains("snake")) {
      apple(cells, snake);
    }
    cells[appleY][appleX].classList.add("apple");
  };

  let currentDirection;

  const setDirection = function (direction) {
    currentDirection = direction;
  };

  const direction = function () {
    let currentDirection;
    document.body.addEventListener("keydown", function (event) {
      //up
      if (event.keyCode == 38) {
        currentDirection = "up";
        setDirection(currentDirection);
      }
      //down
      if (event.keyCode == 40) {
        currentDirection = "down";
        setDirection(currentDirection);
      }
      //left
      if (event.keyCode == 37) {
        currentDirection = "left";
        setDirection(currentDirection);
      }
      //right
      if (event.keyCode == 39) {
        currentDirection = "right";
        setDirection(currentDirection);
      }
    });
  };

  let positionX = 0;
  let positionY = 0;
  let intervalId = null;
  const snake = [];

  const breakin = function (cells, snake, x, y) {
    if (
      snake[0].classList.contains("snake") &&
      cells[y][x].classList.contains("snake")
    ) {
      prompt("game over");
      clearInterval(intervalId);
      return;
    }
  };

  const movements = function (cells, snake) {
    if (
      snake[0].classList.contains("snake") &&
      snake[0].classList.contains("apple")
    ) {
      apple(cells, snake);
      cells[positionY][positionX].classList.remove("apple");
      cells[positionY][positionX].classList.add("snake");
      snake.unshift(cells[positionY][positionX]);
    }

    //up
    if (currentDirection == "up") {
      if (positionY - 1 < 0) {
        prompt("game over");
        clearInterval(intervalId);
        return;
      }
      breakin(cells, snake, positionX, positionY - 1);
      snake.pop().classList.remove("snake");
      snake.unshift(cells[--positionY][positionX]);
      snake[0].classList.add("snake");
    }

    //down
    if (currentDirection == "down") {
      if (positionY + 1 > 8) {
        prompt("game over");
        clearInterval(intervalId);
        return;
      }
      breakin(cells, snake, positionX, positionY + 1);
      snake.pop().classList.remove("snake");
      snake.unshift(cells[++positionY][positionX]);
      snake[0].classList.add("snake");
    }

    //left
    if (currentDirection == "left") {
      if (positionX - 1 < 0) {
        prompt("game over");
        clearInterval(intervalId);
        return;
      }
      breakin(cells, snake, positionX - 1, positionY);
      snake.pop().classList.remove("snake");
      snake.unshift(cells[positionY][--positionX]);
      snake[0].classList.add("snake");
    }

    //right
    if (currentDirection == "right") {
      if (positionX + 1 > 8) {
        prompt("game over");
        clearInterval(intervalId);
        cells[appleY][appleX].classList.remove("apple");
        cells[positionY][positionX].classList.remove("snake");
        reset();
        return;
      }
      breakin(cells, snake, positionX + 1, positionY);
      snake.pop().classList.remove("snake");
      snake.unshift(cells[positionY][++positionX]);
      snake[0].classList.add("snake");
    }
  };

  creatCells();
  const AllCells = document.querySelectorAll(".cell");
  const cells = matrix(9, 9, AllCells, 0);
  snake.push(cells[0][0]);
  apple(cells, snake);
  cells[0][0].classList.add("snake");
  direction();
  intervalId = setInterval(() => movements(cells, snake), 1000 / 3);
};
reset();
