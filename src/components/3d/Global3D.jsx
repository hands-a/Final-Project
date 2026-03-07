import React, { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const LIGHT_CONFIG = {
  ambientIntensity: 0.6,
  keyLightIntensity: 1,
  fillLightIntensity: 0.4,
};

const LOGO_COLORS = {
  java: 0x5382a1,
  docker: 0x0db7ed,
  javascript: 0xf7df1e,
  typescript: 0x3178c6, 
  react: 0x61dafb,
  mongo: 0x47a248,
  robot: 0xffffff,
};

const FloatingModel = ({ modelPath, position, scale = 1, parallaxSpeed = 0.002, scrollY, colorKey }) => {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef();
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetY = position[1] + scrollY * parallaxSpeed;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.06);
    
    groupRef.current.rotation.y += 0.001;
    groupRef.current.rotation.x = Math.sin(scrollY * 0.001) * 0.1; 
  });

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        if (LOGO_COLORS[colorKey]) {
          child.material.color = new THREE.Color(LOGO_COLORS[colorKey]);
        }
        child.material.transparent = true;
        child.material.opacity = 0.5; 
        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene, colorKey]);

  return (
    <group ref={groupRef} position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <primitive object={clonedScene} scale={scale} />
      </Float>
    </group>
  );
};

const Global3D = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ELEMENTS = [
    // 🛑 التلاتة اللي ظابطين معاك 
    { path: '/java.glb', position: [-7, 4, -4], scale: 0.3, color: 'java', speed: 0.002 },
    { path: '/react_logo.glb', position: [8, -1, -4], scale: 0.2, color: 'react', speed: -0.0015 },
    { path: '/Robot.glb', position: [6, -5, -5], scale: 0.3, color: 'robot', speed: -0.002 },

    // 🚀 التلاتة الصغيرين (ضربنا الحجم عشان يبانوا)
    { path: '/docker.glb', position: [7, 4, -5], scale: 6.5, color: 'docker', speed: -0.002 },
    { path: '/javascript.glb', position: [-8, -1, -4], scale: 6.2, color: 'javascript', speed: 0.003 },
    { path: '/mongo.glb', position: [-7, -5, -3], scale: 6.2, color: 'mongo', speed: 0.001 },
    
    // 🛑 وقفنا تايب سكريبت عشان مفيش ملف ليها في الـ public لحد ما تجيب واحد
    // { path: '/typescript.glb', position: [-2, 3, -6], scale: 2.0, color: 'typescript', speed: 0.0025 },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-50 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={LIGHT_CONFIG.ambientIntensity} />
        <directionalLight position={[8, 10, 8]} intensity={LIGHT_CONFIG.keyLightIntensity} />
        <directionalLight position={[-6, -6, 5]} intensity={LIGHT_CONFIG.fillLightIntensity} />
        <Environment preset="city" />

        <Suspense fallback={null}>
          {ELEMENTS.map((el, idx) => (
            <FloatingModel
              key={idx}
              modelPath={el.path}
              position={el.position}
              scale={el.scale}
              parallaxSpeed={el.speed}
              scrollY={scrollY}
              colorKey={el.color}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Global3D;