import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { GAMEBOARD_LENGTH, INITIAL_SCROLL_SPEED } from '../../constants.ts';
import { useAtomValue } from 'jotai';
import { gameStatusAtom } from '../../atoms/game.ts';

export function City(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/city-final-2232.glb');
  const ref = useRef(null);
  const status = useAtomValue(gameStatusAtom);

  useFrame((_, delta) => {
    if (status === 'paused' || status === 'idle' || !ref.current) return;

    ref.current.position.z -= INITIAL_SCROLL_SPEED * delta;
    const { z } = ref.current.position;
    if (ref.current.position.z < -1.5 * GAMEBOARD_LENGTH) {
      ref.current.position.z = z + GAMEBOARD_LENGTH * 3;
    }
  });

  return (
    <group ref={ref} {...props} dispose={null}>
      <group position={[0.787, 0.23, -30.047]} rotation={[3.006, 0.905, -3.034]} scale={0.011}>
        <mesh geometry={nodes.Mesh006.geometry} material={materials['Material.031']} />
        <mesh geometry={nodes.Mesh006_1.geometry} material={materials['Big-tree-body.002']} />
      </group>
      <group position={[0.886, 0.295, -25.108]} rotation={[2.956, 1.1, -2.975]} scale={0.014}>
        <mesh geometry={nodes.Mesh007.geometry} material={materials['Material.032']} />
        <mesh geometry={nodes.Mesh007_1.geometry} material={materials['Big-tree-body.002']} />
      </group>
      <group position={[0.912, 0.197, -0.564]} rotation={[1.599, -1.487, 1.6]} scale={0.009}>
        <mesh geometry={nodes.Mesh010.geometry} material={materials['Material.035']} />
        <mesh geometry={nodes.Mesh010_1.geometry} material={materials['Big-tree-body.002']} />
      </group>
      <mesh
        geometry={nodes['Small-Tree-r-3002'].geometry}
        material={materials['Small-Tree.003']}
        position={[0.872, 0.02, -26.26]}
        rotation={[-0.746, 1.567, 0.745]}
        scale={0.026}
      />
      <mesh
        geometry={nodes['Small-Tree-r-1002'].geometry}
        material={materials['Small-Tree.003']}
        position={[0.829, -0.018, -3.272]}
        rotation={[-0.746, 1.567, 0.745]}
        scale={0.02}
      />
      <group position={[1.206, 0.032, -1.925]} rotation={[0, -1.492, 0]} scale={0.062}>
        <mesh geometry={nodes.Plane107.geometry} material={materials['DINDING.021']} />
        <mesh geometry={nodes.Plane107_1.geometry} material={materials['Material.051']} />
        <mesh geometry={nodes.Plane107_2.geometry} material={materials['Material.050']} />
      </group>
      <mesh
        geometry={nodes.bumps.geometry}
        material={materials['Material.093']}
        position={[1.204, 0.008, -7.575]}
        rotation={[0, -1.529, 0]}
        scale={[0.65, 0.272, 0.975]}
      />
      <mesh
        geometry={nodes.Donat.geometry}
        material={materials['Material.112']}
        position={[0.778, 0.801, -7.592]}
        rotation={[-2.428, -0.298, 1.672]}
        scale={2.45}
      >
        <mesh geometry={nodes.Es.geometry} material={materials['Donot-cream']} />
        <mesh
          geometry={nodes.Sphere775.geometry}
          material={materials['Material.113']}
          position={[0.085, -0.102, 0.023]}
          rotation={[-Math.PI, 0.722, -Math.PI]}
        />
        <mesh
          geometry={nodes.Sphere776.geometry}
          material={materials['Material.113']}
          position={[0.089, -0.1, 0.027]}
          rotation={[-Math.PI, 0.722, -Math.PI]}
        />
        <mesh
          geometry={nodes.Sphere777.geometry}
          material={materials['Material.113']}
          position={[0.093, -0.103, 0.031]}
          rotation={[-Math.PI, 0.722, -Math.PI]}
        />
        <mesh
          geometry={nodes.Sphere778.geometry}
          material={materials['Material.113']}
          position={[0.081, -0.1, 0.019]}
          rotation={[-Math.PI, 0.722, -Math.PI]}
        />
        <mesh
          geometry={nodes.Sphere779.geometry}
          material={materials['Material.113']}
          position={[0.075, -0.101, 0.015]}
          rotation={[-Math.PI, 0.722, -Math.PI]}
        />
      </mesh>
      <group position={[1.054, 0.758, -7.593]} rotation={[-Math.PI, 1.547, -Math.PI]} scale={[0.347, 0.335, 0.373]}>
        <mesh
          geometry={nodes.Cube001.geometry}
          material={materials['Material.054']}
          position={[0.023, 0.526, 0.508]}
          scale={[0.394, 0.34, 0.799]}
        />
        <mesh
          geometry={nodes.Cube002.geometry}
          material={materials['Material.055']}
          position={[-0.017, -0.816, 0.089]}
          scale={[0.781, 1.457, 0.727]}
        />
        <mesh
          geometry={nodes.Cube004.geometry}
          material={materials['Material.065']}
          position={[-0.56, -0.588, 0.273]}
          rotation={[-Math.PI, 1.516, -Math.PI]}
          scale={[0.285, 0.34, 0.328]}
        />
        <mesh
          geometry={nodes.Cube087.geometry}
          material={materials['Material.071']}
          position={[-0.418, 0.632, 0.34]}
          scale={[0.173, 0.139, 0.295]}
        />
        <mesh
          geometry={nodes.Cube088.geometry}
          material={materials['Material.093']}
          position={[2.745, -2.528, 0.188]}
          scale={[0.328, 0.34, 0.305]}
        />
        <mesh
          geometry={nodes.Cube089.geometry}
          material={materials['Material.055']}
          position={[0.35, -1.944, -0.634]}
          scale={[0.328, 0.34, 0.305]}
        />
        <mesh
          geometry={nodes.Cube090.geometry}
          material={materials['Material.093']}
          position={[2.761, -2.528, 0.189]}
          scale={[0.328, 0.34, 0.305]}
        />
        <mesh
          geometry={nodes.Cube092.geometry}
          material={nodes.Cube092.material}
          position={[-0.516, -2.032, 0.779]}
          scale={[0.126, 0.226, 0.026]}
        />
        <mesh
          geometry={nodes.Cube095.geometry}
          material={materials['Material.054']}
          position={[0.037, -0.816, 0.094]}
          scale={[0.781, 1.457, 0.727]}
        />
        <mesh
          geometry={nodes.Cube096.geometry}
          material={materials['Material.093']}
          position={[-0.771, -1.789, 0.173]}
          scale={[0.795, 0.511, 1.113]}
        />
        <mesh
          geometry={nodes.Cube103.geometry}
          material={nodes.Cube103.material}
          position={[-0.763, 0.089, -0.42]}
          rotation={[-Math.PI, 0.042, -Math.PI]}
          scale={[0.063, 0.132, 0.159]}
        />
        <mesh
          geometry={nodes.Cube104.geometry}
          material={materials['Material.094']}
          position={[-0.763, 0.089, -0.309]}
          rotation={[-Math.PI, 0.042, -Math.PI]}
          scale={[0.063, 0.132, 0.159]}
        />
        <mesh
          geometry={nodes.Cube105.geometry}
          material={materials['Material.095']}
          position={[-0.81, 0.094, -0.379]}
          rotation={[-Math.PI, 0.042, -Math.PI]}
          scale={[0.03, 0.086, 0.095]}
        />
        <mesh
          geometry={nodes.Cube106.geometry}
          material={materials['Material.096']}
          position={[-0.813, 0.182, -0.531]}
          rotation={[-Math.PI, 0.042, -Math.PI]}
          scale={[0.032, 0.021, 0.008]}
        />
        <mesh
          geometry={nodes.Cube107.geometry}
          material={materials['Material.096']}
          position={[-0.812, 0.182, -0.553]}
          rotation={[-Math.PI, 0.042, -Math.PI]}
          scale={[0.032, 0.021, 0.008]}
        />
        <mesh
          geometry={nodes.Cube108.geometry}
          material={materials['Material.096']}
          position={[-0.814, 0.182, -0.508]}
          rotation={[-Math.PI, 0.042, -Math.PI]}
          scale={[0.032, 0.021, 0.008]}
        />
        <mesh
          geometry={nodes.Cube111.geometry}
          material={materials['Material.093']}
          position={[2.792, -2.528, 0.191]}
          scale={[0.328, 0.34, 0.305]}
        />
        <mesh
          geometry={nodes.Cube112.geometry}
          material={materials['Basic Glass']}
          position={[0.005, -0.816, 0.445]}
          scale={[0.785, 1.457, 1.1]}
        />
        <mesh
          geometry={nodes.Cube113.geometry}
          material={materials['Material.097']}
          position={[-0.418, 0.632, 0.34]}
          scale={[0.173, 0.139, 0.295]}
        />
        <mesh
          geometry={nodes.Cube114.geometry}
          material={materials['Material.098']}
          position={[-0.418, 0.632, 0.34]}
          scale={[0.173, 0.139, 0.295]}
        />
        <mesh
          geometry={nodes.Cube115.geometry}
          material={materials['Material.097']}
          position={[-0.418, 0.632, -0.182]}
          scale={[0.173, 0.139, 0.295]}
        />
        <mesh
          geometry={nodes.Cube116.geometry}
          material={materials['Material.098']}
          position={[-0.418, 0.632, -0.182]}
          scale={[0.173, 0.139, 0.295]}
        />
        <mesh
          geometry={nodes.Cube117.geometry}
          material={materials['Material.099']}
          position={[-0.425, 0.74, 0.356]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[0.232, 0.068, 0.137]}
        />
        <mesh
          geometry={nodes.Cube122.geometry}
          material={materials['Material.100']}
          position={[-0.786, -2.072, 1.206]}
          rotation={[0, 0.029, 0]}
          scale={[0.075, 0.197, 0.18]}
        />
        <group position={[-0.914, -2.184, -0.117]} scale={[0.073, 0.076, 0.141]}>
          <mesh geometry={nodes.Cube211.geometry} material={materials['Material.101']} />
          <mesh geometry={nodes.Cube211_1.geometry} material={materials['Material.102']} />
        </group>
        <group position={[-0.915, -2.184, -0.456]} scale={[0.073, 0.076, 0.141]}>
          <mesh geometry={nodes.Cube212.geometry} material={materials['Material.101']} />
          <mesh geometry={nodes.Cube212_1.geometry} material={materials['Material.102']} />
        </group>
        <mesh
          geometry={nodes.Icosphere116.geometry}
          material={materials['Material.103']}
          position={[-0.911, -2.112, -0.051]}
          scale={[0.064, 0.066, 0.06]}
        />
        <mesh
          geometry={nodes.Icosphere117.geometry}
          material={materials['Material.103']}
          position={[-0.911, -2.112, -0.185]}
          scale={[0.064, 0.066, 0.06]}
        />
        <mesh
          geometry={nodes.Icosphere118.geometry}
          material={materials['Material.103']}
          position={[-0.914, -2.112, -0.391]}
          scale={[0.064, 0.066, 0.06]}
        />
        <mesh
          geometry={nodes.Icosphere119.geometry}
          material={materials['Material.103']}
          position={[-0.914, -2.112, -0.525]}
          scale={[0.064, 0.066, 0.06]}
        />
        <mesh
          geometry={nodes.Plane024.geometry}
          material={materials['Material.106']}
          position={[-0.825, -1.848, 1.207]}
          rotation={[0, 0.029, 0]}
          scale={[0.147, 0.162, 0.236]}
        />
        <mesh
          geometry={nodes.Torus008.geometry}
          material={materials['Material.107']}
          position={[-0.767, 0.11, -0.57]}
          rotation={[-Math.PI, 0.042, -Math.PI]}
          scale={[0.039, 0.04, 0.036]}
        />
      </group>
      <group position={[0.929, 0.013, -10.072]} rotation={[-Math.PI, 1.496, -Math.PI]} scale={[0.96, 0.32, 0.377]}>
        <mesh geometry={nodes.Cube062_1.geometry} material={materials['Material.110']} />
        <mesh geometry={nodes.Cube062_2.geometry} material={materials['Material.111']} />
        <mesh geometry={nodes.Cube062_3.geometry} material={materials['Material.108']} />
        <mesh geometry={nodes.Cube062_4.geometry} material={materials['Material.109']} />
      </group>
      <group position={[1.13, 0.018, -5.93]} rotation={[Math.PI, -1.287, Math.PI]} scale={[0.96, 0.32, 0.377]}>
        <mesh geometry={nodes.Cube051_1.geometry} material={materials['Material.110']} />
        <mesh geometry={nodes.Cube051_2.geometry} material={materials['Material.111']} />
        <mesh geometry={nodes.Cube051_3.geometry} material={materials['Material.108']} />
        <mesh geometry={nodes.Cube051_4.geometry} material={materials['Material.109']} />
      </group>
      <mesh
        geometry={nodes['Building-left'].geometry}
        material={materials['Material.140']}
        position={[1.149, 0.569, -14.356]}
        rotation={[0, -1.432, 0]}
        scale={0.266}
      />
      <mesh
        geometry={nodes['Building-right'].geometry}
        material={materials['Material.140']}
        position={[1.347, 0.44, -13.685]}
        rotation={[0, -1.432, 0]}
        scale={0.266}
      />
      <mesh
        geometry={nodes.bumps001.geometry}
        material={materials['Material.141']}
        position={[1.347, 0.677, -13.685]}
        rotation={[0, -1.432, 0]}
        scale={0.266}
      />
      <mesh
        geometry={nodes['Column-left'].geometry}
        material={materials['Material.142']}
        position={[0.947, 0.123, -13.785]}
        rotation={[0, -1.432, 0]}
        scale={[0.024, 0.068, 0.024]}
      />
      <mesh
        geometry={nodes['Column-right'].geometry}
        material={materials['Material.142']}
        position={[0.991, 0.123, -13.476]}
        rotation={[0, -1.432, 0]}
        scale={[0.024, 0.068, 0.024]}
      />
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.140']}
        position={[0.954, 0.252, -13.63]}
        rotation={[Math.PI / 2, 0, 1.432]}
        scale={[0.188, 0.124, 0.124]}
      />
      <group position={[0.903, 0.005, -12.864]} rotation={[0, -1.432, 0]} scale={0.114}>
        <mesh geometry={nodes.Cube155.geometry} material={materials['Material.147']} />
        <mesh geometry={nodes.Cube155_1.geometry} material={materials['Material.148']} />
        <mesh geometry={nodes.Cube155_2.geometry} material={materials['DINDING.002']} />
      </group>
      <mesh
        geometry={nodes['Flower-left002'].geometry}
        material={materials['Material.150']}
        position={[0.851, 0.003, -14.417]}
        rotation={[0, -1.432, 0]}
        scale={0.148}
      />
      <mesh
        geometry={nodes['Small-Tree-r-3001'].geometry}
        material={materials['Small-Tree.005']}
        position={[1.017, 0.043, -17.371]}
        rotation={[-0.746, 1.567, 0.745]}
        scale={0.026}
      />
      <mesh
        geometry={nodes.stairs.geometry}
        material={materials['Material.141']}
        position={[0.97, 0.005, -13.632]}
        rotation={[0, -1.432, 0]}
        scale={[0.14, 0.088, 0.088]}
      />
      <mesh
        geometry={nodes['Text-bg'].geometry}
        material={materials['DINDING.020']}
        position={[0.922, 0.7, -14.44]}
        rotation={[0, -0.554, 0]}
        scale={0.207}
      />
      <mesh
        geometry={nodes['Text-office'].geometry}
        material={materials['Material.013']}
        position={[0.709, 0.998, -14.192]}
        rotation={[Math.PI / 2, 0, 0.554]}
        scale={0.126}
      />
      <mesh
        geometry={nodes['Window-front'].geometry}
        material={materials['Material.144']}
        position={[1.015, 0.534, -14.081]}
        rotation={[Math.PI / 2, 0, 1.432]}
        scale={0.266}
      />
      <mesh
        geometry={nodes['Window-front-border'].geometry}
        material={materials['Material.142']}
        position={[1.015, 0.534, -14.081]}
        rotation={[Math.PI / 2, 0, 1.432]}
        scale={0.266}
      />
      <mesh
        geometry={nodes['Window-front-bottom'].geometry}
        material={materials['Material.144']}
        position={[1.015, 0.267, -14.081]}
        rotation={[Math.PI / 2, 0, 1.432]}
        scale={0.266}
      />
      <mesh
        geometry={nodes['Window-front-bottom-border'].geometry}
        material={materials['Material.142']}
        position={[1.015, 0.267, -14.081]}
        rotation={[Math.PI / 2, 0, 1.432]}
        scale={0.266}
      />
      <mesh
        geometry={nodes['Window-side'].geometry}
        material={materials['Material.144']}
        position={[1.275, 0.534, -13.137]}
        rotation={[Math.PI / 2, 0, -0.139]}
        scale={0.266}
      />
      <mesh
        geometry={nodes['Window-side-border'].geometry}
        material={materials['Material.142']}
        position={[1.275, 0.534, -13.137]}
        rotation={[Math.PI / 2, 0, -0.139]}
        scale={0.266}
      />
      <group position={[0.974, 0.706, -21.232]} rotation={[Math.PI, -1.556, Math.PI]} scale={[0.661, 0.559, 0.246]}>
        <mesh geometry={nodes.Cube160.geometry} material={materials['Building-ajor-color']} />
        <mesh geometry={nodes.Cube160_1.geometry} material={materials['Material.057']} />
        <mesh geometry={nodes.Cube160_2.geometry} material={materials['Material.152']} />
      </group>
      <group position={[1.244, 0.326, -27.535]} rotation={[0, -0.015, 0]} scale={[0.402, 0.313, 0.27]}>
        <mesh geometry={nodes.Cube159.geometry} material={nodes.Cube159.material} />
        <mesh geometry={nodes.Cube159_1.geometry} material={materials['Material.000']} />
        <mesh geometry={nodes.Cube159_2.geometry} material={materials['Material.092']} />
      </group>
      <group position={[1.244, 0.573, -27.535]} rotation={[0, -0.015, 0]} scale={[0.369, 0.287, 0.247]}>
        <mesh geometry={nodes.Cube162.geometry} material={materials['Building-ajor-color']} />
        <mesh geometry={nodes.Cube162_1.geometry} material={materials['Big-tree-body']} />
        <mesh geometry={nodes.Cube162_2.geometry} material={materials['Material.001']} />
      </group>
      <mesh
        geometry={nodes['Small-Tree-r-1001'].geometry}
        material={materials['Small-Tree.001']}
        position={[0.892, 0.031, -23.631]}
        rotation={[-0.746, 1.567, 0.745]}
        scale={0.026}
      />
      <mesh
        geometry={nodes['Small-Tree-r-2001'].geometry}
        material={materials['Small-Tree.001']}
        position={[-0.95, 0.036, -4.798]}
        rotation={[-0.746, 1.567, 0.745]}
        scale={0.026}
      />
      <group position={[-1.082, 0.271, -0.715]} rotation={[-2.965, -0.188, 3.049]} scale={0.014}>
        <mesh geometry={nodes.Mesh005.geometry} material={materials['Material.028']} />
        <mesh geometry={nodes.Mesh005_1.geometry} material={materials['Big-tree-body.001']} />
      </group>
      <group position={[-0.885, 0.271, -8.769]} rotation={[0.116, 0.766, -0.08]} scale={0.014}>
        <mesh geometry={nodes.Mesh001.geometry} material={materials['Material.024']} />
        <mesh geometry={nodes.Mesh001_1.geometry} material={materials['Big-tree-body.001']} />
      </group>
      <mesh
        geometry={nodes.Cube020.geometry}
        material={materials['Material.041']}
        position={[-0.855, -0.011, -3.012]}
        rotation={[-Math.PI, 1.564, -Math.PI]}
        scale={0.103}
      >
        <group position={[-13.173, 0.169, -0.892]} scale={0.459}>
          <mesh geometry={nodes.Plane081.geometry} material={materials['DINDING.005']} />
          <mesh geometry={nodes.Plane081_1.geometry} material={materials['Material.042']} />
        </group>
      </mesh>
      <group position={[-1.087, 0.233, -2.758]} rotation={[0, 1.413, 0]} scale={0.233}>
        <mesh geometry={nodes.Cube070_1.geometry} material={materials['Material.036']} />
        <mesh geometry={nodes.Cube070_2.geometry} material={materials['Material.037']} />
      </group>
      <mesh
        geometry={nodes.Cube067.geometry}
        material={materials['Material.063']}
        position={[-1.087, 0.233, -2.758]}
        rotation={[0, 1.413, 0]}
        scale={0.233}
      />
      <mesh
        geometry={nodes.Cube068.geometry}
        material={nodes.Cube068.material}
        position={[-0.859, 0.164, -2.925]}
        rotation={[0, 1.413, 0]}
        scale={[0.083, 0.083, 0.029]}
      />
      <mesh
        geometry={nodes.Cube069.geometry}
        material={materials['DINDING.004']}
        position={[-0.833, 0.164, -2.921]}
        rotation={[0, 1.413, 0]}
        scale={0.236}
      />
      <mesh
        geometry={nodes.Cube070.geometry}
        material={materials['DINDING.004']}
        position={[-0.841, 0.164, -2.922]}
        rotation={[0, 1.413, 0]}
        scale={0.233}
      />
      <mesh
        geometry={nodes.Cube073.geometry}
        material={materials['Material.036']}
        position={[-0.809, 0.217, -2.612]}
        rotation={[0, 1.413, 0]}
        scale={0.233}
      />
      <mesh
        geometry={nodes.Cube077.geometry}
        material={materials['Material.063']}
        position={[-0.844, 0.447, -2.642]}
        rotation={[0, 1.38, 0]}
        scale={0.233}
      />
      <group position={[-0.811, 0.057, -3.791]} rotation={[Math.PI, -1.559, Math.PI]} scale={0.013}>
        <mesh geometry={nodes.Cylinder001_1.geometry} material={materials['Material.038']} />
        <mesh geometry={nodes.Cylinder001_2.geometry} material={materials['DINDING.004']} />
        <mesh geometry={nodes.Cylinder001_3.geometry} material={materials['Material.036']} />
        <mesh geometry={nodes.Cylinder001_4.geometry} material={materials['Material.039']} />
      </group>
      <group position={[-0.779, 0.35, -2.436]} rotation={[1.024, 1.275, -1.004]} scale={0.233}>
        <mesh geometry={nodes.Plane017_1.geometry} material={materials['Material.064']} />
        <mesh geometry={nodes.Plane017_2.geometry} material={materials['Material.039']} />
      </group>
      <mesh
        geometry={nodes.Text002.geometry}
        material={materials['Material.040']}
        position={[-0.874, 0.466, -2.48]}
        rotation={[Math.PI / 2, 0, -1.38]}
        scale={[0.234, 0.127, 0.201]}
      />
      <mesh
        geometry={nodes.Cube005.geometry}
        material={materials['Material.116']}
        position={[-1.111, 0.444, -6.18]}
        rotation={[0, -1.565, 0]}
        scale={0.215}
      />
      <mesh
        geometry={nodes.Cube007.geometry}
        material={materials['Material.116']}
        position={[-0.775, 0.446, -7.099]}
        rotation={[0, -1.565, 0]}
        scale={[0.336, 0.307, 0.512]}
      />
      <mesh
        geometry={nodes.Cube008.geometry}
        material={materials['Material.117']}
        position={[-0.775, 0.446, -7.099]}
        rotation={[0, -1.565, 0]}
        scale={[0.336, 0.307, 0.336]}
      />
      <mesh
        geometry={nodes.Cube009.geometry}
        material={materials['Material.116']}
        position={[-0.932, 0.735, -6.676]}
        rotation={[0, -1.549, -Math.PI]}
        scale={-0.336}
      />
      <mesh
        geometry={nodes.Cube010.geometry}
        material={materials['Material.116']}
        position={[-1.036, 0.735, -6.587]}
        rotation={[Math.PI, -0.022, 0]}
        scale={-0.336}
      />
      <mesh
        geometry={nodes.Cube012.geometry}
        material={materials['Material.117']}
        position={[-1.253, 0.735, -6.286]}
        rotation={[-Math.PI, 0.022, -Math.PI]}
        scale={0.336}
      />
      <mesh
        geometry={nodes.Cube013.geometry}
        material={materials['Material.117']}
        position={[-1.253, 0.937, -6.289]}
        rotation={[Math.PI, -0.022, 0]}
        scale={-0.336}
      />
      <mesh
        geometry={nodes.Cube014.geometry}
        material={materials['Material.116']}
        position={[-1.253, 1.139, -6.287]}
        rotation={[Math.PI, -0.022, 0]}
        scale={-0.336}
      />
      <mesh
        geometry={nodes.Cube015.geometry}
        material={materials['Material.117']}
        position={[-1.253, 1.139, -6.289]}
        rotation={[Math.PI, -0.022, 0]}
        scale={-0.336}
      />
      <mesh
        geometry={nodes.Cube016.geometry}
        material={materials['Material.116']}
        position={[-1.148, 1.139, -6.432]}
        rotation={[0, -1.549, -Math.PI]}
        scale={-0.336}
      />
      <mesh
        geometry={nodes.Cube017.geometry}
        material={materials['Material.117']}
        position={[-1.111, 0.444, -6.18]}
        rotation={[0, -1.565, 0]}
        scale={[0.25, 0.121, 0.25]}
      />
      <mesh
        geometry={nodes.Cube018.geometry}
        material={materials['Material.116']}
        position={[-1.111, 0.098, -6.18]}
        rotation={[0, -1.565, 0]}
        scale={0.215}
      />
      <group position={[-1.113, 0.325, -6.587]} rotation={[0, -1.565, 0]} scale={0.25}>
        <mesh geometry={nodes.Cube093.geometry} material={materials['Material.114']} />
        <mesh geometry={nodes.Cube093_1.geometry} material={materials['Material.115']} />
      </group>
      <group position={[-1.155, 0.96, -6.724]} rotation={[0, -1.549, -Math.PI]} scale={-0.25}>
        <mesh geometry={nodes.Cube094.geometry} material={materials['Material.114']} />
        <mesh geometry={nodes.Cube094_1.geometry} material={materials['Material.115']} />
      </group>
      <mesh
        geometry={nodes.Cube083.geometry}
        material={materials['Material.116']}
        position={[-0.783, 0.108, -6.935]}
        rotation={[0, -1.565, 0]}
        scale={[0.314, 0.327, 0.336]}
      />
      <mesh
        geometry={nodes.Cube101.geometry}
        material={materials['Material.117']}
        position={[-0.941, 0.735, -7.017]}
        rotation={[0, -1.549, -Math.PI]}
        scale={-0.336}
      />
      <mesh
        geometry={nodes.Cube109.geometry}
        material={materials['Material.117']}
        position={[-1.036, 0.735, -6.587]}
        rotation={[Math.PI, -0.022, 0]}
        scale={-0.336}
      />
      <mesh
        geometry={nodes.Cube121.geometry}
        material={materials['Material.117']}
        position={[-1.149, 0.735, -6.432]}
        rotation={[0, -1.549, -Math.PI]}
        scale={-0.336}
      />
      <mesh
        geometry={nodes.Cube201.geometry}
        material={materials['Material.117']}
        position={[-1.111, 0.136, -6.18]}
        rotation={[0, -1.565, 0]}
        scale={[0.25, 0.202, 0.25]}
      />
      <mesh
        geometry={nodes.Cube226.geometry}
        material={materials['Material.120']}
        position={[-0.933, 0.635, -6.397]}
        rotation={[0, 1.549, 0]}
        scale={0.138}
      >
        <group position={[0, 0.099, 0]} scale={0.459}>
          <mesh geometry={nodes.Plane085.geometry} material={materials['DINDING.008']} />
          <mesh geometry={nodes.Plane085_1.geometry} material={materials['Material.121']} />
        </group>
      </mesh>
      <mesh
        geometry={nodes.Cube227.geometry}
        material={materials['Material.120']}
        position={[-1.221, 0.633, -6.162]}
        rotation={[0, 1.549, 0]}
        scale={0.087}
      >
        <group position={[0.001, 0, 0]}>
          <mesh geometry={nodes.Cylinder032.geometry} material={materials['DINDING.006']} />
          <mesh geometry={nodes.Cylinder032_1.geometry} material={materials['Material.121']} />
          <mesh geometry={nodes.Cylinder032_2.geometry} material={materials['DINDING.008']} />
        </group>
      </mesh>
      <mesh
        geometry={nodes.Plane020.geometry}
        material={materials['Material.118']}
        position={[-1.062, 1.343, -6.466]}
        rotation={[Math.PI / 2, 0, -1.122]}
        scale={0.25}
      />
      <mesh
        geometry={nodes.Text003.geometry}
        material={materials['Material.119']}
        position={[-1.167, 1.298, -6.27]}
        rotation={[Math.PI / 2, 0, -1.122]}
        scale={0.165}
      />
      <mesh
        geometry={nodes['building-box'].geometry}
        material={materials['Building-ajor-color']}
        position={[-1.162, -0.051, -14.056]}
        scale={[0.771, 0.771, 1.108]}
      >
        <mesh
          geometry={nodes.Cube.geometry}
          material={materials['Material.126']}
          position={[-0.006, 0, 0]}
          scale={[0.975, 1, 1]}
        />
        <group position={[0.442, 0.28, 1.055]} rotation={[-Math.PI, 0.803, -Math.PI]} scale={0.115}>
          <mesh geometry={nodes.Cube065_1.geometry} material={materials['Material.126']} />
          <mesh geometry={nodes.Cube065_2.geometry} material={materials['Material.127']} />
        </group>
        <mesh
          geometry={nodes.Cube006.geometry}
          material={materials['Material.128']}
          position={[-0.006, 1.928, 0]}
          scale={[0.925, 0.948, 0.948]}
        />
        <mesh
          geometry={nodes.Cube019.geometry}
          material={materials['Material.126']}
          position={[-0.24, 1.749, 1.295]}
          scale={[0.06, 0.105, 0.083]}
        />
        <mesh
          geometry={nodes.Cube021.geometry}
          material={materials['Material.128']}
          position={[0.035, 0.297, 1.301]}
          scale={0.115}
        />
        <mesh
          geometry={nodes.Cube022.geometry}
          material={materials['Material.128']}
          position={[0.04, 0.075, 1.313]}
          scale={0.135}
        />
        <mesh
          geometry={nodes.Cube023.geometry}
          material={materials['Material.128']}
          position={[0.036, 0.288, 1.286]}
          rotation={[0, -0.18, 0]}
          scale={[0.059, 0.115, 0.113]}
        />
        <mesh
          geometry={nodes.Cube024.geometry}
          material={materials['Material.129']}
          position={[0.034, 0.225, 1.278]}
          rotation={[0, 0.774, 0]}
          scale={0.169}
        />
        <mesh
          geometry={nodes.Cube025.geometry}
          material={materials['Material.126']}
          position={[-0.24, 1.749, 1.295]}
          scale={[0.06, 0.105, 0.083]}
        />
        <mesh geometry={nodes.Cube026.geometry} material={materials['Material.128']} />
        <group position={[0.439, 0.225, 0.735]} rotation={[-Math.PI, 0.797, -Math.PI]} scale={0.115}>
          <mesh geometry={nodes.Cube072_1.geometry} material={materials['Building-ajor-color']} />
          <mesh geometry={nodes.Cube072_2.geometry} material={materials['Material.130']} />
        </group>
        <mesh
          geometry={nodes.Cube028.geometry}
          material={materials['Material.131']}
          position={[0.373, 0.09, 1.332]}
          rotation={[-Math.PI, 1.548, -Math.PI]}
          scale={0.745}
        />
        <mesh
          geometry={nodes.Cube029.geometry}
          material={materials['Material.131']}
          position={[0.223, 0.09, 1.334]}
          rotation={[-Math.PI, 1.548, -Math.PI]}
          scale={0.745}
        />
        <mesh
          geometry={nodes.Cube030.geometry}
          material={materials['Material.126']}
          position={[0.304, 0.341, 1.301]}
          scale={[0.06, 0.105, 0.083]}
        />
        <mesh geometry={nodes.Cube031.geometry} material={materials['Material.128']} />
        <mesh
          geometry={nodes.Cube032.geometry}
          material={materials['Material.126']}
          position={[-0.235, 0.341, 1.301]}
          scale={[0.06, 0.105, 0.083]}
        />
        <mesh geometry={nodes.Cube033.geometry} material={materials['Material.128']} />
        <mesh
          geometry={nodes.Cube034.geometry}
          material={materials['Material.132']}
          position={[0.305, 0.342, 1.289]}
          scale={[0.049, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube035.geometry}
          material={materials['Material.128']}
          position={[0.325, 2.037, 0.682]}
          rotation={[0, 0.005, 0]}
          scale={[0.049, 0.048, 0.096]}
        />
        <mesh
          geometry={nodes.Cube036.geometry}
          material={materials['Material.128']}
          position={[0.214, 2.037, 0.682]}
          rotation={[0, 0.005, 0]}
          scale={[0.049, 0.048, 0.096]}
        />
        <mesh
          geometry={nodes.Cube037.geometry}
          material={materials['Material.128']}
          position={[-0.154, 2.057, 0.713]}
          rotation={[0, 0.005, 0]}
          scale={[0.1, 0.066, 0.096]}
        />
        <mesh
          geometry={nodes.Cube043.geometry}
          material={materials['Material.132']}
          position={[-0.235, 0.342, 1.289]}
          scale={[0.051, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube044.geometry}
          material={materials['Material.132']}
          position={[0.305, 0.707, 1.27]}
          scale={[0.049, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube045.geometry}
          material={materials['Material.132']}
          position={[-0.248, 0.707, 1.27]}
          scale={[0.051, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube046.geometry}
          material={materials['Material.132']}
          position={[0.305, 1.057, 1.27]}
          scale={[0.049, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube047.geometry}
          material={materials['Material.132']}
          position={[-0.248, 1.057, 1.27]}
          scale={[0.051, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube048.geometry}
          material={materials['Material.135']}
          position={[0.305, 1.417, 1.277]}
          scale={[0.051, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube050.geometry}
          material={materials['Material.132']}
          position={[-0.248, 1.409, 1.27]}
          scale={[0.051, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube051.geometry}
          material={materials['Material.132']}
          position={[0.036, 1.409, 1.27]}
          scale={[0.051, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube052.geometry}
          material={materials['Material.136']}
          position={[0.036, 1.049, 1.201]}
          scale={[0.051, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube053.geometry}
          material={materials['Material.132']}
          position={[0.036, 0.688, 1.27]}
          scale={[0.051, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube054.geometry}
          material={materials['Material.132']}
          position={[0.305, 1.762, 1.27]}
          scale={[0.049, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube055.geometry}
          material={materials['Material.132']}
          position={[-0.248, 1.762, 1.27]}
          scale={[0.051, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube056.geometry}
          material={materials['Material.132']}
          position={[0.036, 1.762, 1.27]}
          scale={[0.051, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube058.geometry}
          material={materials['Material.135']}
          position={[0.036, 1.049, 1.272]}
          scale={[0.051, 0.389, 0.012]}
        />
        <mesh
          geometry={nodes.Cube059.geometry}
          material={materials['Material.136']}
          position={[0.302, 1.417, 1.202]}
          scale={[0.051, 0.389, 0.012]}
        />
        <mesh geometry={nodes.Cube060.geometry} material={materials['Material.128']} />
        <mesh geometry={nodes.Cube061.geometry} material={materials['Material.128']} />
        <mesh geometry={nodes.Cube062.geometry} material={materials['Material.128']} />
        <mesh
          geometry={nodes.Icosphere001.geometry}
          material={materials['Material.137']}
          position={[0.343, 0.1, 1.332]}
          rotation={[Math.PI, -0.012, Math.PI]}
          scale={[0.021, 0.026, 0.021]}
        />
        <mesh
          geometry={nodes.Icosphere002.geometry}
          material={materials['Material.137']}
          position={[0.194, 0.1, 1.335]}
          rotation={[Math.PI, -0.012, Math.PI]}
          scale={[0.021, 0.026, 0.021]}
        />
        <mesh
          geometry={nodes.Plane003.geometry}
          material={materials['Material.126']}
          position={[0.06, 2.04, 0.947]}
          scale={[0.957, 1.188, 0.957]}
        />
        <mesh
          geometry={nodes.Plane004.geometry}
          material={materials['Material.126']}
          position={[0.021, 1.59, 0.947]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.958, -0.627, -0.958]}
        />
        <mesh
          geometry={nodes.Plane005.geometry}
          material={materials['Material.126']}
          position={[0.002, 1.218, 0.868]}
          rotation={[-3.142, 1.567, 0]}
          scale={[-0.988, -0.605, -0.951]}
        />
        <mesh
          geometry={nodes.Plane006.geometry}
          material={materials['Material.126']}
          position={[0.06, 0.873, 0.947]}
          scale={[1, 0.618, 1]}
        />
        <mesh
          geometry={nodes.Plane007.geometry}
          material={materials['Material.126']}
          position={[0.021, 0.516, 0.947]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-1, -0.608, -1]}
        />
      </mesh>
      <group position={[-1.221, 0.562, -20.375]} rotation={[-Math.PI, 0.028, -Math.PI]} scale={[0.369, 0.287, 0.247]}>
        <mesh geometry={nodes.Cube163.geometry} material={materials['Material.014']} />
        <mesh geometry={nodes.Cube163_1.geometry} material={materials['Material.155']} />
        <mesh geometry={nodes.Cube163_2.geometry} material={materials['Material.156']} />
      </group>
      <group position={[-1.221, 0.315, -20.375]} rotation={[-Math.PI, 0.028, -Math.PI]} scale={[0.402, 0.313, 0.27]}>
        <mesh geometry={nodes.Cube166.geometry} material={materials.Material} />
        <mesh geometry={nodes.Cube166_1.geometry} material={materials['Material.158']} />
        <mesh geometry={nodes.Cube166_2.geometry} material={materials['Material.157']} />
      </group>
      <group position={[-1.018, 0.014, -29.494]} rotation={[0, -0.113, 0]} scale={[0.96, 0.32, 0.377]}>
        <mesh geometry={nodes.Cube167.geometry} material={materials['Material.159']} />
        <mesh geometry={nodes.Cube167_1.geometry} material={materials['Material.160']} />
        <mesh geometry={nodes.Cube167_2.geometry} material={materials['Material.161']} />
        <mesh geometry={nodes.Cube167_3.geometry} material={materials['Material.162']} />
      </group>
      <mesh
        geometry={nodes.Sphere003.geometry}
        material={materials['Material.034']}
        position={[0.75, 1.785, -5.304]}
        rotation={[-Math.PI, 0.333, -Math.PI]}
        scale={0.145}
      />
      <mesh
        geometry={nodes.Sphere004.geometry}
        material={materials['Material.166']}
        position={[-0.844, 1.738, -6.776]}
        rotation={[0, -0.333, -Math.PI]}
        scale={-0.114}
      />
      <mesh
        geometry={nodes.Sphere005.geometry}
        material={materials['Material.166']}
        position={[-0.023, 1.93, -6.144]}
        rotation={[-Math.PI, 0.333, -Math.PI]}
        scale={0.199}
      />
      <mesh
        geometry={nodes.Sphere010.geometry}
        material={materials['Material.165']}
        position={[-0.053, 1.871, -2.628]}
        scale={0.199}
      />
      <mesh
        geometry={nodes.Sphere014.geometry}
        material={materials['Material.034']}
        position={[0.667, 1.808, -2.117]}
        rotation={[-Math.PI, 0, 0]}
        scale={-0.114}
      />
      <mesh
        geometry={nodes.Sphere015.geometry}
        material={materials['Material.165']}
        position={[-0.957, 1.915, -3.363]}
        scale={0.145}
      />
      <mesh
        geometry={nodes.Text.geometry}
        material={materials['Material.162']}
        position={[0.764, 0.47, -7.777]}
        rotation={[1.58, 0.041, 1.422]}
        scale={[0.293, 1.323, 0.295]}
      />
      <mesh
        geometry={nodes.Sphere006.geometry}
        material={materials['Material.002']}
        position={[-0.039, 1.841, -10.597]}
        rotation={[0, 0.107, -Math.PI]}
        scale={-0.199}
      />
      <mesh
        geometry={nodes.Sphere007.geometry}
        material={materials['Material.002']}
        position={[0.511, 1.513, -11.509]}
        rotation={[Math.PI, -0.107, Math.PI]}
        scale={0.199}
      />
      <mesh
        geometry={nodes.Sphere008.geometry}
        material={materials['Material.034']}
        position={[-0.868, 1.695, -9.952]}
        rotation={[0, 0.107, -Math.PI]}
        scale={-0.101}
      />
      <group position={[-1.23, 0.691, -27.101]} rotation={[0, 1.556, 0]} scale={0.559}>
        <mesh geometry={nodes.Cube001_1.geometry} material={materials['Building-ajor-color.001']} />
        <mesh geometry={nodes.Cube001_2.geometry} material={materials['ajor.001']} />
        <mesh geometry={nodes.Cube001_3.geometry} material={materials['Material.003']} />
      </group>
      <group position={[-0.88, 0.286, -24.014]} rotation={[3.009, 0.887, -3.038]} scale={0.014}>
        <mesh geometry={nodes.Mesh002.geometry} material={materials['Material.004']} />
        <mesh geometry={nodes.Mesh002_1.geometry} material={materials['Big-tree-body.004']} />
      </group>
      <mesh
        geometry={nodes['Small-Tree-r-3003'].geometry}
        material={materials['Small-Tree.002']}
        position={[-0.851, 0.02, -22.007]}
        rotation={[-0.746, 1.567, 0.745]}
        scale={0.026}
      />
      <group position={[-0.844, 0.012, -16.9]} rotation={[0, -0.113, 0]} scale={[0.96, 0.32, 0.377]}>
        <mesh geometry={nodes.Cube003_1.geometry} material={materials['Material.005']} />
        <mesh geometry={nodes.Cube003_2.geometry} material={materials['Material.006']} />
        <mesh geometry={nodes.Cube003_3.geometry} material={materials['Material.007']} />
        <mesh geometry={nodes.Cube003_4.geometry} material={materials['Material.008']} />
      </group>
      <mesh
        geometry={nodes.Cube041.geometry}
        material={materials['DINDING.001']}
        position={[-0.883, 0.087, -10.449]}
        rotation={[0, -0.262, 0]}
        scale={0.084}
      />
      <mesh
        geometry={nodes.Cube042.geometry}
        material={materials['Material.160']}
        position={[-1.303, -0.015, -15.686]}
        rotation={[0, 0, -Math.PI]}
        scale={[-0.549, -0.02, -15.703]}
      />
      <mesh
        geometry={nodes.Cube063.geometry}
        material={materials['Material.030']}
        position={[0.614, -0.015, -15.704]}
        rotation={[0, 0, -Math.PI]}
        scale={[-0.132, -0.013, -15.703]}
      />
      <mesh
        geometry={nodes.Cube064.geometry}
        material={materials['Material.010']}
        position={[-0.657, -0.015, -15.686]}
        rotation={[0, 0, -Math.PI]}
        scale={[-0.132, -0.013, -15.703]}
      />
      <mesh
        geometry={nodes.Cube065.geometry}
        material={materials['Material.018']}
        position={[0.016, -0.024, -15.691]}
        rotation={[0, 0, -Math.PI]}
        scale={[-0.549, -0.012, -15.703]}
      />
      <mesh
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        position={[-0.159, -0.011, -1.273]}
        scale={[0.016, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane008.geometry}
        material={nodes.Plane008.material}
        position={[-0.159, -0.011, -3.647]}
        scale={[0.016, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane010.geometry}
        material={nodes.Plane010.material}
        position={[-0.159, -0.011, -6.199]}
        scale={[0.016, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane012.geometry}
        material={nodes.Plane012.material}
        position={[-0.159, -0.011, -8.535]}
        scale={[0.016, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane014.geometry}
        material={nodes.Plane014.material}
        position={[-0.159, -0.011, -10.837]}
        scale={[0.016, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane016.geometry}
        material={nodes.Plane016.material}
        position={[-0.159, -0.011, -13.086]}
        scale={[0.016, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane021.geometry}
        material={nodes.Plane021.material}
        position={[0.159, -0.011, -13.086]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane025.geometry}
        material={nodes.Plane025.material}
        position={[0.159, -0.011, -10.837]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane027.geometry}
        material={nodes.Plane027.material}
        position={[0.159, -0.011, -8.535]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane029.geometry}
        material={nodes.Plane029.material}
        position={[0.159, -0.011, -6.199]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane031.geometry}
        material={nodes.Plane031.material}
        position={[0.159, -0.011, -3.647]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane033.geometry}
        material={nodes.Plane033.material}
        position={[0.159, -0.011, -1.273]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Cube071.geometry}
        material={materials['DINDING.001']}
        position={[0.812, 0.098, -4.595]}
        rotation={[0, -0.262, 0]}
        scale={0.084}
      />
      <mesh
        geometry={nodes.Plane035.geometry}
        material={nodes.Plane035.material}
        position={[0.159, -0.011, -17.785]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane037.geometry}
        material={nodes.Plane037.material}
        position={[0.159, -0.011, -15.483]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane041.geometry}
        material={nodes.Plane041.material}
        position={[-0.159, -0.011, -15.483]}
        scale={[0.016, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane043.geometry}
        material={nodes.Plane043.material}
        position={[-0.159, -0.011, -17.785]}
        scale={[0.016, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane045.geometry}
        material={nodes.Plane045.material}
        position={[-0.159, -0.011, -20.073]}
        scale={[0.016, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane048.geometry}
        material={nodes.Plane048.material}
        position={[0.159, -0.011, -20.073]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane050.geometry}
        material={nodes.Plane050.material}
        position={[0.159, -0.011, -24.653]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane052.geometry}
        material={nodes.Plane052.material}
        position={[0.159, -0.011, -22.351]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane053.geometry}
        material={nodes.Plane053.material}
        position={[-0.159, -0.011, -22.351]}
        scale={[0.016, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane056.geometry}
        material={nodes.Plane056.material}
        position={[-0.159, -0.011, -24.653]}
        scale={[0.016, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane058.geometry}
        material={nodes.Plane058.material}
        position={[-0.159, -0.011, -27.017]}
        scale={[0.016, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane061.geometry}
        material={nodes.Plane061.material}
        position={[0.159, -0.011, -27.017]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Cube072.geometry}
        material={materials['Material.160']}
        position={[1.274, -0.015, -15.686]}
        rotation={[0, 0, -Math.PI]}
        scale={[-0.549, -0.02, -15.703]}
      />
      <mesh
        geometry={nodes.Cube074.geometry}
        material={materials['Material.015']}
        position={[1.812, 1.314, -15.686]}
        rotation={[0, 0, -1.57]}
        scale={[-1.339, -0.02, -15.703]}
      />
      <mesh
        geometry={nodes.Cube075.geometry}
        material={materials['Material.015']}
        position={[-1.836, 1.314, -15.686]}
        rotation={[0, 0, -1.57]}
        scale={[-1.339, -0.02, -15.703]}
      />
      <mesh
        geometry={nodes['Small-Tree-r-3004'].geometry}
        material={materials['Small-Tree.004']}
        position={[0.839, 0.043, -19.579]}
        rotation={[-0.746, 1.567, 0.745]}
        scale={0.026}
      />
      <mesh
        geometry={nodes.Sphere009.geometry}
        material={materials['Material.027']}
        position={[-0.957, 1.915, -15.672]}
        scale={0.145}
      />
      <mesh
        geometry={nodes.Sphere011.geometry}
        material={materials['Material.034']}
        position={[0.667, 1.808, -14.426]}
        rotation={[-Math.PI, 0, 0]}
        scale={-0.114}
      />
      <mesh
        geometry={nodes.Sphere012.geometry}
        material={materials['Material.027']}
        position={[-0.053, 1.871, -14.937]}
        scale={0.199}
      />
      <mesh
        geometry={nodes.Sphere013.geometry}
        material={materials['Material.034']}
        position={[-0.055, 1.93, -20.383]}
        rotation={[0, 0.333, -Math.PI]}
        scale={-0.199}
      />
      <mesh
        geometry={nodes.Sphere016.geometry}
        material={materials['Material.034']}
        position={[0.767, 1.738, -21.015]}
        rotation={[Math.PI, -0.333, Math.PI]}
        scale={0.114}
      />
      <mesh
        geometry={nodes.Sphere017.geometry}
        material={materials['Material.034']}
        position={[-0.828, 1.785, -19.542]}
        rotation={[0, 0.333, -Math.PI]}
        scale={-0.145}
      />
      <mesh
        geometry={nodes.Sphere018.geometry}
        material={materials['Material.034']}
        position={[-0.868, 1.695, -25.72]}
        rotation={[0, 0.107, -Math.PI]}
        scale={-0.101}
      />
      <mesh
        geometry={nodes.Sphere019.geometry}
        material={materials['Material.034']}
        position={[0.511, 1.758, -27.277]}
        rotation={[Math.PI, -0.107, Math.PI]}
        scale={0.199}
      />
      <mesh
        geometry={nodes.Sphere020.geometry}
        material={materials['Material.034']}
        position={[-0.039, 1.841, -26.365]}
        rotation={[0, 0.107, -Math.PI]}
        scale={-0.199}
      />
      <mesh
        geometry={nodes.Plane063.geometry}
        material={nodes.Plane063.material}
        position={[0.159, -0.011, -29.642]}
        scale={[0.012, 0.58, 0.215]}
      />
      <mesh
        geometry={nodes.Plane064.geometry}
        material={nodes.Plane064.material}
        position={[-0.159, -0.011, -29.642]}
        scale={[0.016, 0.58, 0.215]}
      />
      <group position={[1.054, 0.758, -7.593]} rotation={[-Math.PI, 1.547, -Math.PI]} scale={[0.347, 0.335, 0.373]}>
        <mesh
          geometry={nodes.Cube039.geometry}
          material={materials['Material.044']}
          position={[2.754, -2.528, 0.598]}
          scale={[0.33, 0.34, 0.462]}
        />
      </group>
      <mesh
        geometry={nodes.Cube057.geometry}
        material={materials['Material.044']}
        position={[1.246, 0.403, -8.223]}
        scale={[0.426, 0.415, 0.364]}
      />
      <group position={[1.054, 0.758, -7.593]} rotation={[-Math.PI, 1.547, -Math.PI]} scale={[0.347, 0.335, 0.373]}>
        <mesh
          geometry={nodes.Cube076.geometry}
          material={materials['Material.045']}
          position={[2.745, -2.528, 0.188]}
          scale={[0.328, 0.34, 0.305]}
        />
      </group>
      <group position={[1.054, 0.758, -8.399]} rotation={[-Math.PI, 1.547, -Math.PI]} scale={[0.347, 0.335, 0.373]}>
        <mesh
          geometry={nodes.Cube078.geometry}
          material={materials['Material.052']}
          position={[-0.017, -0.816, 0.089]}
          scale={[0.781, 1.457, 0.727]}
        />
      </group>
      <group position={[1.054, 0.758, -8.392]} rotation={[-Math.PI, 1.547, -Math.PI]} scale={[0.347, 0.335, 0.373]}>
        <mesh
          geometry={nodes.Cube079.geometry}
          material={materials['Material.053']}
          position={[2.761, -2.528, 0.189]}
          scale={[0.328, 0.34, 0.305]}
        />
      </group>
      <group position={[1.054, 0.758, -8.292]} rotation={[-Math.PI, 1.547, -Math.PI]} scale={[0.347, 0.335, 0.373]}>
        <mesh
          geometry={nodes.Cube082.geometry}
          material={materials['Material.056']}
          position={[-0.017, -0.816, 0.089]}
          scale={[0.781, 1.457, 0.727]}
        />
      </group>
      <mesh
        geometry={nodes.Cube084.geometry}
        material={materials['Material.057']}
        position={[1.276, 0.403, -22.037]}
        scale={[0.426, 0.415, 0.467]}
      />
      <mesh
        geometry={nodes.Cube085.geometry}
        material={materials['Material.058']}
        position={[1.443, 0.414, -21.077]}
        scale={[0.391, 0.751, 0.52]}
      />
      <mesh
        geometry={nodes.Cube086.geometry}
        material={materials['Material.059']}
        position={[-1.423, 0.398, -26.284]}
        scale={[0.391, 0.751, 0.52]}
      />
      <group position={[0.858, 0.34, -18.826]} rotation={[-Math.PI / 2, 0, -0.34]} scale={-0.052}>
        <mesh geometry={nodes.Plane045_1.geometry} material={materials['Material.021']} />
        <mesh geometry={nodes.Plane045_2.geometry} material={materials['Material.026']} />
        <mesh geometry={nodes.Plane045_3.geometry} material={materials['Material.025']} />
        <mesh geometry={nodes.Plane045_4.geometry} material={materials['Material.023']} />
      </group>
      <group position={[0.923, 0.188, -2.517]} rotation={[Math.PI / 2, 0, 1.328]} scale={0.094}>
        <mesh geometry={nodes.Circle007.geometry} material={materials['DINDING.020']} />
        <mesh geometry={nodes.Circle007_1.geometry} material={materials['Material.049']} />
      </group>
      <mesh
        geometry={nodes.Cube169.geometry}
        material={materials['Material.043']}
        position={[1.159, 0.283, -2.743]}
        rotation={[0, -1.328, 0]}
        scale={0.276}
      />
      <mesh
        geometry={nodes.Cube170.geometry}
        material={materials['Material.046']}
        position={[1.159, 0.152, -2.743]}
        rotation={[0, -1.328, 0]}
        scale={0.276}
      />
      <group position={[1.129, 0.175, -2.445]} rotation={[0, 0.243, 0]} scale={0.156}>
        <mesh geometry={nodes.Cube189.geometry} material={materials['DINDING.020']} />
        <mesh geometry={nodes.Cube189_1.geometry} material={materials['Material.049']} />
      </group>
      <group position={[0.426, 0.175, -2.668]} rotation={[0, -1.328, 0]} scale={0.156}>
        <mesh geometry={nodes.Cube188.geometry} material={materials['DINDING.020']} />
        <mesh geometry={nodes.Cube188_1.geometry} material={materials['Material.049']} />
      </group>
      <mesh
        geometry={nodes.Cylinder010.geometry}
        material={materials['Material.046']}
        position={[1.05, 0.567, -2.845]}
        rotation={[0, -0.797, 0]}
        scale={0.025}
      />
      <mesh
        geometry={nodes.Cylinder011.geometry}
        material={materials['Material.046']}
        position={[1.231, 0.567, -2.659]}
        rotation={[0, -0.797, 0]}
        scale={0.025}
      />
      <mesh
        geometry={nodes.Plane038.geometry}
        material={materials['Material.043']}
        position={[1.126, 0.766, -2.73]}
        rotation={[Math.PI / 2, 0, 0.797]}
        scale={[0.222, 0.222, 0.264]}
      />
      <group position={[0.728, 0.401, -2.888]} rotation={[0.819, -1.223, 0.788]} scale={[0.244, 0.25, 0.177]}>
        <mesh geometry={nodes.Plane040_1.geometry} material={materials['Material.047']} />
        <mesh geometry={nodes.Plane040_2.geometry} material={materials['ATAP RUMAH.003']} />
      </group>
      <group position={[1.012, 0.401, -2.313]} rotation={[0.259, 0.235, -0.062]} scale={[0.244, 0.25, 0.177]}>
        <mesh geometry={nodes.Plane042.geometry} material={materials['Material.048']} />
        <mesh geometry={nodes.Plane042_1.geometry} material={materials['ATAP RUMAH.003']} />
      </group>
      <mesh
        geometry={nodes.Text008.geometry}
        material={materials['Material.046']}
        position={[0.998, 0.729, -2.871]}
        rotation={[Math.PI / 2, 0, 0.797]}
        scale={[0.108, 0.127, 0.117]}
      />
    </group>
  );
}

useGLTF.preload('/models/city-final-2232.glb');
