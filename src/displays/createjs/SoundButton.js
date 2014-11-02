/**
*  @module CreateJS Display
*  @namespace springroll.createjs
*/
(function(){

	var Button = include('springroll.createjs.Button'),
		Sound;

	/**
	 *  A button with audio events for click and over mouse events
	 *  @class SoundButton
	 *  @extends springroll.createjs.Button
	 *  @constructor
	 *  @param {DOMElement|object} imageSettings The loaded image element, see springroll.createjs.Button constructor
	 *  @param {Object} [label=null] See springroll.createjs.Button constructor
	 *  @param {Boolean} [enabled=true] If the button should be enabled by default
	 *  @param {String} [clickAlias="ButtonClick"] The button click audio alias
	 *  @param {String} [overAlias="ButtonRollover"] The button rollover audio alias
	 */
	var SoundButton = function(imageSettings, label, enabled, clickAlias, overAlias)
	{
		Sound = include('springroll.Sound');

		Button.call(this, imageSettings, label, enabled);

		/**
		 *  The audio alias to use for click events
		 *  @property {String} clickAlias
		 */
		this.clickAlias = clickAlias || "ButtonClick";

		/**
		 *  The audio alias to use for mouse over events
		 *  @property {String} overAlias
		 */
		this.overAlias = overAlias || "ButtonRollover";

		/**
		 *  If the audio is enabled
		 *  @property {Boolean} _audioEnabled
		 *  @private
		 */
		this._audioEnabled = true;

		this._onRollover = this._onRollover.bind(this);
		this._onButtonPress = this._onButtonPress.bind(this);

		// add listeners
		this.addEventListener('rollover', this._onRollover);
		this.addEventListener(Button.BUTTON_PRESS, this._onButtonPress);
	};

	// Reference to the super prototype
	var s = Button.prototype;

	// Reference to the prototype
	var p = SoundButton.prototype = Object.create(s);

	/**
	 *  Handler for the BUTTON_PRESS event
	 *  @method _onButtonPress
	 *  @private
	 */
	p._onButtonPress = function(e)
	{
		if (this.clickAlias && this._audioEnabled)
		{
			Sound.instance.play(this.clickAlias);
		}
	};

	/**
	 *  Handler for rollover event.
	 *  @method _onRollover
	 *  @private
	 */
	p._onRollover = function(e)
	{
		if (this.overAlias && this.enabled && this._audioEnabled)
		{
			Sound.instance.play(this.overAlias);
		}	
	};

	/**
	 *  If audio should be played for this button.
	 *  @property {Boolean} audioEnabled
	 */
	Object.defineProperty(p, "audioEnabled",
	{
		get: function()
		{
			return this._audioEnabled;
		},
		set: function(enabled)
		{
			this._audioEnabled = enabled;
		}
	});

	/**
	 *  Don't use after this
	 *  @method destroy
	 */
	p.destroy = function()
	{
		this.removeEventListener("rollover", this._onRollover);
		this.removeEventListener(Button.BUTTON_PRESS, this._onButtonPress);
		this.audioEnabled = false;
		s.destroy.apply(this);
	};

	// Assign to namespace
	namespace('springroll').SoundButton = SoundButton;
	namespace('springroll.createjs').SoundButton = SoundButton;

}());