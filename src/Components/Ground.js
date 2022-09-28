import { usePlane } from "@react-three/cannon"
import { NearestFilter, RepeatWrapping } from "three"
import { GroundTexture } from "../images/textures"

/*
 * This is the Ground Component
 * It is a plane shape that is created from the react three cannon
*/

export const Ground = () => {
    const [ref] =  usePlane(() => ({
        rotation: [-Math.PI/2, 0, 0], // Rotate 90 Degrees in radians to create the ground
        position: [0,0,0] 
    }))

    // Get Texture to wrap across the screen (aka repeat itself every 100 pixels?)
    GroundTexture.magFilter = NearestFilter; // Reduce texture stretching
    GroundTexture.wrapS = RepeatWrapping;
    GroundTexture.wrapT = RepeatWrapping;
    GroundTexture.repeat.set(100,100);


    return (
        <mesh ref={ref}>
            <planeBufferGeometry attach='geometry' args={[100,100]}/>
            <meshStandardMaterial attach='material' map={GroundTexture}/>
        </mesh>
    )
}