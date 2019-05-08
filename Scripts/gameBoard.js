function init() {
    clock = new THREE.Clock();
    frameTime = 0;

    Input.keyBoardInit();
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f2f2);

    // camera setup
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, .1, 1000);
    camera.position.set(0, 30, 20);
    camera.rotateX(- 1.3 * Math.PI / 4);
    camera.rotateZ(Math.PI);

    // Add game board
    var platformGeo = new THREE.PlaneGeometry(50, 50, 50);
    var platformMaterial = new THREE.MeshBasicMaterial( {color: 0x636363});
    var platform = new THREE.Mesh(platformGeo, platformMaterial);
    platform.castShadow = false;
    platform.recieveShadow = true;
    scene.add(platform);

    // add a block to represent the character
    player = new Player();
    player.addToScene();
    scene.add( player );

    // add lights
    const LIGHT_INTENSITY = 2,
        LIGHT_COLOR = 0xffffff;
    var ambientLight = new THREE.AmbientLight(LIGHT_COLOR, .1);
    scene.add(ambientLight);

    var light = new THREE.PointLight(LIGHT_COLOR, LIGHT_INTENSITY);
    light.castShadow = true;
    scene.add(light);
    light.position.set(0, 20, 10);

    // get renderer going
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0, 1);

    document.body.appendChild(renderer.domElement);

    //platform.translateY(2.5);

    renderer.render(scene, camera);
}
