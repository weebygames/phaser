/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2014 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Sprites are the lifeblood of your game, used for nearly everything visual.
*
* At its most basic a Sprite consists of a set of coordinates and a texture that is rendered to the canvas.
* They also contain additional properties allowing for physics motion (via Sprite.body), input handling (via Sprite.input),
* events (via Sprite.events), animation (via Sprite.animations), camera culling and more. Please see the Examples for use cases.
*
* @class Phaser.Sprite
* @constructor
* @extends PIXI.Sprite
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {number} x - The x coordinate (in world space) to position the Sprite at.
* @param {number} y - The y coordinate (in world space) to position the Sprite at.
* @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
* @param {string|number} frame - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
*/
Phaser.Sprite = function (game, x, y, key, frame) {

    x = x || 0;
    y = y || 0;
    key = key || null;
    frame = frame || null;

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.SPRITE;

    PIXI.Sprite.call(this, PIXI.TextureCache['__default']);

    Phaser.Utils.mixinPrototype(this, Phaser.Component.Core.prototype);

    var components = [
        'Angle',
        'Animation',
        'AutoCull',
        'Bounds',
        'BringToTop',
        'Crop',
        'Delta',
        'Destroy',
        'FixedToCamera',
        'InputEnabled',
        'InWorld',
        'LifeSpan',
        'LoadTexture',
        'Overlap',
        'PhysicsBody',
        'Reset',
        'ScaleMinMax',
        'Smoothed'
    ];

    Phaser.Component.Core.install.call(this, components);
    Phaser.Component.Core.init.call(this, game, x, y, key, frame);

};

Phaser.Sprite.prototype = Object.create(PIXI.Sprite.prototype);
Phaser.Sprite.prototype.constructor = Phaser.Sprite;

/**
* Automatically called by World.preUpdate.
*
* @method Phaser.Sprite#preUpdate
* @memberof Phaser.Sprite
* @return {boolean} True if the Sprite was rendered, otherwise false.
*/
Phaser.Sprite.prototype.preUpdate = function() {

    Phaser.Component.PhysicsBody.preUpdate.call(this);
    Phaser.Component.LifeSpan.preUpdate.call(this);
    Phaser.Component.InWorld.preUpdate.call(this);
    Phaser.Component.Core.preUpdate.call(this);

    return true;

};
