import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Compass,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from 'lucide-react';

interface Photo360ViewerProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function Photo360Viewer({ src, alt, className = '' }: Photo360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [heading, setHeading] = useState(0);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  // Interaction coordinates & momentum
  const isUserInteracting = useRef(false);
  const onPointerDownPointerX = useRef(0);
  const onPointerDownPointerY = useRef(0);
  const onPointerDownLon = useRef(0);
  const onPointerDownLat = useRef(0);
  const lon = useRef(0);
  const lat = useRef(0);
  const targetLon = useRef(0);
  const targetLat = useRef(0);
  const fov = useRef(75);
  const targetFov = useRef(75);
  const autoRotateTimer = useRef<number | null>(null);
  const isAutoRotatingRef = useRef(true);

  // Touch pinch zoom state
  const touchDistanceRef = useRef<number | null>(null);

  // Keep auto-rotate ref in sync
  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotate;
  }, [isAutoRotate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setLoading(true);
    setError(null);
    setProgress(0);

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // Clear previous canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Inverted Sphere Geometry for 360 Panorama
    const geometry = new THREE.SphereGeometry(500, 64, 40);
    geometry.scale(-1, 1, 1); // Invert geometry so inside is visible

    // Temporary placeholder material while loading
    const material = new THREE.MeshBasicMaterial({
      color: 0x071120,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    // 5. Texture Loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    textureLoader.load(
      src,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        const panoramaMaterial = new THREE.MeshBasicMaterial({
          map: texture,
        });
        sphere.material = panoramaMaterial;
        material.dispose();

        setLoading(false);
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          setProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.error('360 Panorama load error:', err);
        setError('No se pudo cargar la fotografía 360°. Por favor verifica la conexión.');
        setLoading(false);
      }
    );

    // 6. Animation Loop with smooth inertial damping
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (isAutoRotatingRef.current && !isUserInteracting.current) {
        targetLon.current += 0.08;
      }

      // Smooth damping interpolation
      lon.current += (targetLon.current - lon.current) * 0.12;
      lat.current += (targetLat.current - lat.current) * 0.12;
      fov.current += (targetFov.current - fov.current) * 0.15;

      // Restrict pitch
      lat.current = Math.max(-85, Math.min(85, lat.current));

      const phi = THREE.MathUtils.degToRad(90 - lat.current);
      const theta = THREE.MathUtils.degToRad(lon.current);

      cameraTargetRef.current.x = 500 * Math.sin(phi) * Math.cos(theta);
      cameraTargetRef.current.y = 500 * Math.cos(phi);
      cameraTargetRef.current.z = 500 * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(cameraTargetRef.current);

      if (camera.fov !== fov.current) {
        camera.fov = fov.current;
        camera.updateProjectionMatrix();
      }

      // Update heading angle (0-360)
      const currentHeading = Math.round(((-lon.current % 360) + 360) % 360);
      setHeading(currentHeading);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Cleanup on unmount
    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      if (autoRotateTimer.current) window.clearTimeout(autoRotateTimer.current);
      resizeObserver.disconnect();

      geometry.dispose();
      if (Array.isArray(sphere.material)) {
        sphere.material.forEach((m) => m.dispose());
      } else {
        sphere.material.dispose();
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [src]);

  // Pointer event handlers for dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    isUserInteracting.current = true;
    setHasInteracted(true);
    onPointerDownPointerX.current = e.clientX;
    onPointerDownPointerY.current = e.clientY;
    onPointerDownLon.current = targetLon.current;
    onPointerDownLat.current = targetLat.current;

    // Pause auto-rotation during interaction
    if (autoRotateTimer.current) window.clearTimeout(autoRotateTimer.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isUserInteracting.current) return;

    // Factor in FOV for sensitivity
    const factor = (fov.current / 75) * 0.18;
    targetLon.current = (onPointerDownPointerX.current - e.clientX) * factor + onPointerDownLon.current;
    targetLat.current = (e.clientY - onPointerDownPointerY.current) * factor + onPointerDownLat.current;
    targetLat.current = Math.max(-85, Math.min(85, targetLat.current));
  };

  const handlePointerUp = () => {
    isUserInteracting.current = false;
    // Resume auto-rotation after 3 seconds of inactivity if enabled
    if (autoRotateTimer.current) window.clearTimeout(autoRotateTimer.current);
    autoRotateTimer.current = window.setTimeout(() => {
      isAutoRotatingRef.current = isAutoRotate;
    }, 3000);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setHasInteracted(true);
    const zoomStep = e.deltaY * 0.05;
    targetFov.current = Math.max(30, Math.min(95, targetFov.current + zoomStep));
  };

  // Touch handlers for mobile pinch zoom
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setHasInteracted(true);
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (touchDistanceRef.current !== null) {
        const delta = touchDistanceRef.current - dist;
        targetFov.current = Math.max(30, Math.min(95, targetFov.current + delta * 0.15));
      }
      touchDistanceRef.current = dist;
    }
  };

  const handleTouchEnd = () => {
    touchDistanceRef.current = null;
  };

  // Control action helpers
  const handleZoom = (delta: number) => {
    setHasInteracted(true);
    targetFov.current = Math.max(30, Math.min(95, targetFov.current + delta));
  };

  const handleReset = () => {
    targetLon.current = 0;
    targetLat.current = 0;
    targetFov.current = 75;
  };

  const toggleFullscreen = () => {
    const element = containerRef.current?.parentElement;
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen?.().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div
      className={`relative w-full h-full select-none overflow-hidden bg-[#070e1b] ${className}`}
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 360 Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#070e1b]/95 backdrop-blur-md flex flex-col items-center justify-center gap-4 z-30">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-[#B8892F]/20 border-t-[#B8892F] animate-spin" />
            <Sparkles size={20} className="absolute inset-0 m-auto text-[#f0dda6] animate-pulse" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-xs font-accent font-semibold tracking-[0.24em] text-[#f0dda6] uppercase">
              CARGANDO VISTA PANORÁMICA 360°
            </p>
            <p className="text-[11px] text-white/50 font-mono">
              {progress > 0 ? `${progress}% completado` : 'Iniciando renderizador de alta resolución...'}
            </p>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {error && !loading && (
        <div className="absolute inset-0 bg-[#070e1b]/90 flex flex-col items-center justify-center p-6 text-center z-30">
          <p className="text-sm text-red-300 mb-3">{error}</p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="luxury-btn-outline !py-2 !px-4 !text-xs"
          >
            Abrir foto original
          </a>
        </div>
      )}

      {/* Interactive Helper Cue (fades out after first drag) */}
      {!loading && !error && !hasInteracted && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 transition-opacity duration-700">
          <div className="bg-[#0C1730]/85 border border-[#B8892F]/60 px-5 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center gap-3 animate-pulse">
            <Sparkles size={16} className="text-[#B8892F]" />
            <span className="text-[11px] font-accent tracking-widest text-white uppercase font-semibold">
              ARRASTRA PARA EXPLORAR 360° • ZOOM CON SCROLL
            </span>
          </div>
        </div>
      )}

      {/* Top Left: 360 Badge & Compass Indicator */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
        <div className="gold-badge flex items-center gap-1.5 shadow-lg bg-[#0C1730]/90 backdrop-blur-sm border border-[#B8892F]/60">
          <Sparkles size={13} className="text-[#B8892F]" />
          <span>VISTA PANORÁMICA 360°</span>
        </div>

        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#0C1730]/80 border border-white/10 text-[10px] text-white/70 font-mono backdrop-blur-sm"
          title={`Orientación actual: ${heading}°`}
        >
          <Compass size={13} className="text-[#B8892F]" style={{ transform: `rotate(${heading}deg)` }} />
          <span>{heading}°</span>
        </div>
      </div>

      {/* Top Right: Fullscreen & Auto-rotate Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`p-2 rounded-sm border transition-all backdrop-blur-sm ${
            isAutoRotate
              ? 'bg-[#B8892F] text-[#0C1730] border-[#B8892F]'
              : 'bg-[#0C1730]/80 text-white/80 border-white/20 hover:border-[#B8892F]'
          }`}
          title={isAutoRotate ? 'Pausar giro automático' : 'Activar giro automático'}
        >
          {isAutoRotate ? <Pause size={14} /> : <Play size={14} />}
        </button>

        <button
          onClick={handleReset}
          className="p-2 rounded-sm bg-[#0C1730]/80 text-white/80 border border-white/20 hover:border-[#B8892F] hover:text-white transition-all backdrop-blur-sm"
          title="Centrar vista"
        >
          <RotateCcw size={14} />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-sm bg-[#0C1730]/80 text-white/80 border border-white/20 hover:border-[#B8892F] hover:text-white transition-all backdrop-blur-sm"
          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      {/* Bottom Right: Zoom Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5">
        <button
          onClick={() => handleZoom(-12)}
          className="p-2 rounded-sm bg-[#0C1730]/80 text-white/80 border border-white/20 hover:border-[#B8892F] hover:text-white transition-all backdrop-blur-sm"
          title="Acercar (Zoom in)"
        >
          <ZoomIn size={14} />
        </button>
        <button
          onClick={() => handleZoom(12)}
          className="p-2 rounded-sm bg-[#0C1730]/80 text-white/80 border border-white/20 hover:border-[#B8892F] hover:text-white transition-all backdrop-blur-sm"
          title="Alejar (Zoom out)"
        >
          <ZoomOut size={14} />
        </button>
      </div>

      {/* Alt description banner */}
      {alt && (
        <div className="absolute bottom-4 left-4 z-20 hidden md:block max-w-sm pointer-events-none">
          <p className="text-[11px] text-white/70 bg-[#0C1730]/75 px-3 py-1.5 rounded-sm border border-white/10 backdrop-blur-sm truncate">
            {alt}
          </p>
        </div>
      )}
    </div>
  );
}
