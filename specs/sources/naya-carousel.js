import * as THREE from "three";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js';

function createTextTexture(text, className, texWidth = 512, texHeight = 128) {
    const canvas = document.createElement('canvas');
    canvas.width = texWidth;
    canvas.height = texHeight;
    const ctx = canvas.getContext('2d');

    let fontSize, fontFamily, fontWeight, color, textAlign;

    if (className.includes('year')) {
        fontSize = 35;
        fontFamily = 'Helvetica Neue';
        fontWeight = 'normal';
        color = 'white';
        textAlign = 'right';
    } else {
        fontSize = 35;
        fontFamily = 'Helvetica Neue';
        fontWeight = 'normal';
        color = 'white';
        textAlign = 'left';
    }

    if (!fontSize || !color) {
        const tempElement = document.createElement('span');
        tempElement.className = className;
        tempElement.style.position = 'absolute';
        tempElement.textContent = text;
        document.body.appendChild(tempElement);

        const styles = window.getComputedStyle(tempElement);
        fontSize = parseInt(styles.fontSize) || 35;
        fontFamily = styles.fontFamily || 'Helvetica Neue';
        fontWeight = styles.fontWeight || 'normal';
        color = styles.color || 'white';
        textAlign = styles.textAlign || 'left';

        tempElement.remove();
    }

    ctx.fillStyle = "rgba(0,0,0,0.0)";
    ctx.fillRect(0, 0, texWidth, texHeight);
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";
    ctx.textAlign = textAlign;
    const x = textAlign === "center" ? texWidth / 2
        : textAlign === "right" ? texWidth
            : 0;

    ctx.fillText(text.toUpperCase(), x, texHeight / 2);
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
}

function applyCurvature(geometry, width, factor) {
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const u = x / (width / 2);
        const offset = -factor * (1 - u * u);
        positions.setZ(i, offset);
    }
    geometry.attributes.position.needsUpdate = true;

    if (!geometry.userData.originalPositions) {
        geometry.userData.originalPositions = new Float32Array(positions.array.length);
        geometry.userData.originalPositions.set(positions.array);
    }

    return geometry;
}

function createRoundedRectTexture(width, height, radius) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.quadraticCurveTo(width, 0, width, radius);
    ctx.lineTo(width, height - radius);
    ctx.quadraticCurveTo(width, height, width - radius, height);
    ctx.lineTo(radius, height);
    ctx.quadraticCurveTo(0, height, 0, height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
}

const scene = new THREE.Scene();

const baseWidth = 1000, baseHeight = 600;
const fixedAspect = baseWidth / baseHeight;

const camera = new THREE.PerspectiveCamera(37, fixedAspect, 0.1, 1000);
camera.position.set(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
});
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerWidth / fixedAspect);
document.querySelector('.slider-3d-o').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;

const sliderGroup = new THREE.Group();
sliderGroup.position.set(0, 0, -3);
scene.add(sliderGroup);

let slideTexts = Array.from(document.querySelectorAll('.swiper-slide .text-small.name'))
    .map(el => el.textContent.trim());

let slideYears = Array.from(document.querySelectorAll('.swiper-slide .text-small.year'))
    .map(el => el.textContent.trim());

let images = Array.from(document.querySelectorAll('.swiper-slide .project-image'))
    .map(img => img.getAttribute('src'));

if (images.length < 6) {
    console.log(`Found ${images.length} slides, duplicating content`);
    slideTexts = [...slideTexts, ...slideTexts];
    slideYears = [...slideYears, ...slideYears];
    images = [...images, ...images];

    if (images.length < 6) {
        slideTexts = [...slideTexts, ...slideTexts.slice(0, 6 - images.length)];
        slideYears = [...slideYears, ...slideYears.slice(0, 6 - images.length)];
        images = [...images, ...images.slice(0, 6 - images.length)];
    }

    console.log(`After duplication: ${images.length} slides`);
}

const manager = new THREE.LoadingManager();
manager.onLoad = () => { updateOnResize(); };
const loader = new THREE.TextureLoader(manager);

const slideWidth = 2.31;
const slideHeight = slideWidth * 1.22;

const totalSlides = images.length;
const desiredGapFactor = 1;

const slideWidthWithGap = slideWidth * desiredGapFactor;
const circumference = slideWidthWithGap * totalSlides;

const radius = circumference / (2 * Math.PI);

console.log(`Dynamic radius calculation: ${totalSlides} slides, radius = ${radius}`);

const sharedRoundedRectTexture = createRoundedRectTexture(512, 512, 20);

const createSlideGeometry = () => new THREE.PlaneGeometry(slideWidth, slideHeight, 15, 15);
const createLabelGeometry = () => new THREE.PlaneGeometry(slideWidth, slideWidth * 0.17, 8, 3);

images.forEach((imgUrl, index) => {
    loader.load(imgUrl, function(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;

        const geometry = createSlideGeometry();
        applyCurvature(geometry, slideWidth, 0.2);

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            alphaMap: sharedRoundedRectTexture,
            transparent: true,
            side: THREE.DoubleSide
        });

        const slide = new THREE.Mesh(geometry, material);

        const angle = index * (2 * Math.PI / totalSlides);
        slide.position.x = radius * Math.sin(angle);
        slide.position.z = radius * Math.cos(angle);
        slide.lookAt(0, 0, 0);

        const labelWidth = slideWidth;
        const labelHeight = slideWidth * 0.17;

        const textTexture = createTextTexture(
            slideTexts[index % slideTexts.length] || `Slide ${index+1}`,
            "text-small",
            1440,
            200
        );
        const textMaterial = new THREE.MeshBasicMaterial({
            map: textTexture,
            transparent: true
        });
        const textGeometry = createLabelGeometry();
        applyCurvature(textGeometry, labelWidth, slideWidth * 0.066);
        const textPlane = new THREE.Mesh(textGeometry, textMaterial);
        textPlane.position.set(0.01, -slideHeight / 2 - labelHeight / 4, -0.05);
        slide.add(textPlane);

        const yearTexture = createTextTexture(
            slideYears[index % slideYears.length] || "",
            "text-small year",
            1440,
            200
        );
        const yearMaterial = new THREE.MeshBasicMaterial({
            map: yearTexture,
            transparent: true
        });
        const yearGeometry = createLabelGeometry();
        applyCurvature(yearGeometry, labelWidth, slideWidth * 0.066);
        const yearPlane = new THREE.Mesh(yearGeometry, yearMaterial);
        yearPlane.position.set(-0.01, -slideHeight / 2 - labelHeight / 4, -0.05);
        slide.add(yearPlane);

        sliderGroup.add(slide);
    });
});

let autoRotationSpeed = 0.001;
let isDragging = false, previousX = 0;
let targetRotationY = sliderGroup.rotation.y;
let dragVelocity = 0;
let previousDragX = 0;
let waveTime = 0;
let targetWaveAmplitude = 0;
let currentWaveAmplitude = 0;
const waveEasingFactor = 0.2;

renderer.domElement.addEventListener('pointerdown', (event) => {
    isDragging = true;
    previousX = event.clientX;
    autoRotationSpeed = 0;
});

renderer.domElement.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - previousX;
    dragVelocity = deltaX * 0.01;
    previousX = event.clientX;
    targetRotationY -= deltaX * 0.002;
});

renderer.domElement.addEventListener('pointerup', () => {
    isDragging = false;
    autoRotationSpeed = 0.002;
});

renderer.domElement.addEventListener('pointerleave', () => {
    isDragging = false;
    autoRotationSpeed = 0.002;
});

function applyWaveEffect(amplitude) {
    if (!sliderGroup.children.length) return;

    targetWaveAmplitude = amplitude;
    currentWaveAmplitude = THREE.MathUtils.lerp(
        currentWaveAmplitude,
        targetWaveAmplitude,
        waveEasingFactor
    );

    if (currentWaveAmplitude < 0.0005) return;

    waveTime += 0.004;
    const distortionCenterX = -radius;
    const distortionWidth = 5;

    sliderGroup.children.forEach(slide => {
        const slidePos = new THREE.Vector3();
        slide.getWorldPosition(slidePos);

        if (Math.abs(slidePos.x - distortionCenterX) > distortionWidth * 2) {
            return;
        }

        const meshesToDistort = [slide, ...slide.children];

        meshesToDistort.forEach(mesh => {
            const positions = mesh.geometry?.attributes?.position;
            if (!positions) return;

            if (!mesh.geometry.userData.originalPositions) {
                mesh.geometry.userData.originalPositions = new Float32Array(positions.array.length);
                mesh.geometry.userData.originalPositions.set(positions.array);
            }

            const originalPositions = mesh.geometry.userData.originalPositions;

            const frequency1 = 2.0;
            const frequency2 = 1.3;
            const frequency3 = 0.8;
            const timeMultiplier1 = 1.0;
            const timeMultiplier2 = 1.2;

            for (let i = 0; i < positions.count; i++) {
                const idx = i * 3;
                const x = originalPositions[idx];
                const y = originalPositions[idx + 1];
                const z = originalPositions[idx + 2];

                const vertex = new THREE.Vector3(x, y, 0).applyMatrix4(slide.matrixWorld);
                const distance = vertex.x - distortionCenterX;
                const falloff = Math.max(0, 1 - Math.pow(distance / distortionWidth, 2));

                const wave = currentWaveAmplitude * 4.0 * (
                    Math.sin(vertex.x * frequency1 + waveTime * timeMultiplier1) +
                    Math.sin(vertex.x * frequency2 + vertex.y * frequency3 + waveTime * timeMultiplier2)
                ) * 0.5;

                positions.setY(i, y + wave * falloff);
            }

            positions.needsUpdate = true;
        });
    });
}

function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
        targetRotationY += autoRotationSpeed;
        dragVelocity *= 0.95;
    }

    const waveAmplitude = Math.abs(dragVelocity) * 0.1;
    applyWaveEffect(waveAmplitude);

    sliderGroup.rotation.y = THREE.MathUtils.lerp(
        sliderGroup.rotation.y,
        targetRotationY,
        0.1
    );

    controls.update();
    renderer.render(scene, camera);
}

let resizeTimeout;
function updateOnResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = newWidth / fixedAspect;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
    }, 100);
}

window.addEventListener("resize", updateOnResize);
updateOnResize();
animate();