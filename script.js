// Optimized Global Application State
let globalAppState = {
    isLoading: true,
    globeRotationSpeed: 0.005,
    mousePosition: { x: 0, y: 0 },
    touchDevice: false
};

// Enhanced 3D Globe System
let globe3D = {
    canvas: null,
    context: null,
    rotationX: 0.2,
    rotationY: 0,
    mouseDown: false,
    lastMouseX: 0,
    lastMouseY: 0,
    zoomLevel: 1.0,
    autoRotating: true,
    hazardPoints: [],
};

// Optimized Particle System
let particleSystem = {
    canvas: null,
    context: null,
    particles: [],
    particleCount: 80,
    animationRunning: true
};

/**
 * Displays a notification message on the screen.
 * @param {string} message The message to display.
 */
function showNotification(message) {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    container.appendChild(notification);

    // Automatically remove the notification after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

/**
 * Shows a welcome message notification.
 */
function showWelcomeMessage() {
    showNotification('🌊 Welcome to HazardSphere! Systems are online.');
}

// --- Placeholder functions for unimplemented buttons ---
function emergencyProtocol() { showNotification('🆘 Emergency Protocol Activated! Dispatching alerts.'); }
function aiAssistance() { showNotification('🤖 AI Assistance Mode enabled.'); }
function toggle3DMode() { showNotification('🌍 Toggling 3D Globe Mode.'); }
function toggleSatellite() { showNotification('🛰 Switching to Satellite View.'); }
function toggleReports() { showNotification('📍 Displaying Live Reports.'); }
function toggleSocial() { showNotification('💬 Showing Social Media Feed.'); }
function toggleWeather() { showNotification('🌦 Overlaying Weather Data.'); }
function toggleOceanCurrent() { showNotification('🌊 Visualizing Ocean Currents.'); }

// --- Globe controls with basic functionality ---
function zoomInGlobe() { 
    globe3D.zoomLevel = Math.min(4.0, globe3D.zoomLevel * 1.2); 
    showNotification('➕ Zooming In.'); 
}
function zoomOutGlobe() { 
    globe3D.zoomLevel = Math.max(0.5, globe3D.zoomLevel * 0.8); 
    showNotification('➖ Zooming Out.'); 
}
function resetGlobeView() { 
    globe3D.zoomLevel = 1.0; 
    globe3D.rotationX = 0.2; 
    globe3D.rotationY = 0; 
    showNotification('🏠 Globe View Reset.'); 
}
function autoRotate() { 
    globe3D.autoRotating = !globe3D.autoRotating; 
    showNotification(🔄 Auto-Rotation ${globe3D.autoRotating ? 'Enabled' : 'Disabled'}.); 
}

// Application Initialization
window.addEventListener('load', function() {
    console.log('🌊 HazardSphere initialization started...');
    
    globalAppState.touchDevice = 'ontouchstart' in window;
    
    setTimeout(function() {
        document.getElementById('loadingOverlay').style.display = 'none';
        globalAppState.isLoading = false;
        
        initializeApplication();
        setupFileUpload();
        setDefaultDateTime();
        showWelcomeMessage();
    }, 2500);
});

function initializeApplication() {
    initializeOptimizedParticles();
    initializeEnhanced3DGlobe();
    initializeNeuralNetwork();
    startDataUpdates();
    initializeGeolocation();
    setupEventHandlers();
    
    console.log('✅ All systems initialized');
}

// Enhanced file upload with drag and drop
function setupFileUpload() {
    const fileUploadArea = document.querySelector('.file-upload-area');
    const fileInput = document.getElementById('mediaUpload');

    fileUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        fileUploadArea.classList.add('dragover');
    });

    fileUploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        fileUploadArea.classList.remove('dragover');
    });

    fileUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        fileUploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        fileInput.files = files;
        updateFileUploadDisplay(files);
    });

    fileInput.addEventListener('change', function() {
        updateFileUploadDisplay(this.files);
    });
}

function updateFileUploadDisplay(files) {
    const fileUploadArea = document.querySelector('.file-upload-area');
    if (files.length > 0) {
        let fileList = '';
        for (let i = 0; i < files.length; i++) {
            fileList += 📎 ${files[i].name}<br>;
        }
        fileUploadArea.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 10px;">✅</div>
            <div>${files.length} file(s) selected:</div>
            <div style="font-size: 0.8rem; margin-top: 5px;">${fileList}</div>
        `;
    }
}

function setDefaultDateTime() {
    const now = new Date();
    // Adjust for timezone offset to get local time in YYYY-MM-DDTHH:MM format
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const datetime = now.toISOString().slice(0, 16);
    document.getElementById('observationTime').value = datetime;
}

// New form functions
function saveDraft() {
    const formData = gatherFormData();
    localStorage.setItem('hazardReportDraft', JSON.stringify(formData));
    showNotification('💾 Draft saved successfully');
}

function clearForm() {
    if (confirm('Are you sure you want to clear all form data?')) {
        const reportPanel = document.querySelector('.report-panel');
        reportPanel.querySelectorAll('input, select, textarea').forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else if (input.tagName === 'SELECT') {
                 input.selectedIndex = 0;
            } else if (input.type !== 'range') {
                input.value = '';
            }
        });
        document.getElementById('confidenceLevel').value = 50;
        document.getElementById('confidenceValue').textContent = '50%';
        setDefaultDateTime();
        showNotification('🔄 Form cleared');
    }
}

function gatherFormData() {
    return {
        location: document.getElementById('locationInput').value,
        locationDetails: document.getElementById('locationDetails').value,
        hazardType: document.getElementById('hazardType').value,
        severity: document.getElementById('severityLevel').value,
        confidence: document.getElementById('confidenceLevel').value,
        observationTime: document.getElementById('observationTime').value,
        description: document.getElementById('description').value,
        reporterName: document.getElementById('reporterName').value,
        reporterPhone: document.getElementById('reporterPhone').value,
        reporterEmail: document.getElementById('reporterEmail').value,
        environmentalConditions: {
            windy: document.getElementById('windyConditions').checked,
            rainy: document.getElementById('rainyConditions').checked,
            clear: document.getElementById('clearSky').checked,
            foggy: document.getElementById('foggyConditions').checked,
            extremeTemp: document.getElementById('extremeTemp').checked
        }
    };
}

// Enhanced report submission
function submitAdvancedReport() {
    const formData = gatherFormData();
    
    // Enhanced validation
    if (!formData.hazardType || formData.hazardType.includes('Select')) {
        showNotification('❌ Please specify the ocean hazard type');
        document.getElementById('hazardType').focus();
        return;
    }

    if (!formData.severity || formData.severity.includes('Assessment')) {
        showNotification('❌ Please assess the risk level');
        document.getElementById('severityLevel').focus();
        return;
    }

    if (!formData.description.trim()) {
        showNotification('❌ Please provide a detailed description');
        document.getElementById('description').focus();
        return;
    }

    const reportId = 'HR-' + Date.now().toString().slice(-8) + '-' + Math.floor(Math.random() * 1000);
    
    showNotification(✅ Report ${reportId} submitted successfully!);
    showNotification('📊 Processing through AI analysis system...');
    
    setTimeout(() => {
        showNotification('🧠 AI analysis complete - Report categorized and prioritized');
        localStorage.removeItem('hazardReportDraft');
    }, 3000);
}

function initializeOptimizedParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    particleSystem.canvas = canvas;
    particleSystem.context = ctx;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create optimized particles
    for (let i = 0; i < particleSystem.particleCount; i++) {
        particleSystem.particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 3 + 1,
            opacity: Math.random() * 0.6 + 0.4,
            hue: Math.random() * 60 + 200
        });
    }

    function animateParticles() {
        if (!particleSystem.animationRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particleSystem.particles.forEach(function(particle, i) {
            // Update position
            particle.x += particle.vx * 0.2;
            particle.y += particle.vy * 0.2;

            // Wrap edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            // Draw particle
            ctx.fillStyle = hsla(${particle.hue}, 70%, 60%, ${particle.opacity});
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particleSystem.particles.length; j++) {
                const other = particleSystem.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.strokeStyle = rgba(135, 206, 235, ${0.4 * (1 - distance / 120)});
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// Enhanced 3D Globe with Country Outlines
function initializeEnhanced3DGlobe() {
    const canvas = document.getElementById('globeCanvas');
    const ctx = canvas.getContext('2d');
    
    globe3D.canvas = canvas;
    globe3D.context = ctx;

    function resizeGlobe() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeGlobe();
    window.addEventListener('resize', resizeGlobe);

    // Enhanced hazard points
    globe3D.hazardPoints = [
        { lat: 13.0827, lon: 80.2707, severity: 'high', type: 'tsunami', name: 'Chennai Coast' },
        { lat: 8.5241, lon: 76.9366, severity: 'medium', type: 'storm', name: 'Kerala Coast' },
        { lat: 15.2993, lon: 74.1240, severity: 'low', type: 'waves', name: 'Goa Coast' },
        { lat: 19.0760, lon: 72.8777, severity: 'high', type: 'surge', name: 'Mumbai Coast' },
        { lat: 22.5726, lon: 88.3639, severity: 'medium', type: 'current', name: 'Kolkata Coast' },
        { lat: 20.2961, lon: 85.8245, severity: 'high', type: 'tsunami', name: 'Bhubaneswar Coast' },
        { lat: 11.0168, lon: 76.9558, severity: 'medium', type: 'waves', name: 'Kochi Coast' },
        { lat: 17.6868, lon: 83.2185, severity: 'low', type: 'swell', name: 'Visakhapatnam Coast' }
    ];

    function project3D(lat, lon, radius) {
        const phi = (lat * Math.PI) / 180;
        const theta = ((lon - 180) * Math.PI) / 180 + globe3D.rotationY;
        
        const x = radius * Math.cos(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi);
        const z = radius * Math.cos(phi) * Math.sin(theta);
        
        // Apply rotation
        const tempY = y * Math.cos(globe3D.rotationX) - z * Math.sin(globe3D.rotationX);
        const rotatedZ = y * Math.sin(globe3D.rotationX) + z * Math.cos(globe3D.rotationX);

        return {
            x: x,
            y: tempY,
            z: rotatedZ,
            visible: rotatedZ > -radius
        };
    }

    function drawGlobe() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.4 * globe3D.zoomLevel;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw globe sphere
        const gradient = ctx.createRadialGradient(
            centerX - radius * 0.3, centerY - radius * 0.3, 0,
            centerX, centerY, radius
        );
        gradient.addColorStop(0, 'rgba(135, 206, 235, 0.9)');
        gradient.addColorStop(0.7, 'rgba(70, 130, 180, 0.8)');
        gradient.addColorStop(1, 'rgba(25, 25, 112, 0.6)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw latitude/longitude grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;

        // Draw hazard points
        const points = globe3D.hazardPoints.map(hazard => {
            const point = project3D(hazard.lat, hazard.lon, radius * 1.02);
            point.original = hazard;
            return point;
        }).sort((a,b) => a.z - b.z); // Sort by Z-index for correct layering

        points.forEach(function(point) {
            if (point.z > -radius * 0.5) { // Only draw points on the front half
                const screenX = centerX + point.x;
                const screenY = centerY - point.y;
                const pulseSize = (4 + Math.sin(Date.now() * 0.003) * 2) * (point.z / radius + 0.5);
                const opacity = 0.8 + Math.sin(Date.now() * 0.002) * 0.2;

                const colors = {
                    high: rgba(255, 100, 100, ${opacity}),
                    medium: rgba(255, 200, 100, ${opacity}),
                    low: rgba(100, 255, 100, ${opacity})
                };

                ctx.beginPath();
                ctx.arc(screenX, screenY, pulseSize, 0, Math.PI * 2);
                ctx.fillStyle = colors[point.original.severity];
                ctx.fill();
            }
        });
    }

    function animateGlobe() {
        drawGlobe();

        if (globe3D.autoRotating && !globe3D.mouseDown) {
            globe3D.rotationY += globalAppState.globeRotationSpeed;
        }

        requestAnimationFrame(animateGlobe);
    }

    // Mouse interactions
    canvas.addEventListener('mousedown', function(e) {
        globe3D.mouseDown = true;
        globe3D.lastMouseX = e.clientX;
        globe3D.lastMouseY = e.clientY;
    });

    canvas.addEventListener('mousemove', function(e) {
        if (globe3D.mouseDown) {
            const deltaX = e.clientX - globe3D.lastMouseX;
            const deltaY = e.clientY - globe3D.lastMouseY;

            globe3D.rotationY += deltaX * 0.01;
            globe3D.rotationX -= deltaY * 0.01;

            globe3D.rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, globe3D.rotationX));

            globe3D.lastMouseX = e.clientX;
            globe3D.lastMouseY = e.clientY;
        }
    });

    document.addEventListener('mouseup', function() {
        globe3D.mouseDown = false;
    });

    // Wheel zoom
    canvas.addEventListener('wheel', function(e) {
        e.preventDefault();
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        globe3D.zoomLevel = Math.max(0.5, Math.min(4.0, globe3D.zoomLevel * zoomFactor));
    });

    animateGlobe();
}

// Neural Network
function initializeNeuralNetwork() {
    const canvas = document.getElementById('neuralCanvas');
    const ctx = canvas.getContext('2d');

    function resizeNeural() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeNeural();
    window.addEventListener('resize', resizeNeural);

    const nodes = [];
    const connections = [];
    const layers = [3, 5, 5, 3];

    // Create nodes
    layers.forEach(function(layerSize, layerIndex) {
        for (let i = 0; i < layerSize; i++) {
            nodes.push({
                x: (layerIndex + 1) * (canvas.width / (layers.length + 1)),
                y: (i + 1) * (canvas.height / (layerSize + 1)),
                activation: Math.random(),
                layer: layerIndex
            });
        }
    });

    // Create connections
    nodes.forEach(function(node, i) {
        nodes.forEach(function(target, j) {
            if (target.layer === node.layer + 1) {
                connections.push({
                    from: i,
                    to: j,
                    weight: Math.random() * 2 - 1
                });
            }
        });
    });

    function animateNeural() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update activations
        nodes.forEach(function(node, i) {
            if (node.layer === 0) {
                node.activation = Math.sin(Date.now() * 0.002 + i) * 0.5 + 0.5;
            }
        });

        // Draw connections
        connections.forEach(function(conn) {
            const from = nodes[conn.from];
            const to = nodes[conn.to];
            const opacity = Math.abs(conn.weight) * from.activation * 0.5;

            ctx.strokeStyle = rgba(135, 206, 235, ${opacity});
            ctx.lineWidth = Math.abs(conn.weight);
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
        });

        // Draw nodes
        nodes.forEach(function(node) {
            const size = 4 + node.activation * 6;
            ctx.fillStyle = rgba(135, 206, 235, ${node.activation * 0.7 + 0.3});
            ctx.beginPath();
            ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animateNeural);
    }

    animateNeural();
}

// Data Updates and other functions
function startDataUpdates() {
    setInterval(function() {
        const reportsEl = document.getElementById('activeReports');
        const mentionsEl = document.getElementById('socialMentions');
        const predictionsEl = document.getElementById('aiPredictions');
        const accuracyEl = document.getElementById('accuracy');
        const responseEl = document.getElementById('responseTime');
        const stationsEl = document.getElementById('coastalStations');
        const riskEl = document.getElementById('riskLevel');

        reportsEl.textContent = Math.max(0, parseInt(reportsEl.textContent) + Math.floor(Math.random() * 10) - 5);
        mentionsEl.textContent = Math.max(0, parseInt(mentionsEl.textContent.replace(',', '')) + Math.floor(Math.random() * 50) - 25).toLocaleString();
        predictionsEl.textContent = Math.max(0, parseInt(predictionsEl.textContent) + Math.floor(Math.random() * 4) - 2);
        accuracyEl.textContent = Math.max(85, Math.min(99.9, parseFloat(accuracyEl.textContent) + (Math.random() - 0.5))).toFixed(1) + '%';
        responseEl.textContent = Math.max(0.5, Math.min(5.0, parseFloat(responseEl.textContent) + (Math.random() - 0.5) * 0.5)).toFixed(1) + 's';
        stationsEl.textContent = Math.max(40, Math.min(60, parseInt(stationsEl.textContent) + Math.floor(Math.random() * 3) - 1));
        
        const risks = ['LOW', 'MODERATE', 'ELEVATED', 'HIGH'];
        if(Math.random() < 0.2) riskEl.textContent = risks[Math.floor(Math.random() * risks.length)];

        // Random notifications
        if (Math.random() < 0.08) {
            const alerts = [
                '🌊 New tsunami monitoring data received',
                '⚡ Storm system detected in Bay of Bengal',
                '📊 AI model updated with latest satellite data',
                '🚨 Coastal warning system activated',
                '🛰 Satellite imagery processing complete',
                '📡 Emergency beacon signal detected'
            ];
            showNotification(alerts[Math.floor(Math.random() * alerts.length)]);
        }
    }, 4000);
}

function initializeGeolocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude.toFixed(6);
            const lon = position.coords.longitude.toFixed(6);
            document.getElementById('locationInput').value = 📍 ${lat}, ${lon};
            showNotification(📍 Location detected: ${lat}, ${lon});
        });
    }
}

function setupEventHandlers() {
    document.addEventListener('mousemove', function(e) {
        globalAppState.mousePosition = { x: e.clientX, y: e.clientY };
    });

    // Navigation items
    document.querySelectorAll('.nav-item').forEach(function(item, index) {
        item.addEventListener('click', function() {
            const features = ['Dashboard', 'Reports', 'Analytics', 'Alerts', 'Settings', 'Help'];
            showNotification(🚀 ${features[index]} activated);
        });
    });
}