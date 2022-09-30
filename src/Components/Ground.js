import { usePlane } from "@react-three/cannon";
import { useStore } from "../Hooks/useStore";
import { groundTexture } from "../images/textures";

/*
 * This is the Ground Component
 * It is a plane shape that is created from the react three cannon
*/

export const Ground = () => {
    const [ref] =  usePlane(() => ({
        rotation: [-Math.PI/2, 0, 0], // Rotate 90 Degrees in radians to create the ground
        position: [0,-0.5,0] 
    }))

    const [addCube] = useStore((state) => [state.addCube]);

    groundTexture.repeat.set(100,100);
    
    return (
        <mesh 
            onClick={(e) => {
                e.stopPropagation()
                const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val));
                addCube(x, y, z);
            }}
            ref={ref}
        >
            <planeBufferGeometry attach='geometry' args={[100,100]}/>
            <meshStandardMaterial attach='material' map={groundTexture}/>
        </mesh>
    )
}