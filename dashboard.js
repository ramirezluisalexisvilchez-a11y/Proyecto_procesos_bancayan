// Dashboard JavaScript

// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('shalomCurrentUser'));
    if (!user) {
        window.location.href = 'usuario.html';
        return null;
    }
    return user;
}

const currentUser = checkAuth();

// Display user info
if (currentUser) {
    document.getElementById('userName').textContent = currentUser.nombre;
    document.getElementById('userEmail').textContent = currentUser.email;
    document.getElementById('profileNombre').textContent = currentUser.nombre;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileTelefono').textContent = currentUser.telefono;
}

// Logout functionality
function logout() {
    localStorage.removeItem('shalomCurrentUser');
    window.location.href = 'usuario.html';
}

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    logout();
});

document.getElementById('logoutBtn2').addEventListener('click', logout);

// View switching
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const view = this.dataset.view;
        showView(view);
    });
});

function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.dashboard-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Remove active from sidebar items
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected view
    document.getElementById('vista-' + viewName).classList.add('active');
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
}

// Tarifa calculation
document.getElementById('tipoEnvio').addEventListener('change', function() {
    const tiposEnvio = {
        'local': { precio: 8.00, descripcion: 'Envío Local - 24 horas en Lima' },
        'nacional': { precio: 15.00, descripcion: 'Envío Nacional - 2-5 días' },
        'corporativo': { precio: 0, descripcion: 'Contacta para presupuesto' }
    };
    
    const tipo = tiposEnvio[this.value];
    if (tipo) {
        document.getElementById('tarifaDisplay').textContent = 'S/ ' + tipo.precio.toFixed(2);
        document.getElementById('tarifaDescripcion').textContent = tipo.descripcion;
    }
});

// Create Envío
document.getElementById('crearEnvioForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tipoEnvio = document.getElementById('tipoEnvio').value;
    const tarifas = { 'local': 8, 'nacional': 15 };
    const tarifa = tarifas[tipoEnvio] || 0;
    
    const envio = {
        id: 'SHALOM' + Date.now(),
        usuario: currentUser.email,
        descripcion: document.getElementById('descripcion').value,
        peso: document.getElementById('peso').value,
        destinatario: document.getElementById('destinatarioNombre').value,
        destinatarioTel: document.getElementById('destinatarioTelefono').value,
        destinatarioDireccion: document.getElementById('destinatarioDireccion').value,
        distrito: document.getElementById('distrito').value,
        tipoEnvio,
        tarifa,
        estado: 'Pendiente',
        fechaCreacion: new Date().toLocaleDateString(),
        estadosHistorico: [
            { estado: 'Pendiente', fecha: new Date().toLocaleString() }
        ]
    };
    
    // Get all envios
    let envios = JSON.parse(localStorage.getItem('shalomEnvios')) || [];
    envios.push(envio);
    localStorage.setItem('shalomEnvios', JSON.stringify(envios));
    
    alert('¡Envío creado exitosamente!\nNúmero de tracking: ' + envio.id);
    document.getElementById('crearEnvioForm').reset();
    document.getElementById('tipoEnvio').value = '';
    loadEnvios();
    showView('mis-envios');
});

// Load and display envios
function loadEnvios() {
    const envios = JSON.parse(localStorage.getItem('shalomEnvios')) || [];
    const usuarioEnvios = envios.filter(e => e.usuario === currentUser.email);
    
    // Update stats
    document.getElementById('totalEnvios').textContent = usuarioEnvios.length;
    document.getElementById('enviosEntregados').textContent = usuarioEnvios.filter(e => e.estado === 'Entregado').length;
    document.getElementById('enviosEnTransito').textContent = usuarioEnvios.filter(e => e.estado === 'En Tránsito').length;
    document.getElementById('gastoTotal').textContent = 'S/ ' + usuarioEnvios.reduce((sum, e) => sum + e.tarifa, 0).toFixed(2);
    
    // Display envios list
    const enviosList = document.getElementById('enviosList');
    if (usuarioEnvios.length === 0) {
        enviosList.innerHTML = '<p class="empty-state">No tienes envíos aún. <a href="#" class="sidebar-item" data-view="crear-envio">Crear uno ahora</a></p>';
    } else {
        enviosList.innerHTML = usuarioEnvios.map(envio => `
            <div class="envio-card">
                <div class="envio-header">
                    <h3>${envio.id}</h3>
                    <span class="estado-badge ${envio.estado.toLowerCase()}">${envio.estado}</span>
                </div>
                <div class="envio-info">
                    <p><strong>Para:</strong> ${envio.destinatario} (${envio.distrito})</p>
                    <p><strong>Descripción:</strong> ${envio.descripcion}</p>
                    <p><strong>Tarifa:</strong> S/ ${envio.tarifa.toFixed(2)}</p>
                    <p><strong>Fecha:</strong> ${envio.fechaCreacion}</p>
                </div>
                <button class="btn-outline" onclick="showTrackingDetail('${envio.id}')">Ver Detalles</button>
            </div>
        `).join('');
    }
}

function showTrackingDetail(trackingId) {
    const envios = JSON.parse(localStorage.getItem('shalomEnvios')) || [];
    const envio = envios.find(e => e.id === trackingId);
    
    if (envio) {
        alert(`
Detalles del Envío: ${envio.id}

DESTINATARIO:
${envio.destinatario}
${envio.destinatarioDireccion}
${envio.distrito}
Tel: ${envio.destinatarioTel}

PAQUETE:
${envio.descripcion}
Peso: ${envio.peso} kg
Tarifa: S/ ${envio.tarifa}

ESTADO ACTUAL: ${envio.estado}

Historial:
${envio.estadosHistorico.map(h => `• ${h.estado} - ${h.fecha}`).join('\n')}
        `);
    }
}

// Search tracking
document.querySelector('.search-tracking button').addEventListener('click', function() {
    const trackingNumber = document.getElementById('trackingNumber').value;
    const envios = JSON.parse(localStorage.getItem('shalomEnvios')) || [];
    const envio = envios.find(e => e.id === trackingNumber);
    
    const resultDiv = document.getElementById('trackingResult');
    
    if (envio) {
        resultDiv.innerHTML = `
            <div class="tracking-card">
                <h2>Rastreo: ${envio.id}</h2>
                <div class="tracking-status">
                    <p><strong>Estado:</strong> <span class="estado-badge ${envio.estado.toLowerCase()}">${envio.estado}</span></p>
                    <p><strong>Para:</strong> ${envio.destinatario}</p>
                    <p><strong>Dirección:</strong> ${envio.destinatarioDireccion}</p>
                </div>
                <div class="tracking-timeline">
                    <h3>Historial de Movimientos</h3>
                    ${envio.estadosHistorico.map((h, i) => `
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h4>${h.estado}</h4>
                                <p>${h.fecha}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        resultDiv.innerHTML = '<p class="error">No se encontró envío con ese número de tracking</p>';
    }
});

// Load envios on page load
loadEnvios();

console.log('Dashboard script cargado');
