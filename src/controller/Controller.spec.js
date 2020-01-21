import { Controller } from './Controller';
import { newEvent, isIE11 } from '../debug';
import Sinon from 'sinon';

describe('controller', () => {
  it('Should accept a array of buttons', () => {
    const controller = new Controller([
      {
        key: 'Enter',
        down: console.log('key down')
      },
      { key: 'w', down: console.log('key down') },
      { key: 'a', down: console.log('key down') },
      { key: 's', down: console.log('key down') },
      { key: 'd', down: console.log('key down') },
      { key: ' ', down: console.log('key down') }
    ]);

    expect(controller.keys.length).to.equal(6);
  });

  it('Should call functions on key press', () => {
    const callback = Sinon.fake();
    const controller = new Controller([
      { key: 'enter', down: callback }
    ]);

    const event = newEvent('keydown');
    event.key = 'Enter';
    window.dispatchEvent(event);
    controller.update();

    expect(callback.callCount).to.equal(1);
  });

  it('Should not be case-sensitive', () => {
    const callback = Sinon.fake();
    const controller = new Controller([
      { key: 'EnTeR', down: callback}
    ]);

    const event = newEvent('keydown');
    event.key = 'Enter';
    window.dispatchEvent(event);
    controller.update();

    expect(callback.callCount).to.equal(1);
  });

  it('Should not call functions when key is not pressed', () => {
    const callback = Sinon.fake();
    const controller = new Controller([
      { key: 'Enter', down: callback }
    ]);

    const eventDown = newEvent('keydown');
    eventDown.key = 'Enter';
    window.dispatchEvent(eventDown);

    const eventUp = newEvent('keyup');
    eventUp.key = 'Enter';
    window.dispatchEvent(eventUp);

    controller.update();

    expect(callback.callCount).to.equal(0);
  });

  it('Should call up function on blur if the key was down', done => {
    const controller = new Controller([
      {
        key: 'Enter',
        up: function() {
          done();
        }.bind(this)
      }
    ]);

    const eventDown = newEvent('keydown');
    eventDown.key = 'Enter';
    window.dispatchEvent(eventDown);

    const blurEvent = newEvent('blur');
    window.dispatchEvent(blurEvent);

    controller.update();
  });

  it('Should not call up function on blur if the key was not down', done => {
    const controller = new Controller([
      {
        key: 'Enter',
        up: function() {
          done(new Error());
        }.bind(this)
      }
    ]);

    const blurEvent = newEvent('blur');
    window.dispatchEvent(blurEvent);

    controller.update();

    controller.update();
    setTimeout(() => {
      done();
    }, 10);
  });

  it('should map "left" to "leftarrow" event (needed for IE)', function() {
    const callback = Sinon.fake();
    const controller = new Controller([
      { key: 'left', down: callback}
    ]);

    const event = newEvent('keydown');
    event.key = 'leftArrow';
    window.dispatchEvent(event);
    controller.update();

    expect(callback.callCount).to.equal(1);
  });

  it('should map "right" to "rightarrow" event (needed for IE)', function() {
    const callback = Sinon.fake();
    const controller = new Controller([
      { key: 'right', down: callback}
    ]);

    const event = newEvent('keydown');
    event.key = 'rightArrow';
    window.dispatchEvent(event);
    controller.update();

    expect(callback.callCount).to.equal(1);
  });

  it('should map "up" to "uparrow" event (needed for IE)', function() {
    const callback = Sinon.fake();
    const controller = new Controller([
      { key: 'up', down: callback}
    ]);

    const event = newEvent('keydown');
    event.key = 'upArrow';
    window.dispatchEvent(event);
    controller.update();

    expect(callback.callCount).to.equal(1);
  });

  it('should map "down" to "downarrow" event (needed for IE)', function() {
    const callback = Sinon.fake();
    const controller = new Controller([
      { key: 'down', down: callback}
    ]);

    const event = newEvent('keydown');
    event.key = 'downArrow';
    window.dispatchEvent(event);
    controller.update();

    expect(callback.callCount).to.equal(1);
  });
});
