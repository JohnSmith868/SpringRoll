/**
 * Simplifies listening to resize events by passing the relevant data to a provided callback
 * @param {Function} [callback=undefined]
 * @property {Function} [callback=undefined]
 */
export class ScaleManager {
  /**
   *Creates an instance of ScaleManager.
   */
  constructor(callback = undefined) {
    this.currentWidth = 1;
    this.currentHeight = 1;
    this.callback = undefined;

    if (this.isFunction(callback)) {
      this.enable(callback);
    }

    this.onResize = this.onResize.bind(this);
  }

  /**
   * onResize maps and passes the relevant to the user provided callback function
   * @param {UIEvent} event
   * @private
   */
  onResize(event) {
    const width = event.target.innerWidth;
    const height = event.target.innerHeight;

    if (1 < width || 1 < height) {
      this.width = width;
      this.height = height;
    }

    this.callback({
      width,
      height,
      scale: {
        ratio: width / height,
        x: width / this.width,
        y: height / this.height
      }
    });

    this.width = width;
    this.height = height;
  }

  /**
   * Enables the scale manager listener. Will not be enabled if a callback is not supplied
   * @param {Function} callback the function to be called on resize events
   */
  enable(callback = undefined) {
    if (this.isFunction(callback)) {
      this.callback = callback;
      window.addEventListener('resize', this.onResize);
    } else {
      console.warn('Scale Manager was not passed a function');
    }
  }

  /**
   * Disabled the scale manager
   */
  disable() {
    window.removeEventListener('resize', this.onResize);
  }

  /**
   * Helper function to test if arg is a function or not
   * @param {Function} func
   * @private
   * @returns {boolean}
   */
  isFunction(func) {
    return func && 'function' === typeof func ? true : false;
  }
}
