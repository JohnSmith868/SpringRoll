import Property from './Property.js';

/**
 * A class for managing a group of subscribable properties together. Allows for the registration of new properties.
 * @class StateManager
 * For example:
 * var manager = new StateManager();
 * manager.addField('paused', false);
 * manager.paused.subscribe(function(newValue) {
 *   console.log('New value is ', newValue);
 * })
 *
 * manager.paused = true;
 * @class StateManager
 */
export default class StateManager {
  /**
   * Adds a new subscribable field field to the state manager. Throws an error if the field already exists.
   * @param {String} name The name of the field.
   * @param {Any} initialValue The initial value of the property.
   * @return Property The newly created property.
   */
  addField(name, initialValue) {
    if ('undefined' !== typeof this[name]) {
      throw new Error('"' + name + '" is already a registered property');
    }

    this[name] = new Property(initialValue);
    return this[name];
  }
}
