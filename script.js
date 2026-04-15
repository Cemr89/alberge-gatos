document.addEventListener('DOMContentLoaded', () => {
    
    const modal = document.getElementById("modal-gato");
    const contenidoModal = document.getElementById("detalles-gato");
    const btnCerrarModal = document.querySelector(".close-modal");

    const lightbox = document.getElementById('lightbox');
    const imgFull = document.getElementById('img-full');
    const btnCerrarLightbox = document.querySelector('.close-lightbox');
    
    try {emailjs.init({
        publicKey: "7H0Xhcq8LPLQwnfjs",
    }); 
    } catch (error) {
    console.log("Error de EmailJS capturado; el audio sigue funcionando.");
}

const miauAudio = new Audio('mew.wav');

    document.querySelectorAll('.cat-card').forEach(tarjeta => {
        
        tarjeta.addEventListener('mouseenter', () => {
            miauAudio.volume = 0.1; 
            miauAudio.currentTime = 0; 
            miauAudio.play().catch(() => {});
        });
        
        const imagen = tarjeta.querySelector('img');
        imagen.style.cursor = "zoom-in"; 
        imagen.addEventListener('click', () => {
            imgFull.src = imagen.src;
            lightbox.style.display = "flex";
        });
    });

    const botones = document.querySelectorAll('.btn-adoptar');
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault(); 
            const tarjeta = e.target.closest('.cat-card');
            const nombre = tarjeta.querySelector('h4').innerText;
            const imagen = tarjeta.querySelector('img').src;
            const parrafos = tarjeta.querySelectorAll('p');

            contenidoModal.innerHTML = `
                <img src="${imagen}" alt="${nombre}" style="width:100%; border-radius:10px;">
                <h2 style="font-family: 'Fredoka One'; color: #ff8c00; margin-top:15px;">${nombre}</h2>
                <p><strong>${parrafos[0].innerText}</strong></p>
                <p style="margin: 15px 0; color: #555;">${parrafos[1].innerText}</p>
                <button class="btn-submit" onclick="document.getElementById('modal-gato').style.display='none'; document.getElementById('contacto').scrollIntoView({behavior:'smooth'})">
                    ¡Quiero adoptar a ${nombre}!
                </button>
            `;
            modal.style.display = "block";
        });
    });

    if(btnCerrarModal) btnCerrarModal.onclick = () => modal.style.display = "none";
    if(btnCerrarLightbox) btnCerrarLightbox.onclick = () => lightbox.style.display = "none";

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == lightbox) {
            lightbox.style.display = "none";
        }
    };
    const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

    const contactForm = document.getElementById('contact-form');
    const btnSubmit = document.querySelector('.btn-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const originalText = btnSubmit.innerText;
            btnSubmit.innerText = 'Enviando...';
            btnSubmit.disabled = true;

            const serviceID = 'default_service'; 
            const templateID = 'template_z94lstf'; 

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    alert('¡Miau! Tu solicitud ha sido enviada con éxito. 🐾');
                    contactForm.reset();
                })
                .catch((err) => {
                    alert('Error al enviar: ' + JSON.stringify(err));
                })
                .finally(() => {
                    setTimeout(() => {
                        btnSubmit.innerText = originalText;
                        btnSubmit.disabled = false;
                    }, 2000);
                });
        });
    }
});