import { useEffect, useState } from "react";
import { useKeyboard } from "../Hooks/useKeyboard";
import { useStore } from "../Hooks/useStore";
import { dirtImg, glassImg, grassImg, logImg, woodImg } from "../images/images";

const images = {
    dirtTexture: dirtImg,
    grassTexture: grassImg,
    glassTexture: glassImg,
    woodTexture: woodImg,
    logTexture: logImg
}

export const TextureSelector = () => {
    const [visible, setVisible] = useState(false);
    const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture])
    
    // Get Textures from keyboard hook
    const {
        dirtTexture,
        grassTexture,
        glassTexture,
        woodTexture,
        logTexture
    } = useKeyboard()

    // Find the texture that is true and set active
    useEffect(() => {
        const textures = {
            dirtTexture,
            grassTexture,
            glassTexture,
            woodTexture,
            logTexture
        } 
        const pressedTexture = Object.entries(textures).find(([k,v]) => v)
        if(pressedTexture){
            console.log('pressed', pressedTexture)
            setTexture(pressedTexture[0])
        }
    }, [setTexture,
        dirtTexture,
        grassTexture,
        glassTexture,
        woodTexture,
        logTexture])

    // Show selected texture out of all textures for two seconds
    useEffect(() => {
		const visibilityTimeout = setTimeout(() => {
			setVisible(false)
		}, 2000)
		setVisible(true)
		return () => {
			clearTimeout(visibilityTimeout)
		}
	}, [activeTexture])

    return visible && (
        <div className='absolute centered texture-selector'>
            {Object.entries(images).map(([k, src]) => {
                return (<img 
                    key={k} 
                    src={src} 
                    alt={k} 
                    className={`${k === activeTexture ? 'active' : ''}`}
                />)
            })}
        </div>
    )
}