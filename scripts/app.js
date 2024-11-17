    // Animación de izquierda a derecha y viceversa
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

    //Animación del texto de la primera sección
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
            setTimeout(typeText, 150); 
        } else {
            setTimeout(deleteText, 1000); 
        }
    }
    
    function deleteText() {
        if (currentCharIndex > 0) {
            typingElement.innerHTML = typingElement.innerHTML.slice(0, -1);
            currentCharIndex--;
            setTimeout(deleteText, 100); 
        } else {
            currentTextIndex = (currentTextIndex + 1) % texts.length; 
            setTimeout(typeText, 1000); 
        }
    }
    
    typeText();

    // Creación de cubos animados
    function createCube(containerId, textureUrls) {
        const container = document.getElementById(containerId);
    
        if (!container) {
            console.error(`Contenedor con ID "${containerId}" no encontrado.`);
            return;
        }
    
        const containerWidth = container.offsetWidth || 200;
        const containerHeight = container.offsetHeight || 200;
    
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
        renderer.setSize(containerWidth, containerHeight);
        renderer.setClearColor(0x00000000, 0); 
        container.appendChild(renderer.domElement);
    
        const geometry = new THREE.BoxGeometry(2, 2, 2);  
        const textureLoader = new THREE.TextureLoader();
        
        const materials = textureUrls.map(url => new THREE.MeshBasicMaterial({ map: textureLoader.load(url) }));
    
        while (materials.length < 6) {
            materials.push(new THREE.MeshBasicMaterial({ map: textureLoader.load('https://threejs.org/examples/textures/crate.gif') }));
        }
    
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
        
        camera.position.z = 5;  
    
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
    
        animate();
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        const customTexturesFront = [
            'https://cdn.pixabay.com/photo/2018/05/08/21/28/html5-3384014_640.png',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/768px-JavaScript-logo.png',
            'https://img.icons8.com/?size=512&id=21278&format=png',
            'https://w1.pngwing.com/pngs/885/534/png-transparent-green-grass-nodejs-javascript-react-mean-angularjs-logo-symbol-thumbnail.png',
            'https://e7.pngegg.com/pngimages/224/196/png-clipart-web-development-angularjs-javascript-vue-js-world-wide-web-angle-triangle-thumbnail.png',
            'https://e7.pngegg.com/pngimages/846/87/png-clipart-mean-solution-stack-express-js-node-js-javascript-github-text-trademark.png'
        ];

        const customTexturesBack = [
            'https://e7.pngegg.com/pngimages/5/56/png-clipart-website-development-html5-logo-world-wide-web-consortium-world-wide-web-angle-web-design.png',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/768px-JavaScript-logo.png',
            'https://img.icons8.com/?size=512&id=21278&format=png',
            'https://w1.pngwing.com/pngs/885/534/png-transparent-green-grass-nodejs-javascript-react-mean-angularjs-logo-symbol-thumbnail.png',
            'https://e7.pngegg.com/pngimages/224/196/png-clipart-web-development-angularjs-javascript-vue-js-world-wide-web-angle-triangle-thumbnail.png',
            'https://e7.pngegg.com/pngimages/846/87/png-clipart-mean-solution-stack-express-js-node-js-javascript-github-text-trademark.png'
        ];
    
        createCube("three-container", customTexturesFront);
        createCube("three-container-2", customTexturesBack);
    });
            
