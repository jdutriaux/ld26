﻿/// <reference path="melonJS-0.9.7.js" />
/// <reference path="entities.js" />
var game = {
    assets: [
        { name: "level1", type: "tmx", src: "datas/maps/level1.tmx" },
        { name: "metatiles16x16", type: "image", src: "datas/tilesets/metatiles16x16.png" },
        { name: "Moquette", type: "image", src: "datas/tilesets/moquette.png" },
        { name: "furnitures", type: "image", src: "datas/tilesets/furnitures26.png" },
        { name: "metaset", type: "image", src: "datas/tilesets/metaset.png" },
        { name: "walls", type: "image", src: "datas/tilesets/walls.png" },
        { name: "character", type: "image", src: "datas/sprites/character.png" },
        { name: "alpha1", type: "tmx", src: "datas/maps/alpha1.tmx" },
        { name: "meta", type: "image", src: "datas/tilesets/metaset2.png" },
        { name: "selected", type: "image", src: "datas/sprites/select.png" },
        { name: "maintheme", type: "audio", src: "datas/sounds/" },
        { name: "splashscreen", type: "image", src: "datas/images/title.png" }
    ],
    onload: function () {
        if (!me.video.init('screen', 800, 600, true)) {
            alert("This browser does not support HTML5 canvas");
            return;
        }

        me.video.setImageSmoothing(false);

        me.audio.init("mp3");
        me.audio.enable();
        me.audio.setVolume(0.5);
        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(game.assets);
        me.state.change(me.state.LOADING);
    },
    loaded: function () {
        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.set(me.state.MENU, new StartScreen());

        me.state.transition("fade", "#FFFFF", 250);

        me.entityPool.add("PlayerEntity", PlayerEntity);
        me.entityPool.add("MoveableItem", MoveableItem);
        me.entityPool.add("DummySelector", DummySelector);
        me.entityPool.add("Selector", Selector);

        me.state.change(me.state.MENU);
    }
};

var PlayScreen = me.ScreenObject.extend({
    onResetEvent: function () {
        me.levelDirector.loadLevel("alpha1");
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
        presstoplay_width = this.logo.measureText(context, "Press enter to play.").width;
        this.presstoplay.draw(context,
                        "Press enter to play.",
                        ((me.video.getWidth() - presstoplay_width) / 2),
                        (me.video.getHeight() + 60) / 2);
    },
    update: function () {
        if (me.input.isKeyPressed("use")) {
            me.audio.stopTrack("maintheme");
            me.audio.unload("maintheme");
            me.state.change(me.state.PLAY);
        }
    },
    onDestroyEvent: function () {
        this.logo = null;
    }
})

window.onReady(function onReady() {
    game.onload();
});

me.debug.renderHitBox = false; // Displays hitboxes & movement vectors.