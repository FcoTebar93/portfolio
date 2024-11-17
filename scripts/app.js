    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(() => {
            const navbar = document.querySelector('.navbar');
            navbar.classList.add('show');
        }, 3000);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
            } else {
                entry.target.classList.remove('show-section');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden-section');

    hiddenElements.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('from-left');  
        } else {
            el.classList.add('from-right');  
        }

        observer.observe(el);
    });

    const texts = [
        "Software Engineer", 
        "Fullstack Developer",
        "CI/CD",
        "Cloud Storage"
    ];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    const typingElement = document.getElementById("typingEffect");
    
    function typeText() {
        if (currentCharIndex < texts[currentTextIndex].length) {
            typingElement.innerHTML += texts[currentTextIndex].charAt(currentCharIndex);
            currentCharIndex++;
            setTimeout(typeText, 150); // Velocidad de tipeo
        } else {
            setTimeout(deleteText, 1000); // Espera 1 segundo antes de borrar
        }
    }
    
    function deleteText() {
        if (currentCharIndex > 0) {
            typingElement.innerHTML = typingElement.innerHTML.slice(0, -1);
            currentCharIndex--;
            setTimeout(deleteText, 100); // Velocidad de borrado
        } else {
            // Cambiar al siguiente texto del array
            currentTextIndex = (currentTextIndex + 1) % texts.length; // Aumenta el índice y vuelve a 0 si es necesario
            setTimeout(typeText, 1000); // Inicia la escritura del siguiente texto
        }
    }
    
    typeText();

    // Crear la escena
    var scene = new THREE.Scene();

    // Crear la cámara
    var camera = new THREE.PerspectiveCamera(
        75, // Campo de visión
        window.innerWidth / window.innerHeight, // Relación de aspecto inicial
        0.1, // Plano cercano
        1000 // Plano lejano
    );
    camera.position.z = 5; // Posicionar la cámara

    // Seleccionar el contenedor para el canvas
    var container = document.getElementById('three-container');

    // Crear el renderer y vincularlo al contenedor
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight); // Usar dimensiones del contenedor
    container.appendChild(renderer.domElement); // Agregar el canvas al contenedor

    // Crear un cargador de texturas
    var loader = new THREE.TextureLoader();
    var mats = [
        'https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg', // Reemplaza con tus URLs de imágenes
        'https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg',
        'https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg',
        'https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg',
        'https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg',
        'https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg',
    ].map((pic) => {
        return new THREE.MeshLambertMaterial({ map: loader.load(pic) });
    });

    // Crear la geometría de la caja
    var geom = new THREE.BoxGeometry(2, 2, 2);

    // Crear la malla (caja con materiales)
    var box = new THREE.Mesh(geom, mats);
    scene.add(box);

    // Agregar una luz para que se refleje correctamente
    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Animación
    function animate() {
        requestAnimationFrame(animate);

        // Rotar la caja
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    // Ajustar el renderer y la cámara al cambiar el tamaño de la ventana
    window.addEventListener('resize', function () {
        var width = container.clientWidth;
        var height = container.clientHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // Iniciar la animación
    animate();
