
function throttle(func, delay) {
  let prev = Date.now();
  return function() {
    const context = this;
    const args = arguments;
    const now = Date.now();
    console.log(now - prev, delay);
    if (now - prev >= delay) {
      // console.log(111, delay);
      func.apply(context, args);
      prev = Date.now();
    }
  };
}

export default throttle;