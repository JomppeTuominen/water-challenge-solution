const BLOCK_SIZE = 50;
let waters = 0;
const paint = (index, val, waterVal) => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let columnH = val;
  ctx.fillStyle = "blue";
  let x = index * BLOCK_SIZE;
  let y = canvas.height - columnH * BLOCK_SIZE - waterVal * BLOCK_SIZE;

  let w = BLOCK_SIZE;
  let h = waterVal * BLOCK_SIZE;
  waters += waterVal;
  //ctx.fillStyle = "blue";
  let start = canvas.height;

  //}

  ctx.fillRect(x, y, w, h);
  // start painting
  //y = canvas.height;
  //let y2 = canvas.height;
  //setInterval(() => {
  //console.log(h);
  //y = canvas.height;
  //console.log(y);
  //if (y2 > y) y2--;
  //renderAnimation(ctx, x, y2, w, -1);
  //}, 60 / 1000);
  //renderAnimation(ctx, x, y, w, h);
  console.log("finished");
};
const renderAnimation = (ctx, x, y, w, h) => {
  //for (let i = h; i >= 0; i--) {
  //setInterval(() => {
  ctx.fillStyle = "blue";
  ctx.fillRect(x, y, w, h);
  //}, 1000);
  //}
  // ctx.fillRect(x, y, w, h);
  /*setInterval(() => {
    requestAnimationFrame(() => {
      console.log("hep");
    });
  }, 60 / 1000);*/
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
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  ctx.font = "20px Georgia";
  ctx.textAlign = "center";
  //arr = [1, 0, 2];
  arr.forEach((n, index) => {
    if (n > 0) {
      ctx.fillRect(
        index * BLOCK_SIZE,
        canvas.height - n * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE * n
      );

      ctx.fillText(
        n,
        index * BLOCK_SIZE + BLOCK_SIZE / 2,
        canvas.height - n * BLOCK_SIZE - BLOCK_SIZE / 4
      );
    }
  });
};
const generateColumnArray = () => {
  let columnCount = 20;
  let arr = [];
  for (let i = 0; i < columnCount; i++) {
    if (i > 0 && arr[i - 1] > 0) {
      arr.push(0);
    } else arr.push(Math.floor(Math.random() * 10));
  }
  return arr;
};
const setCanvasSize = (canvas, arr) => {
  canvas.width = arr.length * BLOCK_SIZE;
};
document.addEventListener("DOMContentLoaded", function(event) {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  let arr = generateColumnArray();
  setCanvasSize(canvas, arr);
  renderColumns(arr);

  let max = Math.max(...arr);
  let startIndex = arr.indexOf(max);
  let waterUnits = 0;
  if (startIndex > 0) goLeft(startIndex, arr);
  if (startIndex < arr.length - 1) goRight(startIndex, arr);

  ctx.fillStyle = "black";
  ctx.fillText(`Units of water: ${waters}`, canvas.width / 2, 50);
  console.log(arr);
});
