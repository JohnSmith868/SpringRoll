import { Debugger } from './../../debug/Debugger';
/**
 *  CaptionPlayer is used to start, stop and update captions.
 *  it applies the content of an active caption to a given HTML Element.
 *
 * @export
 * @class CaptionPlayer
 */
export default class CaptionPlayer {
  // Maybe:(CaptionPlayer is written for playing a single caption at a time, minor rework would be required for multiple captions)

  /**
   * Creates an instance of CaptionPlayer.
   * @param {Object.<string, Caption>} captions - captions map.
   * @param {HTMLElement} element DOM element that content is written too.
   * @memberof CaptionPlayer
   */
  constructor(captions, element) {
    this.element = element;
    this.captions = captions;

    this.activeCaption = null;
  }

  /**
   * updates any currently playing caption
   * This ~should~ be called every frame.
   *
   * @param {Number} deltaTime Time passed in seconds since last update call.
   * @memberof CaptionPlayer
   */
  update(deltaTime) {
    if (this.activeCaption) {
      this.activeCaption.update(deltaTime);
      if (!this.activeCaption.isFinished()) {
        this.setElementContent(this.activeCaption.getContent());
        return;
      }
      this.stop();
    }
  }

  /**
   * Starts playing a caption.
   *
   * @param {String} name name of caption
   * @param {number} [time=0] start time in milliseconds
   * @returns {boolean} true is caption started
   * @memberof CaptionPlayer
   */
  start(name, time = 0) {
    this.stop();
    this.activeCaption = this.captions[name];
    if (this.activeCaption) {
      this.activeCaption.start(time);
      this.update(0);
    } else {
      Debugger.log('warn', `[CaptionPlayer.Start()] caption ${name} not found`);
    }
  }

  /**
   * Stops any caption currently playing
   * @memberof CaptionPlayer
   */
  stop() {
    this.activeCaption = null;
    this.setElementContent('');
    //Maybe: add onStopCallback?
  }

  /**
   * sets content of HTML element.
   *
   * @private
   * @param {String} content
   * @memberof CaptionPlayer
   */
  setElementContent(content) {
    this.element.innerHTML = content;
  }
}
