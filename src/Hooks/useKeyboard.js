import { useCallback, useEffect, useState } from "react"

function ActionByKey(key) {
    const KeyActionMap = {
        KeyW: 'MoveForward',
        KeyS: 'MoveBackward',
        KeyA: 'MoveLeft',
        KeyD: 'MoveRight',
        Space: 'Jump',
        Digit1: 'dirtTexture',
        Digit2: 'grassTexture',
        Digit3: 'glassTexture',
        Digit4: 'woodTexture',
        Digit5: 'logTexture',
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
        dirtTexture: false,
        grassTexture: false,
        glassTexture: false,
        woodTexture: false,
        logTexture: false
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