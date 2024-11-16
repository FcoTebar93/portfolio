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
        "Francisco Tébar Navarro", 
        "Software Engineer", 
        "Fullstack Developer"
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