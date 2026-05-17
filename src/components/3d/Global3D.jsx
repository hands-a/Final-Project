import React, { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const LIGHT_CONFIG = {
  ambientIntensity: 0.6,
  keyLightIntensity: 1,
  fillLightIntensity: 0.4,
};

const LOGO_COLORS = {
  java: 0x5382a1,
  docker: 0x0db7ed,
  javascript: 0xf7df1e &&  0x000000,
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
        <primitive object={clonedScene} scale={scale} dispose={null} />
      </Float>
    </group>
  );
};

const Global3D = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const ELEMENTS = [
    { path: '/java.glb', position: isMobile ? [-1.3, 1, -5] : [-5, 1, -2], scale: isMobile ? 0.18 : 0.2, color: 'java', speed: 0.002 },
    { path: '/docker.glb', position: isMobile ? [1.8, 5, -7] : [7, 2, -5], scale: isMobile ? 3.5 : 5.5, color: 'docker', speed: -0.002 },
    { path: '/js-logo.glb', position: isMobile ? [-1.1, -3, -7] : [-6, -2, -5], scale: isMobile ? 3.2 : 4.2, color: 'javascript', speed: 0.003 },
    { path: '/react_logo.glb', position: isMobile ? [1.5, -1.5, -1] : [8, -1, -4], scale: isMobile ? 0.1 : 0.1, color: 'react', speed: -0.0015 },
    { path: '/mongo.glb', position: isMobile ? [-1.5, -3, -5] : [-7, -5, -3], scale: isMobile ? 4.2 : 6.2, color: 'mongo', speed: 0.001 },
    { path: '/Robot.glb', position: isMobile ? [0.5, -4, -5] : [6, -5, -5], scale: isMobile ? 0.25 : 0.2, color: 'robot', speed: -0.002 },
    
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-50 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 12], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={LIGHT_CONFIG.ambientIntensity} />
        <directionalLight position={[8, 10, 8]} intensity={LIGHT_CONFIG.keyLightIntensity} />
        <directionalLight position={[-6, -6, 5]} intensity={LIGHT_CONFIG.fillLightIntensity} />
        <Environment preset="city" />

        <Sparkles 
          count={150}       
          scale={25}        
          size={1.5}         
          speed={0.3}        
          opacity={0.25}    
          color="#e2e8f0"    
        />

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