
const setColorAtPixel = (pix, i, rgba) => {
  pix[i] = rgba.r;
  pix[i + 1] = rgba.g;
  pix[i + 2] = rgba.b;
  pix[i + 3] = rgba.a;
};

const setGrayAtPixel = (pix, i, value) => setColorAtPixel(pix, i, {r: value, g: value, b: value, a: 255});

export { setColorAtPixel, setGrayAtPixel };
