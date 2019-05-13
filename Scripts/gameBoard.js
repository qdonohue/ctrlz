function init() {
    clock = new THREE.Clock();
    frameTime = 0;
    
    Input.keyBoardInit();
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(BACKGROUND_COLOR);

    // camera setup
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, .1, 1000);
    // camera.position.set(0, 15, -40); //default
    camera.position.set(-2, 20, -50); // horizontal
    p1View.camera = camera;
    
    camera2 = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, .1, 1000);
    camera2.position.set(-2, 20, -50); // horizontal
    p2View.camera = camera2;

    // Add game board
    var platformGeo = new THREE.PlaneGeometry(BOARD_SIDE_LENGTH, 2 * BOARD_SIDE_LENGTH, BOARD_SIDE_LENGTH);
    var platformMaterial = new THREE.MeshBasicMaterial( {color: 0x750000});
    var platform = new THREE.Mesh(platformGeo, platformMaterial);
    platform.castShadow = false;
    platform.recieveShadow = true;
    scene.add(platform);

    // add mid line
    var midLineMat = new THREE.LineBasicMaterial( {color: 0x000000, linewidth: 5});
    var midLineGeo = new THREE.Geometry();
    midLineGeo.vertices.push(new THREE.Vector3(-BOARD_SIDE_LENGTH / 2, 0, 0));
    midLineGeo.vertices.push(new THREE.Vector3(BOARD_SIDE_LENGTH / 2, 0, 0));
    var midLine = new THREE.Line(midLineGeo, midLineMat);
    scene.add(midLine);

    // add a spawn platform
    var spawnGeo = new THREE.PlaneGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    var spawnMaterial = new THREE.MeshLambertMaterial( {color: 0xffe900});
    var spawn = new THREE.Mesh(spawnGeo, spawnMaterial);
    spawn.castShadow = false;
    spawn.recieveShadow = true;
    spawn.position.set(0, SPAWN_DISTANCE, 0);
    scene.add(spawn);

    // add second spaw platform
    var spawnGeo2 = new THREE.PlaneGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    var spawnMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffe900});
    var spawn2 = new THREE.Mesh(spawnGeo2, spawnMaterial2);
    spawn2.castShadow = false;
    spawn2.recieveShadow = true;
    spawn2.position.set(0, -SPAWN_DISTANCE, 0);
    scene.add(spawn2);

    player1 = new Player(IS_PLAYER_1);
    player1.addToScene();
    // Horizontal setup
    camera.lookAt(player1.Mesh.position.clone().add(new THREE.Vector3(-2, 15, 0)));
    player1.Mesh.add(camera);

    // Move player to spawn
    player1.place(0, SPAWN_DISTANCE);

    // give player their blocks
    // have turrets target player 1 for now (by passing false here)
    var playerBlockArray = buildPlayerArray(p1BlockOrder, p1BlockType, IS_PLAYER_1);
    player1.assignBlocks(playerBlockArray);

    players.push(player1);

    // make player 2
    player2 = new Player(!IS_PLAYER_1);
    player2.addToScene();
    camera2.lookAt(player2.Mesh.position.clone().add(new THREE.Vector3(-2, 15, 0)));
    player2.Mesh.add(camera2);

    // Move player to spawn
    player2.place(0, -SPAWN_DISTANCE);

    // give player their blocks
    // have turrets target player 1 for now (by passing false here)
    var player2BlockArray = buildPlayerArray(p2BlockOrder, p2BlockType, !IS_PLAYER_1);
    player2.assignBlocks(player2BlockArray);

    players.push(player2);

    temporal = new TemporalManagement(players);

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

    // get renderer going
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0, 1);

    // axis helper to see whats going on
    var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    document.body.appendChild(renderer.domElement);

    //platform.translateY(2.5);

    renderer.render(scene, camera);
}
