﻿/// <reference path="melonJS-0.9.7.js" />
var MutedSound = false;
var game = {
    assets: [
        /****** LEVELS ******/
        { name: "alpha1", type: "tmx", src: "datas/maps/alpha1.tmx" },
        { name: "alpha2", type: "tmx", src: "datas/maps/alpha2.tmx" },
        { name: "alpha3", type: "tmx", src: "datas/maps/alpha3.tmx" },
        { name: "alpha4", type: "tmx", src: "datas/maps/alpha4.tmx" },
        { name: "alpha5", type: "tmx", src: "datas/maps/alpha5.tmx" },
        { name: "alpha6", type: "tmx", src: "datas/maps/alpha6.tmx" },
        { name: "beta1", type: "tmx", src: "datas/maps/beta1.tmx" },
        { name: "beta2", type: "tmx", src: "datas/maps/beta2.tmx" },
        { name: "beta3", type: "tmx", src: "datas/maps/beta3.tmx" },
        { name: "beta4", type: "tmx", src: "datas/maps/beta4.tmx" },
        { name: "beta5", type: "tmx", src: "datas/maps/beta5.tmx" },
        { name: "beta6", type: "tmx", src: "datas/maps/beta6.tmx" },
        { name: "gamma1", type: "tmx", src: "datas/maps/gamma1.tmx" },
        { name: "gamma2", type: "tmx", src: "datas/maps/gamma2.tmx" },
        { name: "gamma3", type: "tmx", src: "datas/maps/gamma3.tmx" },
        { name: "gamma4", type: "tmx", src: "datas/maps/gamma4.tmx" },
        { name: "gamma5", type: "tmx", src: "datas/maps/gamma5.tmx" },
        { name: "gamma6", type: "tmx", src: "datas/maps/gamma6.tmx" },
        { name: "delta1", type: "tmx", src: "datas/maps/delta1.tmx" },
        { name: "delta2", type: "tmx", src: "datas/maps/delta2.tmx" },
        { name: "delta3", type: "tmx", src: "datas/maps/delta3.tmx" },
        { name: "delta4", type: "tmx", src: "datas/maps/delta4.tmx" },
        { name: "delta5", type: "tmx", src: "datas/maps/delta5.tmx" },
        { name: "delta6", type: "tmx", src: "datas/maps/delta6.tmx" },



        /****** TILESETS ******/
        { name: "metatiles16x16", type: "image", src: "datas/tilesets/metatiles16x16.png" },
        { name: "Moquette", type: "image", src: "datas/tilesets/moquette.png" },
        { name: "furnitures", type: "image", src: "datas/tilesets/furnitures26.png" },
        { name: "metaset", type: "image", src: "datas/tilesets/metaset.png" },
        { name: "walls", type: "image", src: "datas/tilesets/walls.png" },
        { name: "walls_red", type: "image", src: "datas/tilesets/walls_red.png" },
        { name: "walls_green", type: "image", src: "datas/tilesets/walls_green.png" },
        { name: "meta", type: "image", src: "datas/tilesets/metaset2.png" },

        /****** SPRITES ******/
        { name: "character", type: "image", src: "datas/sprites/character.png" },
        { name: "selected", type: "image", src: "datas/sprites/select.png" },
        { name: "switch", type: "image", src: "datas/sprites/switch.png" },

        /****** IMAGES ******/
        { name: "splashscreen", type: "image", src: "datas/images/title.png" },
        { name: "doorbypass", type: "image", src: "datas/images/doorbypass.png" },
        { name: "pull", type: "image", src: "datas/images/pull.png" },
        { name: "jumpover", type: "image", src: "datas/images/jumpover.png" },
        { name: "putbehind", type: "image", src: "datas/images/putbehind.png" },
        { name: "remove", type: "image", src: "datas/images/remove.png" },
        { name: "soundmute", type: "image", src: "datas/images/soundmute.png" },
        { name: "background", type: "image", src: "datas/images/background.png" },

        /****** SOUNDS ******/
        { name: "maintheme", type: "audio", src: "datas/sounds/", channel: 1 },
        { name: "theme2", type: "audio", src: "datas/sounds/", channel: 1},
        { name: "theme3", type: "audio", src: "datas/sounds/", channel: 1},
        { name: "theme4", type: "audio", src: "datas/sounds/", channel: 1 },
        { name: "theme5", type: "audio", src: "datas/sounds/", channel: 1 },
        { name: "theme6", type: "audio", src: "datas/sounds/", channel: 1 },
        { name: "victory", type: "audio", src: "datas/sounds/", channel: 1 }
    ],
    onload: function () {
        if (!me.video.init('screen', 800, 600, true)) {
            alert("This browser does not support HTML5 canvas");
            return;
        } 

        me.video.setImageSmoothing(false);

        me.audio.init("ogg, mp3");
        me.audio.enable();
        me.audio.setVolume(0.25);
        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(game.assets);
        me.state.change(me.state.LOADING);
    },
    loaded: function () {
        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.set(me.state.MENU, new StartScreen());

        me.state.transition("fade", "#FFFFF", 250);
        me.input.bindKey(me.input.KEY.R, "reset", true);
        me.input.bindKey(me.input.KEY.P, "nextLevel", true);
        me.input.bindKey(me.input.KEY.M, "previousLevel", true);
        me.entityPool.add("PlayerEntity", PlayerEntity);
        me.entityPool.add("Box", MoveableItem);
        me.entityPool.add("DummySelector", DummySelector);
        me.entityPool.add("Selector", Selector);
        me.entityPool.add("Switch", SwitchEntity);
        //me.game.addHUD(me.video.getWidth() - 50, 10, 50, 50);
        //me.game.HUD.addItem("RemainingItemsHUD", new RemainingItemsHUD(me.video.getWidth() - 20, 20));

        me.state.change(me.state.MENU);
    }
};

var PlayScreen = me.ScreenObject.extend({
    onResetEvent: function () {
        this.background = me.loader.getImage("background");
        me.levelDirector.loadLevel("alpha1");
        me.audio.playTrack("theme2");
    },
    draw: function (context) {
        context.drawImage(this.background, 0, 0);
    }
});

var StartScreen = me.ScreenObject.extend({
    init: function () {
        this.parent(true);
        this.presstoplay = new me.Font('century gothic', 24, 'white');
        this.background = me.loader.getImage("splashScreen");
        this.invalidate = false;
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.ENTER, "use");
        me.audio.playTrack("maintheme");
    },
    draw: function (context) {
        me.video.clearSurface(context, "black");
        context.drawImage(this.background, 0, 0);
        presstoplay_width = this.presstoplay.measureText(context, "Press enter to play.").width;
        this.presstoplay.draw(context,
                        "Press enter to play.",
                        ((me.video.getWidth() - presstoplay_width) / 2) + 250,
                        (me.video.getHeight() + 60) / 2);
    },
    update: function () {
        if (me.input.isKeyPressed("use")) {
            me.audio.stopTrack();
            me.audio.unload("maintheme");
            me.state.change(me.state.PLAY);
        }
    },
    onDestroyEvent: function () {
        this.logo = null;
        me.input.unbindKey(me.input.KEY.ENTER);
    }
})

window.onReady(function onReady() {
    game.onload();
});

me.debug.renderHitBox = false; // Displays hitboxes & movement vectors.
