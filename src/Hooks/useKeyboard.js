import { useCallback, useEffect, useState } from "react"

function ActionByKey(key) {
    const KeyActionMap = {
        KeyW: 'MoveForward',
        KeyS: 'MoveBackward',
        KeyA: 'MoveLeft',
        KeyD: 'MoveRight',
        Space: 'Jump',
        Digit1: 'Dirt',
        Digit2: 'Grass',
        Digit3: 'Glass',
        Digit4: 'Wood',
        Digit5: 'Log',
    }

    return KeyActionMap[key]
}

export const useKeyboard = () => {
    const [Actions, setActions] = useState({
        MoveForward: false,
        MoveBackward: false,
        MoveLeft: false,
        MoveRight: false,
        Jump: false,
        Texture1: false,
        Texture2: false,
        Texture3: false,
        Texture4: false,
        Texture5: false
    })

    const handleKeyDown = useCallback((event) => {
        const action = ActionByKey(event.code);
        if(action){
            setActions((previousState) => {
                return({
                    ...previousState,
                    [action] : true
                })
            })
        }
    }, [])

    const handleKeyUp = useCallback((event) => {
        const action = ActionByKey(event.code);
        if(action){
            setActions((previousState) => {
                return({
                    ...previousState,
                    [action] : false
                })
            })
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyDown, handleKeyUp])

    return Actions;
}