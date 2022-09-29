import { NearestFilter, RepeatWrapping, TextureLoader } from 'three';
import { dirtImg, glassImg, grassImg, logImg, woodImg } from './images';

const DirtTexture = new TextureLoader().load(dirtImg);
const GrassTexture = new TextureLoader().load(grassImg);
const GlassTexture = new TextureLoader().load(glassImg);
const WoodTexture = new TextureLoader().load(woodImg);
const LogTexture = new TextureLoader().load(logImg);
const GroundTexture = new TextureLoader().load(grassImg);

// Reduce texture stretching
DirtTexture.magFilter = NearestFilter;
GrassTexture.magFilter = NearestFilter;
GlassTexture.magFilter = NearestFilter;
WoodTexture.magFilter = NearestFilter;
LogTexture.magFilter = NearestFilter;

GroundTexture.magFilter = NearestFilter;
// Get Texture to wrap across the screen (aka repeat itself every 100 pixels?)
GroundTexture.wrapS = RepeatWrapping;
GroundTexture.wrapT = RepeatWrapping;


export {
    DirtTexture,
    GrassTexture,
    GlassTexture,
    WoodTexture,
    LogTexture,
    GroundTexture
};

