import { nanoid } from "nanoid";
import create from "zustand";

// Handles intial game state and changes to the game state

export const useStore = create((set) => ({
    Texture: 'dirt',

    // Array that holds all cubes added to the world
    Cubes: [{
        key: nanoid(),
        position: [1,1,1],
        texture: 'DirtTexture'
    },
    {
        key: nanoid(),
        position: [1,3,1],
        texture: 'WoodTexture'
    }],

    // Takes in position to add cube and adds it to the cube array
    AddCube: (x, y, z) => {
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
    RemoveCube: () => {},
    SetTexture: () => {},
    SaveWorld: () => {},
    ResetWorld: () => {}
}))