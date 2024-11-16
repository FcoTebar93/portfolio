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

    const canvas = document.getElementById('cubeCanvas');
    const scene = new THREE.Scene();

    const sizes = {
        width: 300,
        height: 300,
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x007bff,
        wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();