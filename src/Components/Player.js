import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../Hooks/useKeyboard";

export const Player = () =>{

    // Get Keyboard input
    const actions = useKeyboard();
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
        //api.velocity.set(0,1,0);
    })

    return (
        <mesh ref={ref}>

        </mesh>
    )
}