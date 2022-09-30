import { nanoid } from "nanoid";
import create from "zustand";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

// Handles intial game state and changes to the game state
export const useStore = create((set) => ({
    // Default texture
    texture: 'dirtTexture',

    // Array that holds all cubes added to the world, found from local storage or empty
    cubes: getLocalStorage('cubes') || [],

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

    // Save the world to the local storage
    saveWorld: () => {
        set((previousState) => {
            setLocalStorage('cubes', previousState.cubes)
        })
    },

    // Make the array of cubes empty
    resetWorld: () => {
        set(() => ({
            cubes: []
        }))
    }
}))