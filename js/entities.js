﻿/// <reference path="melonJS-0.9.7.js" />
console.log("Commit 82");
var PlayerEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(3, 3); // Init values : 3; 15
        this.setFriction(0.2, 0.2);
        this.type = "player";
        me.game.viewport.follow(this, me.game.viewport.AXIS.HORIZONTAL);
        this.gravity = 0;
        this.collidable = true;
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.ENTER, "push");

        this.renderable.addAnimation("walk", [0]);
        this.renderable.addAnimation("push", [1]);
        this.renderable.setCurrentAnimation("walk");
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
            this.vel.y -= this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            this.vel.y += this.accel.y * me.timer.tick;
        }

        this.updateMovement();
        var res = me.game.collide(this);
        if (res && res.obj.type=="moveableitem") {
            if (this.vel.x != 0 || this.vel.y != 0) {
                this.vel.x = 0;
                console.log("Collision : Plr PosX : " + this.pos.x + " / Obj PosX : " + res.obj.pos.x + " / DeltaX : " + res.x);
                console.log("            Plr PosY : " + Math.round(this.pos.y) + " / Obj PosY : " + res.obj.pos.y + " / DeltaY : " + Math.round(res.y));
                if (res.y > 0) {
                    console.log("Obj is under.");
                    //this.vel.y = -1;
                    this.pos.y -= 30;
                }
                else if (res.x > 0) {
                    console.log("Obj is on the right.");
                    this.pos.x -= 3;
                    if (me.input.isKeyPressed('push')) {
                        res.obj.pos.x += 4;
                    }
                } else if (res.x < 0) {
                    console.log("Obj is on the left.");
                    this.pos.x += 3;
                    if (me.input.isKeyPressed('push')) {
                        res.obj.pos.x -= 4;
                    }
                }
            }
            this.updateMovement();
            this.parent(this);
            return true;
        }

        // Check if moved
        if (this.vel.x != 0 || this.vel.y != 0) {
            this.parent(this);
            return true;
        }

        return false;
    }
})

var MoveableItem = me.ObjectEntity.extend({
    //We can move this entity.
    // ==> Check for collide
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.type = "moveableitem";
        this.collidable = true;
        this.setVelocity(3, 3);
        this.gravity = 0;
        /*this.renderable = new me.AnimationSheet(0, 0, "furnitures", 16, 16);
        settings.spritewidth = 16;
        settings.spriteheight = 16;*/
        this.renderable.addAnimation("sofa", [1]);
        this.renderable.setCurrentAnimation(settings.type);
        this.weight = 1;
    },
    update: function () {
        

        if (this.vel.x != 0 || this.vel.y != 0) {
            this.parent(this);
            return true;
        }

        return false;
    }
});

