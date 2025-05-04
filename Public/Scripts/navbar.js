document.getElementById('hideNavbarButton').addEventListener('click', function() {
    const navbar = document.getElementById('mainNavbar');
    navbar.style.display = 'none';
    
    // Cria e mostra imediatamente o botão para exibir a navbar
    const showButton = document.createElement('button');
    showButton.className = 'btn btn-primary';
    showButton.textContent = 'Mostrar Navbar';
    showButton.style.position = 'fixed';
    showButton.style.top = '20px';
    showButton.style.right = '20px';
    showButton.style.zIndex = '1000';
    
    showButton.addEventListener('click', function() {
      navbar.style.display = '';
      document.body.removeChild(showButton);
    });
    
    document.body.appendChild(showButton);
  });

  