/**
 * StudyBridge (Powered by Hussain AI & FlowPlan Architecture)
 * 60fps Hardware-Accelerated Three.js Interactive Knowledge Graph & Orbital Grid Background
 * Inspired by FlowPlan OS & Ashfaq Portfolio 3D Canvas
 */

(function () {
  'use strict';

  const canvas = document.getElementById('three-bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth < 768;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile(),
      powerPreference: 'high-performance'
    });
  } catch {
    canvas.style.display = 'none';
    return;
  }

  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = isMobile() ? 14 : 10.5;

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  // 1. Subtle FlowPlan Horizon Grid Lines
  const gridPoints = [];
  const cols = 8;
  const rows = 6;
  const cellW = 2.2;
  const cellH = 1.6;
  const totalW = cols * cellW;
  const totalH = rows * cellH;

  for (let c = 0; c <= cols; c++) {
    const x = c * cellW - totalW / 2;
    gridPoints.push(new THREE.Vector3(x, totalH / 2, -2), new THREE.Vector3(x, -totalH / 2, -2));
  }
  for (let r = 0; r <= rows; r++) {
    const y = r * cellH - totalH / 2;
    gridPoints.push(new THREE.Vector3(-totalW / 2, y, -2), new THREE.Vector3(totalW / 2, y, -2));
  }

  const gridGeo = new THREE.BufferGeometry().setFromPoints(gridPoints);
  const gridMat = new THREE.LineBasicMaterial({
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.11,
    depthWrite: false
  });
  rootGroup.add(new THREE.LineSegments(gridGeo, gridMat));

  // 2. Floating Geometric Study Nodes (Electric Blue, Emerald Green, Warm Coral, Buttermilk Gold)
  const palette = [0x3b82f6, 0x10b981, 0xff5a3c, 0xfff2ba, 0x8b5cf6, 0x06b6d4];
  const nodes = [];
  const geometries = [
    new THREE.IcosahedronGeometry(0.42, 0),
    new THREE.OctahedronGeometry(0.44, 0),
    new THREE.TorusGeometry(0.34, 0.11, 10, 22),
    new THREE.BoxGeometry(0.52, 0.52, 0.52)
  ];

  const nodeCount = isMobile() ? 10 : 18;
  for (let i = 0; i < nodeCount; i++) {
    const geo = geometries[i % geometries.length];
    const color = palette[i % palette.length];
    const mat = new THREE.MeshBasicMaterial({
      color,
      wireframe: i % 2 === 0,
      transparent: true,
      opacity: i % 2 === 0 ? 0.28 : 0.16
    });
    const mesh = new THREE.Mesh(geo, mat);

    const baseX = (Math.random() - 0.5) * 15;
    const baseY = (Math.random() - 0.5) * 9;
    const baseZ = (Math.random() - 0.5) * 4 - 1;
    mesh.position.set(baseX, baseY, baseZ);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    rootGroup.add(mesh);
    nodes.push({
      mesh,
      baseX,
      baseY,
      baseZ,
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.008,
      rotSpeedY: (Math.random() - 0.5) * 0.01
    });
  }

  let targetMx = 0;
  let targetMy = 0;
  let smoothMx = 0;
  let smoothMy = 0;

  window.addEventListener(
    'pointermove',
    (e) => {
      targetMx = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMy = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  let isRunning = !prefersReducedMotion;
  let clock = 0;

  function animate() {
    requestAnimationFrame(animate);
    if (!isRunning || document.hidden) return;

    clock += 0.012;
    smoothMx += (targetMx - smoothMx) * 0.05;
    smoothMy += (targetMy - smoothMy) * 0.05;

    rootGroup.rotation.y = smoothMx * 0.12;
    rootGroup.rotation.x = -smoothMy * 0.08;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.mesh.position.y = n.baseY + Math.sin(clock * n.speed + n.phase) * 0.45;
      n.mesh.position.x = n.baseX + Math.cos(clock * n.speed * 0.8 + n.phase) * 0.25;
      n.mesh.rotation.x += n.rotSpeedX;
      n.mesh.rotation.y += n.rotSpeedY;
    }

    renderer.render(scene, camera);
  }
  animate();

  let resizeTimer = null;
  window.addEventListener(
    'resize',
    () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.position.z = isMobile() ? 14 : 10.5;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight, false);
      }, 120);
    },
    { passive: true }
  );
})();
