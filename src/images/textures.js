import { TextureLoader } from 'three';
import { dirtImg, glassImg, grassImg, logImg, woodImg } from './images';

const DirtTexture = new TextureLoader().load(dirtImg);
const GrassTexture = new TextureLoader().load(grassImg);
const GlassTexture = new TextureLoader().load(glassImg);
const WoodTexture = new TextureLoader().load(woodImg);
const LogTexture = new TextureLoader().load(logImg);
const GroundTexture = new TextureLoader().load(grassImg);

export {
    DirtTexture,
    GrassTexture,
    GlassTexture,
    WoodTexture,
    LogTexture,
    GroundTexture
};

