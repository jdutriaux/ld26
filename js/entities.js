﻿/// <reference path="melonJS-0.9.7.js" />

var PlayerEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(3, 15);

        me.game.viewport.follow(this, me.game.viewport.AXIS.HORIZONTAL);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        this.renderable.addAnimation("walk", [0]);
    },

    update: function () {
        if (me.input.isKeyPressed('left')) {
            this.vel.x -= this.accel.x * me.timer.tick;
            this.flipX(true);
        } else if (me.input.isKeyPressed('right')) {
            this.vel.x += this.accel.x * me.timer.tick;
            this.flipX(false);
        }

        if (me.input.isKeyPressed('up')) {
            this.vel.y += this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            this.vel.y -= this.accel.y * me.timer.tick;
        }

        this.updateMovement();


        // Check if moved
        if (this.vel.x != 0 || this.vel.y != 0) {
            this.parent();
            return true;
        }

        return false;
    }
})

var MoveableItem = me.ObjectEntity.extend({
    //We can move this entity.
    // ==> Check for collide
    init: function (x, y, settings) {
        me.input.bindKey(me.input.KEY.ENTER, "push");
    },
    update: function () {
        if (this.vel.x != 0 || this.vel.y != 0) {
            this.parent();
            return true;
        }

        return false;
    },
    onCollide: function (res, obj) {
        if (res.type == "player") {
            if (me.input.isKeyPressed('push')) {
                this.vel.x = res.vel.x / this.weight;
                this.vel.y = res.vel.y / this.weight;
            } else {
                res.vel.x = 0;
                res.vel.y = 0;
            }
        }
    }
});