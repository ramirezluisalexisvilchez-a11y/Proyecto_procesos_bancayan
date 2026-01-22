// Auth JavaScript - usuario.html

// Crear usuario admin al cargar si no existe
function inicializarAdmin() {
    let users = JSON.parse(localStorage.getItem('shalomUsers')) || [];
    
    // Si no existe usuario admin, crearlo
    if (!users.find(u => u.email === 'admin@shalom.com')) {
        const adminUser = {
            id: 'admin-001',
            nombre: 'Administrador',
            email: 'admin@shalom.com',
            password: 'admin123',
            telefono: '999999999',
            rol: 'administrador',
            fechaRegistro: new Date().toLocaleDateString()
        };
        users.push(adminUser);
        localStorage.setItem('shalomUsers', JSON.stringify(users));
        console.log('✅ Usuario admin creado: admin@shalom.com / admin123');
    }
}

// Ejecutar al cargar
window.addEventListener('load', inicializarAdmin);

// Switch between Login and Registro tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tab = this.dataset.tab;
        
        // Remove active class from all buttons and forms
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked button and corresponding form
        this.classList.add('active');
        document.getElementById(tab + 'Form').classList.add('active');
    });
});

// Switch tab via link
document.querySelectorAll('.switch-tab').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const tab = this.dataset.tab;
        document.querySelector(`[data-tab="${tab}"]`).click();
    });
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Get user from localStorage
    const users = JSON.parse(localStorage.getItem('shalomUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('shalomCurrentUser', JSON.stringify(user));
        alert('¡Bienvenido ' + user.nombre + '!');
        
        // Redirigir según rol
        if (user.rol === 'administrador') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    } else {
        alert('Correo o contraseña incorrectos');
    }
});

// Registro Form Handler
document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('registroNombre').value;
    const email = document.getElementById('registroEmail').value;
    const password = document.getElementById('registroPassword').value;
    const telefono = document.getElementById('registroTelefono').value;
    
    // Get existing users
    let users = JSON.parse(localStorage.getItem('shalomUsers')) || [];
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        alert('Este correo ya está registrado');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        nombre,
        email,
        password,
        telefono,
        rol: 'usuario',
        fechaRegistro: new Date().toLocaleDateString()
    };
    
    // Add to users array
    users.push(newUser);
    localStorage.setItem('shalomUsers', JSON.stringify(users));
    
    // Log in the new user
    localStorage.setItem('shalomCurrentUser', JSON.stringify(newUser));
    
    alert('¡Cuenta creada exitosamente!');
    window.location.href = 'dashboard.html';
});

console.log('Auth script cargado');
