import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../Hooks/useKeyboard";

 /*
  * NOTE: COORDINATE SYSTEM IS KINDA REVERSED HERE
  * Z-Axis if Forward and Back
  * X-Axis is Left and Right
  * Y-Axis is Up and Down
  * 
  * Foward: -Z Direction    Backwards: +Z Direction
  * Right: -X Direction     Left: +X Direction
  * Up: +Y Direction        Down: -Y Direction
*/

const JUMP_VELOCITY = 5;
const MOVE_VELOCITY = 5;

export const Player = () =>{

    // Get Keyboard input
    const {MoveForward, MoveBackward, MoveRight, MoveLeft, Jump} = useKeyboard();
    //console.log('actions', Object.entries(actions).filter(([k,v]) => v))

    const {camera} = useThree();
    const [ref, api] =  useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 1, 0]
    }))

    // Initial Player Velocity Ref (this ref will track the sphere)
    const PlayerVelocity = useRef([0,0,0]);

    // Everytime the sphere velocity changes set the PlayerVeloicty to the Sphere Velocity
    useEffect(() => {
        api.velocity.subscribe((SphereVelocity) => PlayerVelocity.current = SphereVelocity)
    }, [api.velocity])

    // Initial Player Position Ref (this ref will track the sphere)
    const PlayerPosition = useRef([0,0,0]);

    // Everytime the sphere position changes set the PlayerPosition to the Sphere Position
    useEffect(() => {
        api.position.subscribe((SpherePosition) => PlayerPosition.current = SpherePosition)
    }, [api.position])

    // Set camera position to player position every frame (camera will track player position)
    useFrame(() => {
        //console.log('frame');
        camera.position.copy(new Vector3(PlayerPosition.current[0], PlayerPosition.current[1], PlayerPosition.current[2]));
        
        // Forward Movement Vector
        const ForwardVector = new Vector3(
            0,0,
            (MoveBackward ? 1 : 0) - (MoveForward ? 1 : 0)
        );    
        
        // Side Movement Vector 
        const SideVector = new Vector3(
            (MoveLeft ? 1 : 0) - (MoveRight ? 1 : 0),
            0,0
        ); 

        // Compute movement direction
        const Direction = new Vector3(); 
        Direction.subVectors(ForwardVector, SideVector).normalize().multiplyScalar(MOVE_VELOCITY).applyEuler(camera.rotation);
        api.velocity.set(Direction.x, PlayerVelocity.current[1], Direction.z)

        // Jump Action
        if(Jump && Math.abs(PlayerVelocity.current[1]) < 0.01){
            api.velocity.set(PlayerVelocity.current[0], JUMP_VELOCITY, PlayerVelocity.current[2]);
        }
    })

    return (
        <mesh ref={ref}>

        </mesh>
    )
}