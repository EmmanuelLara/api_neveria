async function getProfile() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No estás autenticado');
        window.location.href = 'login.html';
        return;
      }

      const res = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (res.status === 401) {
        alert('Token inválido o expirado');
        localStorage.removeItem('token');
        window.location.href = 'login.html';
        return;
      }

      const user = await res.json();
      document.getElementById('profile').innerHTML = `
        <p><strong>Nombre:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Registrado el:</strong> ${new Date(user.createdAt).toLocaleString()}</p>
      `;
    }

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });

    getProfile();