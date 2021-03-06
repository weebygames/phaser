Phaser.Component.Destroy = function () {};

Phaser.Component.Destroy.prototype = {

    /**
    * @property {boolean} destroyPhase - As a Sprite runs through its destroy method this flag is set to true, and can be checked in any sub-systems it is being destroyed from.
    * @readOnly
    */
    destroyPhase: false,

    /**
    * Destroys the Sprite. This removes it from its parent group, destroys the input, event and animation handlers if present
    * and nulls its reference to game, freeing it up for garbage collection.
    *
    * @method Phaser.Sprite#destroy
    * @memberof Phaser.Sprite
    * @param {boolean} [destroyChildren=true] - Should every child of this object have its destroy method called?
    */
    destroy: function(destroyChildren) {

        if (this.game === null || this.destroyPhase) { return; }

        if (typeof destroyChildren === 'undefined') { destroyChildren = true; }

        this.destroyPhase = true;

        if (this.events)
        {
            this.events.onDestroy$dispatch(this);
        }

        if (this.parent)
        {
            if (this.parent instanceof Phaser.Group)
            {
                this.parent.remove(this);
            }
            else
            {
                this.parent.removeChild(this);
            }
        }

        if (this.input)
        {
            this.input.destroy();
        }

        if (this.animations)
        {
            this.animations.destroy();
        }

        if (this.body)
        {
            this.body.destroy();
        }

        if (this.events)
        {
            this.events.destroy();
        }

        var i = this.children.length;

        if (destroyChildren)
        {
            while (i--)
            {
                this.children[i].destroy(destroyChildren);
            }
        }
        else
        {
            while (i--)
            {
                this.removeChild(this.children[i]);
            }
        }

        if (this._crop)
        {
            this._crop = null;
        }

        if (this._frame)
        {
            this._frame = null;
        }

        this.alive = false;
        this.exists = false;
        this.visible = false;

        this.filters = null;
        this.mask = null;
        this.game = null;

        this.destroyPhase = false;

    }

};
