function init() {
    clock = new THREE.Clock();
    frameTime = 0;

    Input.keyBoardInit();
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xA7A3A3);

    // camera setup
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, .1, 1000);
    camera.position.set(0, 15, -40);

    // Add game board
    var platformGeo = new THREE.PlaneGeometry(BOARD_SIDE_LENGTH, BOARD_SIDE_LENGTH, BOARD_SIDE_LENGTH);
    var platformMaterial = new THREE.MeshBasicMaterial( {color: 0x750000});
    var platform = new THREE.Mesh(platformGeo, platformMaterial);
    platform.castShadow = false;
    platform.recieveShadow = true;
    scene.add(platform);

    // add a spawn platform
    var spawnGeo = new THREE.PlaneGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    var spawnMaterial = new THREE.MeshLambertMaterial( {color: 0xffe900});
    var spawn = new THREE.Mesh(spawnGeo, spawnMaterial);
    spawn.castShadow = false;
    spawn.recieveShadow = true;
    spawn.position.set(0, (BOARD_SIDE_LENGTH + BLOCK_SIZE) / 2, 0);
    scene.add(spawn);

    player = new Player();
    player.addToScene();
    camera.lookAt(player.Mesh.position);
    player.Mesh.add(camera);

    // Move player to spawn
    player.place(0, (BOARD_SIDE_LENGTH + BLOCK_SIZE) / 2);

    // add lights
    const LIGHT_INTENSITY = 2,
        LIGHT_COLOR = 0xffffff;
    var ambientLight = new THREE.AmbientLight(LIGHT_COLOR, .1);
    scene.add(ambientLight);

    var light = new THREE.PointLight(LIGHT_COLOR, LIGHT_INTENSITY);
    light.castShadow = true;
    scene.add(light);
    light.position.set(0, 40, 20);

    var light = new THREE.PointLight(LIGHT_COLOR, LIGHT_INTENSITY);
    light.castShadow = true;
    scene.add(light);
    light.position.set(0, -40, 20);

    // Place our blocks
    build();

    // get renderer going
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0, 1);

    // axis helper to see whats going on
    /* var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper); */

    document.body.appendChild(renderer.domElement);

    //platform.translateY(2.5);

    renderer.render(scene, camera);
}
