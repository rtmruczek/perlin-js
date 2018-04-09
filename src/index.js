import { setGrayAtPixel } from './utils';
import perlin from './perlin';

const pixelGrid = perlin();

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
    let pixCount = 0;
    for (var i = 0; i < pix.length; i += 4) {
      const colorValue = pixelGrid[pixCount] * 255;
      setGrayAtPixel(pix, i, colorValue);
      pixCount++;
    }

    // Draw the ImageData at the given (x,y) coordinates.
    context.putImageData(imgd, 0, 0);
  }
}
