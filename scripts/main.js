document.addEventListener('DOMContentLoaded', () => {

    // --- 1. PINTURA ---
    const colorDots = document.querySelectorAll('#pintura .color-dot');
    const colorNameDisplay = document.getElementById('selected-color-name');
    const carPaintImg = document.getElementById('car-paint-img');

    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            colorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

            const newImage = dot.getAttribute('data-image');
            const colorName = dot.getAttribute('data-name');
            
            if (newImage && carPaintImg) {
                carPaintImg.src = newImage;
            }
            if (colorName && colorNameDisplay) {
                colorNameDisplay.textContent = `Color: ${colorName}`;
            }

            // Dynamic specifications update
            const paintFinish = document.getElementById('spec-paint-finish');
            const paintGloss = document.getElementById('spec-paint-gloss');
            if (paintFinish && paintGloss && colorName) {
                const lowerName = colorName.toLowerCase();
                if (lowerName.includes('sólido') || lowerName.includes('solido')) {
                    paintFinish.textContent = 'Sólido';
                    paintGloss.textContent = '95% Gloss';
                } else if (lowerName.includes('metalizado')) {
                    paintFinish.textContent = 'Metalizado';
                    paintGloss.textContent = '98% Gloss';
                } else if (lowerName.includes('mate') || lowerName.includes('satin')) {
                    paintFinish.textContent = 'Mate';
                    paintGloss.textContent = '12% Satin';
                } else {
                    paintFinish.textContent = 'Premium';
                    paintGloss.textContent = '97% Gloss';
                }
            }
        });
    });

    // --- 2. CARROCERÍA ---
    const partBtns = document.querySelectorAll('#carroceria .option-btn');
    const partInfoDisplay = document.getElementById('part-info');
    const carPartsImg = document.getElementById('car-parts-img');

    const partDetails = {
        'Capó': '3-5 días hábiles. Tratamiento anticorrosión incluido.',
        'Lip Delantero': '2-3 días hábiles. Mejora aerodinámica y estética deportiva.',
        'Difusor de Taloneras': '2-4 días hábiles. Ajuste perfecto con los laterales del chasis.',
        'Difusor Trasero': '3-4 días hábiles. Salida de escape adaptada según motorización.',
        'Alerón Trasero': '2-3 días hábiles. Fijación de alta seguridad y fibra de carbono opcional.',
        'Retrovisores': '1-2 días hábiles. Carcasas aerodinámicas con intermitentes LED integrados.'
    };

    const partSpecs = {
        'Capó': { material: 'Carbono Prepreg', weight: '-45% vs OEM', aero: 'Canales Extracción' },
        'Lip Delantero': { material: 'Carbono 3K / ABS', weight: '-15% vs OEM', aero: '+15% Downforce' },
        'Difusor de Taloneras': { material: 'Plástico ABS OEM', weight: 'Peso Standard', aero: 'Estabilización Lateral' },
        'Difusor Trasero': { material: 'Carbono Prepreg', weight: '-35% vs OEM', aero: 'Extracción de Flujo' },
        'Alerón Trasero': { material: 'Carbono Seco Autoclave', weight: '-60% vs OEM', aero: '+28% Downforce' },
        'Retrovisores': { material: 'Fibra de Carbono', weight: '-25% vs OEM', aero: 'Reducción Turbulencia' }
    };

    partBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            partBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const part = btn.getAttribute('data-part');
            const newImage = btn.getAttribute('data-image');

            if (newImage && carPartsImg) {
                carPartsImg.src = newImage;
            }

            const details = partDetails[part] || 'Consultar disponibilidad y plazos.';
            
            // Re-render info terminal block
            partInfoDisplay.innerHTML = `
                <div class="tech-header">
                    <strong>Especificaciones Técnicas</strong>
                    <span class="tech-tag">Carbon Fibre</span>
                </div>
                <div class="tech-grid">
                    <div class="tech-item"><span class="tech-lbl">Material:</span> <span class="tech-val" id="spec-part-material">${partSpecs[part]?.material || 'Carbono'}</span></div>
                    <div class="tech-item"><span class="tech-lbl">Peso:</span> <span class="tech-val" id="spec-part-weight">${partSpecs[part]?.weight || 'N/D'}</span></div>
                    <div class="tech-item"><span class="tech-lbl">Montaje:</span> <span class="tech-val">OEM Bolt-on</span></div>
                    <div class="tech-item"><span class="tech-lbl">Aero:</span> <span class="tech-val" id="spec-part-aero">${partSpecs[part]?.aero || 'Optimizado'}</span></div>
                </div>
                <div style="margin-top: 15px;">
                    <strong>Pieza seleccionada:</strong> ${part} <br>
                    <strong>Tiempo estimado:</strong> ${details}
                </div>
            `;
        });
    });

    // --- 3. TAPICERÍA ---
    const materialBtns = document.querySelectorAll('#tapiceria .material-list button');
    const materialColorDots = document.querySelectorAll('#tapiceria .color-dot');
    const materialInfoDisplay = document.getElementById('selected-material-info');
    const carUpholsteryImg = document.getElementById('car-upholstery-img');

    let currentMaterial = 'Cuero';
    let currentColor = 'Marrón Tabaco';

    materialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            materialBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMaterial = btn.getAttribute('data-material');
            updateMaterialInfo();
        });
    });

    materialColorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            materialColorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            currentColor = dot.getAttribute('data-material-color');
            updateMaterialInfo();
        });
    });

    // Initialize initial state on load
    updateMaterialInfo();

    function getUpholsteryImage(material, color) {
        // Normalizar material
        let matKey = '';
        const matNorm = material.trim().toLowerCase();
        if (matNorm.includes('cuero')) matKey = 'cuero';
        else if (matNorm.includes('alc') || matNorm.includes('alca')) matKey = 'alcantara';
        else if (matNorm.includes('tela')) matKey = 'telapremium';

        // Normalizar color
        let colKey = '';
        const colNorm = color.trim().toLowerCase();
        if (colNorm.includes('tabaco') || colNorm.includes('marron') || colNorm.includes('marrón')) {
            colKey = 'marrontabaco';
        } else if (colNorm.includes('negro') || colNorm.includes('carbon') || colNorm.includes('carbón')) {
            colKey = 'negrocarbon';
        } else if (colNorm.includes('gris') || colNorm.includes('artic') || colNorm.includes('ártic')) {
            colKey = 'grisartico';
        } else if (colNorm.includes('beige') || colNorm.includes('arena')) {
            colKey = 'beigearena';
        }

        // Casos especiales por diferencias en los nombres de archivo
        if (matKey === 'alcantara' && colKey === 'marrontabaco') {
            return 'images/materiales/alcantara-marrontacbaco.png';
        }
        if (matKey === 'telapremium' && colKey === 'marrontabaco') {
            return 'images/materiales/telapremium-tabacomarron.png';
        }

        return `images/materiales/${matKey}-${colKey}.png`;
    }

    const materialSpecs = {
        'Cuero': { treat: 'Protección Nutritiva', origin: 'Italia', dur: '150k ciclos' },
        'Alcántara': { treat: 'Repelente Líquidos', origin: 'Italia', dur: '120k ciclos' },
        'Tela Premium': { treat: 'Antimanchas Teflón', origin: 'Alemania', dur: '90k ciclos' }
    };

    function updateMaterialInfo() {
        materialInfoDisplay.textContent = `Combinación: ${currentMaterial} en ${currentColor}`;
        if (carUpholsteryImg) {
            carUpholsteryImg.src = getUpholsteryImage(currentMaterial, currentColor);
        }

        // Dynamic specifications update
        const specTreat = document.getElementById('spec-upholstery-treat');
        const specOrigin = document.getElementById('spec-upholstery-origin');
        const specDur = document.getElementById('spec-upholstery-dur');
        const specDetails = materialSpecs[currentMaterial] || { treat: 'Estándar', origin: 'N/D', dur: '100k ciclos' };
        
        if (specTreat) specTreat.textContent = specDetails.treat;
        if (specOrigin) specOrigin.textContent = specDetails.origin;
        if (specDur) specDur.textContent = specDetails.dur;
    }

    // --- 4. CONTACTO Y NOTIFICACIÓN ---
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button');
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showCustomNotification('¡Solicitud enviada con éxito!', 'Nos pondremos en contacto contigo en breve para darte presupuesto personalizado.');
                form.reset();
                submitBtn.textContent = 'Enviar Solicitud';
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    function showCustomNotification(title, message) {
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }
});
