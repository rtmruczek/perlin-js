var elem = document.getElementById('myCanvas');
if (elem && elem.getContext) {
  // Get the 2d context.
  // Remember: you can only initialize one context per element.
  var context = elem.getContext('2d');
  if (context) {
    // Get the CanvasPixelArray from the given coordinates and dimensions.
    var imgd = context.getImageData(0, 0, 800, 600);
    var pix = imgd.data;

    // Loop over each pixel and invert the color.
    for (var i = 0, n = pix.length; i < n; i += 4) {
      pix[i] = 0;
      pix[i + 1] = 0;
      pix[i + 2] = 0;
      pix[i + 3] = 255;
    }

    // Draw the ImageData at the given (x,y) coordinates.
    context.putImageData(imgd, 0, 0);
  }
}
