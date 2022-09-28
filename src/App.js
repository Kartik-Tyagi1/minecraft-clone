import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Ground } from './Components/Ground';
import { Player } from './Components/Player';

function App() {
  return (
    <>
      { /* ADD OTHER HTML HERE NOT IN CANVAS */ /* <div>Outside Canvas</div> */ }
      <Canvas>
        <Sky sunPosition={[100, 100, 20]}></Sky>
        <ambientLight intensity={0.5}/>
        <Physics>
          <Player/>
          <Ground/>
        </Physics>
      </Canvas>
    </>
  );
}

export default App;