import cv from './opencv.js'

export default function grabCut(srcImg, newmask, rectInfo){

  let src = srcImg.clone()

  // let mat = cv.imread(src);
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);
 	let mask = new cv.Mat(newmask.rows, newmask.cols, newmask.type());
  let bgdModel = new cv.Mat();
  let fgdModel = new cv.Mat();
  let rect = new cv.Rect(rectInfo.left, rectInfo.top, rectInfo.width, rectInfo.height);
  cv.grabCut(src, mask, rect, bgdModel, fgdModel, 1, cv.GC_INIT_WITH_RECT);
  
  for (let i = 0; i < newmask.rows; i++) {
    for (let j = 0; j < newmask.cols; j++) {
      if (newmask.ucharPtr(i, j)[1] == 128) {
        // if green, tell the mask that it's foreground
        mask.ucharPtr(i, j)[0] = cv.GC_FGD;
        mask.ucharPtr(i, j)[1] = cv.GC_FGD;
        mask.ucharPtr(i, j)[2] = cv.GC_FGD;
      }
      if (newmask.ucharPtr(i, j)[0] == 255) {
        // if red, tell the mask that it's background
        mask.ucharPtr(i, j)[0] = cv.GC_BGD;
        mask.ucharPtr(i, j)[1] = cv.GC_BGD;
        mask.ucharPtr(i, j)[2] = cv.GC_BGD;
      }
    }
  }
  
  cv.grabCut(src, mask, rect, bgdModel, fgdModel, 1, cv.GC_INIT_WITH_MASK);

  // draw foreground
  for (let i = 0; i < src.rows; i++) {
    for (let j = 0; j < src.cols; j++) {
      if (mask.ucharPtr(i, j)[0] == 0 || mask.ucharPtr(i, j)[0] == 2) {
        src.ucharPtr(i, j)[0] = 0;
        src.ucharPtr(i, j)[1] = 0;
        src.ucharPtr(i, j)[2] = 0;
      }
    }
  }
  // draw grab rect
  let color = new cv.Scalar(0, 0, 0);
  let point1 = new cv.Point(rect.x, rect.y);
  let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
  cv.rectangle(src, point1, point2, color);
  // src.delete();
  mask.delete();
  bgdModel.delete();
  fgdModel.delete();
  return src
}


//----------------------------------------------

// inputElement.addEventListener("change",(e) => {
//     imgElement.src = URL.createObjectURL(e.target.files[0]);
//   },false);

// imgElement.onload = function () {
//   let mat = cv.imread(imgElement);
//   cv.imshow("canvasInput", mat);
//   mat.delete();
//   document.getElementById("fg").disabled = false;
//   document.getElementById("bg").disabled = false;
//   document.getElementById("validate").disabled = false;
//   adjustContainerAndLayer();
// }





