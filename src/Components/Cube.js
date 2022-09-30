import { useBox } from "@react-three/cannon";
import { useStore } from "../Hooks/useStore";
import * as textures from '../images/textures';

export const Cube = ({ position, texture}) => {
    const [ref] =  useBox(() => ({
        type: 'Static',
        position
    }))

    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);



    const activeTexture = textures[texture]; 

    return (
        <mesh 
            onClick={(e) => {
                e.stopPropagation() // Don't click through gound
                // Based on which face of the cube is clicked we have to add a cube in front or on top of that face
                const clickedFace = Math.floor(e.faceIndex / 2) 
                const {x,y,z} = ref.current.position
                if(e.altKey){
                    removeCube(x, y ,z)
                    return
                }
                if(clickedFace === 0){
                    addCube(x + 1, y, z)
                    return
                }
                else if(clickedFace === 1){
                    addCube(x - 1, y, z)
                    return
                }
                else if(clickedFace === 2){
                    addCube(x, y + 1 ,z)
                    return
                }
                else if(clickedFace === 3){
                    addCube(x, y - 1, z)
                    return
                }
                else if(clickedFace === 4){
                    addCube(x, y, z + 1)
                    return
                }
                else if(clickedFace === 5){
                    addCube(x, y, z - 1)
                    return
                }
            }}
            ref={ref}
        >
            <boxBufferGeometry attach='geometry'/>
            <meshStandardMaterial map={activeTexture} attach='material'/>
        </mesh>
    )
}