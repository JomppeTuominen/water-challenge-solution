"use strict";
const BLOCK_SIZE = 50;
const COLUMN_COLOR = "#212121";
const WATER_COLOR = "#64B5F6";
let waters = 0;
let CANVAS, CTX;

document.addEventListener("DOMContentLoaded", function(event) {
  CANVAS = document.getElementById("canvas");
  CTX = CANVAS.getContext("2d");
  document.getElementById("draw-btn").addEventListener("click", function() {
    let input = document.getElementById("columns-count");
    let val = getUserValue();
    start(val);
  });
  start(20);
});

const getUserValue = () => {
  let input = document.getElementById("columns-count");
  let val = input.value;
  if (val < 3) val = 3;
  else if (val > 99) val = 99;
  input.value = val;
  return val;
};

const renderResultText = () => {
  let elem = document.getElementById("count");
  elem.innerHTML = ` ${waters}`;
};
const paint = (index, val, waterVal) => {
  let columnH = val;
  CTX.fillStyle = WATER_COLOR;
  let x = index * BLOCK_SIZE;
  let y = CANVAS.height - columnH * BLOCK_SIZE - waterVal * BLOCK_SIZE;

  let w = BLOCK_SIZE;
  let h = waterVal * BLOCK_SIZE;
  waters += waterVal;
  let start = CANVAS.height;

  CTX.fillRect(x, y, w, h);
};

const goLeft = (from, arr) => {
  let slice = arr.slice(0, from);
  let maxOfLeft = Math.max(...slice);
  let maxOfLeftIndex = arr.indexOf(maxOfLeft);
  let waterVal = 0;
  for (let i = from - 1; i >= 0; i--) {
    if (i < maxOfLeftIndex) {
      // get new max
      slice = slice.slice(0, i);
      if (slice.length > 0) {
        maxOfLeft = Math.max(...slice);
        maxOfLeftIndex = arr.indexOf(maxOfLeft);
      }
    }
    let val = arr[i];
    waterVal = maxOfLeft - val;
    paint(i, val, waterVal);
  }
};

const goRight = (from, arr) => {
  let slice = arr.slice(from + 1, arr.length);
  let maxOfRight = Math.max(...slice);
  let maxOfRightIndex = arr.indexOf(maxOfRight);
  let waterVal = 0;
  for (let i = from + 1; i <= arr.length - 1; i++) {
    if (i > maxOfRightIndex) {
      // get new max
      slice = arr.slice(i, arr.length);
      if (slice.length > 0) {
        maxOfRight = Math.max(...slice);
        maxOfRightIndex = arr.indexOf(maxOfRight);
      }
    }
    let val = arr[i];
    waterVal = maxOfRight - val;
    paint(i, val, waterVal);
  }
};

const renderColumns = arr => {
  arr.forEach((n, index) => {
    if (n > 0) {
      CTX.fillStyle = COLUMN_COLOR;
      CTX.fillRect(
        index * BLOCK_SIZE,
        CANVAS.height - n * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE * n
      );
    }
  });
};

const generateColumnArray = columnCount => {
  let arr = [];
  for (let i = 0; i < columnCount; i++) {
    if (i > 0 && arr[i - 1] > 0) {
      arr.push(0);
    } else arr.push(Math.floor(Math.random() * 12));
  }
  return arr;
};

const setCanvasSize = arr => {
  CANVAS.width = arr.length * BLOCK_SIZE;
};

const start = columnCount => {
  waters = 0;
  let arr = generateColumnArray(columnCount);
  setCanvasSize(arr);
  renderColumns(arr);

  let max = Math.max(...arr);
  let startIndex = arr.indexOf(max);
  if (startIndex > 0) goLeft(startIndex, arr);
  if (startIndex < arr.length - 1) goRight(startIndex, arr);
  renderResultText();
};
