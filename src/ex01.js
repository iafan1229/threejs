import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import gsap from 'gsap';
import { House } from './House';
import { PreventDragClick } from './PreventDragClick';
import { TweenLite } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import dat from 'dat.gui';

// ----- 주제: glb 파일 불러오기

export default function example() {
	gsap.registerPlugin(CSSPlugin);

	const houses = [];

	// 텍스쳐 이미지 로드
	const floorLoader = new THREE.TextureLoader();
	const texture = floorLoader.load('./images/brown.jpg');
	texture.wrapS = THREE.RepeatWrapping;

	//-----texture 이미지 로드
	const textureLoader = new THREE.CubeTextureLoader();

	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const canvas2 = document.querySelector('#portfolio-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// -----그림자 설정
	renderer.shadowMap.enabled = true;

	// ------skybox
	scene.background = textureLoader.setPath('./images/').load([
		// + - 순서로 로드
		'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png',
	]);

	// Camera
	const camera = new THREE.PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 3;
	camera.position.z = 5;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	const light = new THREE.HemisphereLight('pink', 'lime', 0.2);
	light.position.x = -5;
	light.position.y = 3;
	scene.add(light);

	//--- 헬퍼를 써줌
	// const lightHelper = new THREE.PointLightHelper(light);
	// scene.add(lightHelper);

	//--- 그림자 설정
	directionalLight.castShadow = true;
	directionalLight.shadow.mapSize.width = 1024; // 기본값 512
	directionalLight.shadow.mapSize.height = 1024;
	directionalLight.shadow.camera.near = 1;
	directionalLight.shadow.camera.far = 30;

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);
	const manager = new THREE.LoadingManager();
	const gltfloader = new GLTFLoader(manager);

	//로딩 매니저
	manager.onStart = function () {
		document.querySelector('.loading').style.display = 'block';
	};
	manager.onProgress = function (url, itemsLoaded, itemsTotal) {
		document.querySelector('.loading > p').innerHTML =
			"<a href='https://threejs-hayoung.netlify.app/'>github page 속도가 너무 느립니다! 다음을 눌러 제 포트폴리오의 다른 url로 이동해주세요.</a>";
		// 'Loading file' +
		// '.\nLoaded ' +
		// itemsLoaded +
		// ' of ' +
		// itemsTotal +
		// ' files.';
	};
	manager.onLoad = function () {
		document.querySelector('.loading > p').textContent = 'Loading complete!';
		setTimeout(() => {
			document.querySelector('.loading').style.display = 'none';
		}, 1000);
	};

	houses.push(
		new House({
			gltfloader,
			scene,
			src: './gltf/Single_Bed.gltf',
			position: {
				x: -0.3,
				y: 0,
				z: 0,
			},
			rotation: {
				x: 0,
				y: 0,
				z: 0,
			},
			index: 1,
		})
	);

	houses.push(
		new House({
			gltfloader,
			scene,
			src: './gltf/SHOE_CABINET.gltf',
			position: {
				x: 1.5,
				y: 0,
				z: 0,
			},
			rotation: {
				x: Math.PI / 2,
				y: 0,
				z: Math.PI / 2,
			},
			index: 2,
		})
	);

	// houses.push(new House({
	// 	gltfloader,
	// 	scene,
	// 	src: '/gltf/earth.glb',
	// 	position: {
	// 		x: -2,
	// 		y: 0,
	// 		z: 1
	// 	},
	// 	rotation: {
	// 		x: 0,
	// 		y: 0,
	// 		z: 0
	// 	},
	// 	index: 3
	// }))

	houses.push(
		new House({
			gltfloader,
			scene,
			src: './gltf/black_leather_chair.gltf',
			position: {
				x: -2,
				y: 0,
				z: 1,
			},
			rotation: {
				x: 0,
				y: 0,
				z: 0,
			},
			index: 3,
		})
	);

	houses.push(
		new House({
			gltfloader,
			scene,
			src: './gltf/tv.glb',
			position: {
				x: -2,
				y: 0,
				z: 0,
			},
			rotation: {
				x: -Math.PI / 2,
				y: Math.PI / 2,
				z: Math.PI / 2,
			},
			scale: {
				x: 0.01,
				y: 0.01,
				z: 0.01,
			},
			index: 3,
		})
	);

	houses.push(
		new House({
			gltfloader,
			scene,
			src: './gltf/pouf.glb',
			position: {
				x: 1.4,
				y: 0.1,
				z: -3,
			},
			rotation: {
				x: 0,
				y: 0,
				z: 0,
			},
			index: 4,
		})
	);

	houses.push(
		new House({
			gltfloader,
			scene,
			src: './gltf/Books_Magazines.gltf',
			position: {
				x: 1.4,
				y: 0.4,
				z: -3,
			},
			rotation: {
				x: Math.PI / 2,
				y: 0,
				z: 0,
			},
			index: 4,
		})
	);

	//---Plane,로 배경 깔아주기
	const planeGeometry = new THREE.PlaneGeometry(6, 10);
	const material1 = new THREE.MeshStandardMaterial({
		side: THREE.DoubleSide,
		map: texture,
	});
	material1.needsUpdate = true;
	const plane = new THREE.Mesh(planeGeometry, material1);
	plane.position.y = 0;
	plane.rotation.x = -Math.PI / 2;
	scene.add(plane);

	// 텍스쳐 이미지 로드
	// const textureLoader2 = new THREE.TextureLoader();
	// // const texture = textureLoader.load('/textures/brick/Brick_Wall_019_basecolor.jpg');
	// const texture2 = textureLoader2.load(
	// 	'/images/carpet.jpg',
	// 	() => {
	// 		console.log('로드 완료');
	// 	},
	// 	() => {
	// 		console.log('로드 중');
	// 	},
	// 	() => {
	// 		console.log('로드 에러');
	// 	},
	// );

	// const planeGeometry2 = new THREE.PlaneGeometry(3, 3.7);
	// const material2 = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, map: texture2 });
	// material2.needsUpdate=true;
	// const plane2 = new THREE.Mesh(planeGeometry2, material2);
	// plane2.position.y = 0;
	// plane2.rotation.x = -Math.PI/2;
	// plane2.position.z = -0.5;
	// plane2.wrapS = THREE.RepeatWrapping
	// scene.add(plane2)

	//-----그림자 설정
	plane.receiveShadow = true;

	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	// 그리기
	const clock = new THREE.Clock();

	// const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
	// scene.add(lightHelper);

	function draw() {
		const time = clock.getElapsedTime();

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function checkIntersects() {
		if (preventDragClick.mouseMoved) return;
		raycaster.setFromCamera(mouse, camera);

		const intersects = raycaster.intersectObjects(scene.children);

		for (let i = 1; i <= 4; i++) {
			if (intersects[0].object.name === '팝업' + i) {
				if (intersects[0].object.name === '팝업1') {
					const gnb = document.querySelectorAll('.gnb li');
					gnb.forEach((node, idx) => {
						TweenLite.to('.cont' + (idx + 1), 2, {
							left: 0,
							top: 0,
							display: 'none',
						});
					});
					document.querySelectorAll('.gnb li')[0].classList.add('on');
					gsap.to(camera.rotation, {
						duration: 1,
						x: -Math.PI / 2,
					});
					gsap.to(camera.position, {
						duration: 1,
						x: 0,
						y: 5,
						z: -0.5,
					});
				}

				if (intersects[0].object.name === '팝업2') {
					document.querySelectorAll('.gnb li')[1].classList.add('on');
					const gnb = document.querySelectorAll('.gnb li');
					gnb.forEach((node, idx) => {
						TweenLite.to('.cont' + (idx + 1), 2, {
							left: 0,
							top: 0,
							display: 'none',
						});
					});
					gsap.to(camera.rotation, {
						duration: 1,
						x: -THREE.MathUtils.degToRad(20),
						y: -THREE.MathUtils.degToRad(45),
						z: -THREE.MathUtils.degToRad(20),
					});
					gsap.to(camera.position, {
						duration: 1,
						x: 0.1,
						y: 1.7,
						z: 2.7,
					});
				}

				if (intersects[0].object.name === '팝업3') {
					document.querySelectorAll('.gnb li')[2].classList.add('on');
					const gnb = document.querySelectorAll('.gnb li');
					gnb.forEach((node, idx) => {
						TweenLite.to('.cont' + (idx + 1), 2, {
							left: 0,
							top: 0,
							display: 'none',
						});
					});
					gsap.to(camera.rotation, {
						duration: 1,
						x: THREE.MathUtils.degToRad(15),
						y: THREE.MathUtils.degToRad(45),
						z: THREE.MathUtils.degToRad(4),
					});
					gsap.to(camera.position, {
						duration: 1,
						x: 0.1,
						y: 0.1,
						z: 2.7,
					});
				}
				if (intersects[0].object.name === '팝업4') {
					document.querySelectorAll('.gnb li')[3].classList.add('on');
					const gnb = document.querySelectorAll('.gnb li');
					gnb.forEach((node, idx) => {
						TweenLite.to('.cont' + (idx + 1), 2, {
							left: 0,
							top: 0,
							display: 'none',
						});
					});
					gsap.to(camera.position, {
						duration: 1,
						x: 1.2,
						y: 1.6,
						z: 1.2,
					});
				}
				TweenLite.to('.cont' + i, 2, {
					left: '50%',
					top: '50%',
					display: 'block',
				});
			}
		}
	}

	function checkOrigin() {
		gsap.to(camera.rotation, {
			duration: 1,
			x: -THREE.MathUtils.degToRad(25),
			y: 0,
			z: 0,
		});
		gsap.to(camera.position, {
			duration: 1,
			x: 0,
			y: 3,
			z: 5,
		});
	}

	document.querySelectorAll('.close').forEach((el, idx) => {
		el.addEventListener('click', () => {
			TweenLite.to('.cont' + (idx + 1), 2, {
				left: '0%',
				top: '0%',
				display: 'none',
			});

			const nav = document.querySelectorAll('.gnb li');

			nav.forEach((el) => {
				el.classList.remove('on');
			});
			checkOrigin();
		});
	});

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);
	canvas.addEventListener('click', (e) => {
		mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
		mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1);
		// console.log(mouse);
		checkIntersects();
	});

	const preventDragClick = new PreventDragClick(canvas);

	draw();

	const gnb = document.querySelectorAll('.gnb li');

	gnb.forEach((el, idx) => {
		el.addEventListener('click', (e) => {
			e.preventDefault();

			gnb.forEach((node, idx) => {
				node.classList.remove('on');

				TweenLite.to('.cont' + (idx + 1), 2, {
					left: 0,
					top: 0,
					display: 'none',
				});
			});

			e.currentTarget.classList.add('on');

			TweenLite.to('.cont' + (idx + 1), 2, {
				left: '50%',
				top: '50%',
				display: 'block',
			});

			if (idx === 0) {
				gsap.to(camera.rotation, {
					duration: 1,
					x: -Math.PI / 2,
				});
				gsap.to(camera.position, {
					duration: 1,
					x: 0,
					y: 5,
					z: -0.5,
				});
			}
			if (idx === 1) {
				gsap.to(camera.rotation, {
					duration: 1,
					x: -THREE.MathUtils.degToRad(20),
					y: -THREE.MathUtils.degToRad(45),
					z: -THREE.MathUtils.degToRad(20),
				});
				gsap.to(camera.position, {
					duration: 1,
					x: 0.1,
					y: 1.7,
					z: 2.7,
				});
			}
			if (idx === 2) {
				gsap.to(camera.rotation, {
					duration: 1,
					x: THREE.MathUtils.degToRad(15),
					y: THREE.MathUtils.degToRad(45),
					z: THREE.MathUtils.degToRad(4),
				});
				gsap.to(camera.position, {
					duration: 1,
					x: 0.1,
					y: 0.1,
					z: 2.7,
				});
			}
			if (idx === 3) {
				gsap.to(camera.position, {
					duration: 1,
					x: 1.2,
					y: 1.6,
					z: 1.2,
				});
			}
		});
	});
}
