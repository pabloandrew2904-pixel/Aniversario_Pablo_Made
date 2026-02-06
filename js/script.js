document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. REFERENCIAS A LOS ELEMENTOS DEL DOM
    // =========================================================

    // --- Intro: El Sobre ---
    const envelopeWrapper = document.getElementById('js-envelope');
    const introSection = document.getElementById('intro-section');

    // --- Página 1: Nos Conocimos (Estilo Libro) ---
    const pageConocimos = document.getElementById('page-conocimos');
    const btnNextPage = document.getElementById('btn-next-page');

    // --- Página 2: Novios (Estilo Oscuro) ---
    const pageNovios = document.getElementById('page-novios');
    const btnNextGallery = document.getElementById('btn-next-gallery');

    // --- Página 3: Mejores Momentos (Split Screen / Slide Up) ---
    const pageMoments = document.getElementById('page-moments');
    const btnNextFinal = document.getElementById('btn-next-final');

    // --- Página 4: Carta Final (Texto / Fade In) ---
    const pageLetter = document.getElementById('page-letter');
    const btnRestart = document.getElementById('btn-restart');


    // =========================================================
    // 2. CORAZONES FLOTANTES (EFECTO DECORATIVO)
    // =========================================================
    
    function createFloatingHearts() {
        const container = document.createElement('div');
        container.className = 'floating-hearts';
        document.body.appendChild(container);

        const hearts = ['♥', '♡', '❤', '💕'];
        
        function createHeart() {
            const heart = document.createElement('span');
            heart.className = 'heart';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
            heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
            heart.style.opacity = Math.random() * 0.4 + 0.1;
            container.appendChild(heart);

            // Remover después de la animación
            setTimeout(() => {
                heart.remove();
            }, 10000);
        }

        // Crear corazones cada cierto tiempo
        setInterval(createHeart, 800);
        
        // Crear algunos iniciales
        for (let i = 0; i < 5; i++) {
            setTimeout(createHeart, i * 300);
        }
    }

    // Iniciar corazones flotantes
    createFloatingHearts();


    // =========================================================
    // 3. LÓGICA DE NAVEGACIÓN Y ANIMACIONES
    // =========================================================

    // --- PASO 1: ABRIR EL SOBRE ---
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', () => {
            // Evitamos que se active si ya está abierto
            if (envelopeWrapper.classList.contains('open')) return;

            // Añadimos clase para animar CSS (abrir solapa, sacar carta, zoom)
            envelopeWrapper.classList.add('open');

            // Esperamos a que termine la animación visual
            setTimeout(() => {
                // Ocultamos el contenedor del sobre
                introSection.style.display = 'none';

                // Mostramos la siguiente sección (El Libro)
                if (pageConocimos) {
                    pageConocimos.classList.remove('hidden');
                    pageConocimos.style.opacity = 1; 
                }
            }, 2400); // Ajustado para la animación más suave
        });
    }

    // --- PASO 2: DEL LIBRO (CONOCIMOS) A LA SECCIÓN OSCURA (NOVIOS) ---
    if (btnNextPage) {
        btnNextPage.addEventListener('click', () => {
            
            // Preparamos la sección de abajo (Oscura) para que sea visible
            if (pageNovios) {
                pageNovios.classList.remove('hidden');
            }

            // Ejecutamos la animación de "Pasar Página" en la sección actual (Blanca)
            if (pageConocimos) {
                pageConocimos.classList.add('turn-page-action');
            }

            console.log("Transición: Libro -> Oscuro completada");
        });
    }

    // --- PASO 3: DE LA SECCIÓN OSCURA A MEJORES MOMENTOS (SLIDE UP) ---
    if (btnNextGallery) {
        btnNextGallery.addEventListener('click', () => {
            
            if (pageMoments) {
                // Hacemos que el elemento exista en el DOM (quitamos display:none)
                pageMoments.classList.remove('hidden');

                // Pequeño timeout para permitir que el navegador renderice
                setTimeout(() => {
                    pageMoments.classList.add('slide-up');
                }, 50);
            }
        });
    }

    // --- PASO 4: DE MEJORES MOMENTOS A LA CARTA FINAL (FADE IN) ---
    if (btnNextFinal) {
        btnNextFinal.addEventListener('click', () => {
            
            if (pageLetter) {
                // Mostramos el contenedor
                pageLetter.style.display = 'block';
                pageLetter.classList.remove('hidden');

                // Activamos la opacidad para el efecto Fade In suave
                setTimeout(() => {
                    pageLetter.classList.add('visible');
                    pageLetter.scrollTop = 0;
                }, 50);
            }
        });
    }

    // --- PASO 5: REINICIAR LA EXPERIENCIA ---
    if (btnRestart) {
        btnRestart.addEventListener('click', () => {
            // Recarga la página completa para volver a ver el sobre cerrado
            location.reload();
        });
    }

});