import { nanoid } from "nanoid";
import create from "zustand";

// Handles intial game state and changes to the game state

export const useStore = create((set) => ({
    // Default texture
    texture: 'dirtTexture',

    // Array that holds all cubes added to the world
    cubes: [],

    // Takes in position to add cube and adds it to the cube array
    addCube: (x, y, z) => {
        set((previousState) => ({
            cubes: [
                ...previousState.cubes,
                {
                    key: nanoid(),
                    position: [x, y, z],
                    texture: previousState.texture
                }
            ]
        }))
    },

    // Removes cube at the found position
    removeCube: (x, y, z) => {
        set((previousState) => ({
            cubes: previousState.cubes.filter(cube => {
                const [X,Y,Z] = cube.position
                return X != x || Y != y || Z != z
            })
        }))
    },

    // Set the default texture to the selected texture
    setTexture: (texture) => {
        set(() => ({
            texture
        }))
    },
    SaveWorld: () => {},
    ResetWorld: () => {}
}))