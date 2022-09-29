import { useStore } from "../Hooks/useStore";
import { Cube } from "./Cube";

// Gets all the cubes and renders them using the Cube Component

export const Cubes = () => {
    const [cubes] = useStore((state) => [
        state.Cubes
    ]);

    console.log(cubes);
    return cubes.map(({key, position, texture}) => {
        return (
            <Cube key={key} position={position} texture={texture}/>
        )
    })
}