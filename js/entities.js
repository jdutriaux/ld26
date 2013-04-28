﻿/// <reference path="melonJS-0.9.7.js" />
<<<<<<< HEAD
var IsDummy = false,
    PlayerDirection = "top",
    selectedItem = null,
    selectedSprite,
    playerEntityGuid;
=======
var IsDummy = false, PlayerDirection = "top", selectedItem = null, selectedSprite;
console.log("Commit 144");
>>>>>>> 67971feca1351b8cd0855e116e4c0a4c47c8b9d0

function getSmoothGridPos(pos) {
    return { x: pos.x / 32, y: pos.y / 32 };
}

function getGridPos(pos) {
    var rep = getSmoothGridPos(pos);
    rep.x = Math.floor(rep.x + 0.5);
    rep.y = Math.floor(rep.y + 0.5);
    return rep;
}

<<<<<<< HEAD
=======

>>>>>>> 67971feca1351b8cd0855e116e4c0a4c47c8b9d0
var PlayerEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(2, 2);
        this.setMaxVelocity(2, 2);
        this.setFriction(0.5, 0.5);
        this.type = "player";
        me.game.viewport.follow(this, me.game.viewport.AXIS.HORIZONTAL);
        this.gravity = 0;
        this.collidable = true;
        this.width = settings.spritewidth;
        this.height = settings.spriteheight;
        playerEntityGuid = this.GUID;

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.Q, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.Z, "up");
        me.input.bindKey(me.input.KEY.S, "down");
        me.input.bindKey(me.input.KEY.ENTER, "push");

        this.renderable.addAnimation("walkright", [1, 5, 9]);
        this.renderable.addAnimation("walkleft", [2, 6, 10]);
        this.renderable.addAnimation("walktop", [0, 4, 8]);
        this.renderable.addAnimation("walkbottom", [3, 7, 11]);
        this.renderable.setCurrentAnimation("walktop");
        this.power = {
            "jumpover": false,
            "pull": false,
            "putbehind": false,
            "superpush": false,
            "doorbypass": false,
            "remove": false
        };
        this.lastPositions = { x: this.pos.x, y: this.pos.y };
        this.sGridPos = getSmoothGridPos(this.pos);
        this.prevSGridPos = getSmoothGridPos(this.lastPositions);
<<<<<<< HEAD
        this.hardPos = getGridPos(this.pos);
        this.lastHardPos = getGridPos(this.lastPositions);
        this.blocked = getGridPos(this.pos);
        this.blocked.since = 30;
        this.readyNode = true;
        this.onNodeSince = 30;
        this.absOnGrid = 0;
=======

        this.hardPos = getGridPos(this.pos);
        this.lastHardPos = getGridPos(this.lastPositions);

        this.blocked = getGridPos(this.pos);
        this.blocked.since = 30;

        this.readyNode = true;
        this.onNodeSince = 30;

        this.absOnGrid = 0;

        this.collisiondInterp = 4;
>>>>>>> 67971feca1351b8cd0855e116e4c0a4c47c8b9d0
    },
    changedirection: function (direction) {
        PlayerDirection = direction;
        this.renderable.setCurrentAnimation("walk" + direction);
    },
    usePower: function (power) {
        if (this.power[power] && selectedItem) {
            switch (power) {
                case "jumpover":
                    // Jumping over an item
                    break;
                case "pull":
                    // Pull an item
                    break;
                case "putbehind":
                    // Take an item and put it behind the player
                    break;
                case "superpush":
                    // Pushing 2 items at a time
                    break;
                case "doorbypass":
                    // Opens any door
                    break;
                case "remove":
                    // Removes an item
                    break;
                default:
                    break;
            }
            this.power[power] = false;
        }
    }, gridMovement: function () {

        this.blocked.since++;
        var blockMove = false;

        if (Math.floor(this.sGridPos.y) != Math.floor(this.prevSGridPos.y) && this.hardPos.y != this.lastHardPos.y) { //changement de case Y
            if (this.blocked.y != this.hardPos.y) {
                this.blocked = getGridPos(this.pos);
                this.blocked.since = 0;
            }
        }
        if (Math.floor(this.sGridPos.x) != Math.floor(this.prevSGridPos.x) && this.hardPos.x != this.lastHardPos.x) { //changement de case Y
            if (this.blocked.x != this.hardPos.x) {
                this.blocked = getGridPos(this.pos);
                this.blocked.since = 0;
            }
        }


        if (this.blocked.since < 10) {
            this.pos.x = 32 * Math.floor(this.hardPos.x);
            this.pos.y = 32 * Math.floor(this.hardPos.y);
            this.lastPositions = { x: this.pos.x, y: this.pos.y };
            this.vel.x = 0;
            this.vel.y = 0;
            this.updateMovement();
        } else if (this.blocked.since > 200) {
            this.blocked = getGridPos(this.pos);
            this.blocked.since = 0;
        }


    },
    gridMovement: function () {

        this.blocked.since++;
        var blockMove = false;

        if (Math.floor(this.sGridPos.y) != Math.floor(this.prevSGridPos.y) && this.hardPos.y != this.lastHardPos.y) { //changement de case Y
            if (this.blocked.y != this.hardPos.y) {
                this.blocked = getGridPos(this.pos);
                this.blocked.since = 0;
            }
        }
        if (Math.floor(this.sGridPos.x) != Math.floor(this.prevSGridPos.x) && this.hardPos.x != this.lastHardPos.x) { //changement de case Y
            if (this.blocked.x != this.hardPos.x) {
                this.blocked = getGridPos(this.pos);
                this.blocked.since = 0;
            }
        }


        if (this.blocked.since < 10) {
            this.pos.x = 32 * Math.floor(this.hardPos.x);
            this.pos.y = 32 * Math.floor(this.hardPos.y);
            this.lastPositions = { x: this.pos.x, y: this.pos.y };
            this.vel.x = 0;
            this.vel.y = 0;
            this.updateMovement();
        } else if (this.blocked.since > 200) {
            this.blocked = getGridPos(this.pos);
            this.blocked.since = 0;
        }
               

    },
    update: function () {
        if (!IsDummy) {
            var Dummy = new DummySelector(this.pos.x + (this.width/2), this.pos.y + (this.height/2), { direction: PlayerDirection });
            me.game.add(Dummy, this.z);
            me.game.sort();
        }

        if (me.input.isKeyPressed('left')) {
            this.vel.x -= this.accel.x * me.timer.tick;
            this.changedirection("left");
        } else if (me.input.isKeyPressed('right')) {
            this.vel.x += this.accel.x * me.timer.tick;
            this.changedirection("right");
        } else if (me.input.isKeyPressed('up')) {
            this.vel.y -= this.accel.y * me.timer.tick;
            this.changedirection("top");
        } else if (me.input.isKeyPressed('down')) {
            this.vel.y += this.accel.y * me.timer.tick;
            this.changedirection("bottom");
        }

        if (this.vel.y != 0 && (PlayerDirection == "top" || PlayerDirection == "bottom")) {
            var mod = this.pos.x % 32;
            if (mod > 3 && mod < 29) {
                this.vel.y = 0;
            }
        } else if (this.vel.x != 0 && (PlayerDirection == "left" || PlayerDirection == "right")) {
            var mod = this.pos.y % 32;
            if (mod > 3 && mod < 29) {
                this.vel.x = 0;
            }
        }

        this.updateMovement();
        var res = me.game.collideType(this,"moveableitem");
        var moveAllowed = true;
        if (res) {
            moveAllowed = false;
            this.vel.x = 0;
            this.vel.y = 0;
            this.pos.y -= res.y;
            this.pos.x -= res.x;
            return false;
        }

        // Check if moved
        if (moveAllowed) {
            this.sGridPos = getSmoothGridPos(this.pos);
            this.prevSGridPos = getSmoothGridPos(this.lastPositions);
            var save = { x: this.hardPos.x, y: this.hardPos.y };
            this.hardPos = getGridPos(this.pos);
            if (this.hardPos.y != save.y || this.hardPos.x != save.x) {
                this.lastHardPos.x = save.x
                this.lastHardPos.y = save.y
            }
<<<<<<< HEAD

            this.lastPositions = { x: this.pos.x, y: this.pos.y };

=======
            
            this.lastPositions = { x: this.pos.x, y: this.pos.y };
            
>>>>>>> 67971feca1351b8cd0855e116e4c0a4c47c8b9d0
            this.gridMovement();
            return true;
        } else {
            this.pos.x = this.lastPositions.x;
            this.pos.y = this.lastPositions.y;
            return true;
        }
        return false;
    }
})

var MoveableItem = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.type = "moveableitem";
        this.collidable = true;
        this.setVelocity(3, 3);
        this.setFriction(1, 1);
        this.gravity = 0;
        this.hasMoved = false;
        /*this.renderable = new me.AnimationSheet(0, 0, "furnitures", 16, 16);
        settings.spritewidth = 16;
        settings.spriteheight = 16;*/
        this.renderable.addAnimation("sofa", [1]);
        this.renderable.setCurrentAnimation(settings.type);
        this.weight = 1;
    },
    update: function () {
        if (this.hasMoved == true) {
            // Todo : %32 position.
            this.hasMoved == false;
        }


        this.updateMovement();
        /*var res = me.game.collide(this);
        if (res)
            console.log(res.obj.type);*/

        if (this.vel.x != 0 || this.vel.y != 0) {
            this.parent(this);
            return true;
        }

        return false;
    }
});

var DummySelector = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(8, 8);
        this.ttl = 8; // Time to live before removing
        this.collidable = true;
        this.gravity = 0;
        this.type = "dummy";
        this.direction = settings.direction;
        this.updateColRect(0, 2, 0, 2);
        IsDummy = true;
    },
    update: function () {
        if (this.ttl > 0) {
            this.ttl--;
        } else {
            /*
                Todo : Remove selector properly */         
            var OldSelector = me.game.getEntityByGUID(selectedSprite);
            me.game.remove(OldSelector);
            me.game.remove(this);
            IsDummy = false;
            selectedItem = null;
        }
        switch (this.direction) {
            case "top":
                this.vel.y -= 3;
                break;
            case "bottom":
                this.vel.y += 3;
                break;
            case "left":
                this.vel.x -= 3;
                break;
            case "right":
                this.vel.x += 3;
                break;
            default:
                console.log("Error in dummy direction");
                break;
        }
        this.updateMovement();

        var res = me.game.collide(this);

        if (res && res.obj.type == "moveableitem" && selectedItem == null) {
            me.game.remove(this);
            IsDummy = false;
            selectedItem = res.obj.GUID;
            // console.log(selectedItem);
            // TODO : Add selected effect, so the player can see it.
            var SelectedImage = new Selector(res.obj.pos.x, res.obj.pos.y, { image: "selected", spritewidth: 32, spriteheight: 32 });
            me.game.add(SelectedImage, this.z);
            me.game.sort();
        }
         
        if (this.vel.x != 0 || this.vel.y != 0) {
            this.parent(this);
            return true;
        }

        return false;
    }
});

var Selector = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.renderable.addAnimation("selected", [0, 1, 2]);
        this.renderable.setCurrentAnimation("selected");
        selectedSprite = this.GUID;
    },
    update: function () {
        this.parent(this);

        return true;
    }
});