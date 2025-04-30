document.addEventListener('DOMContentLoaded', () => {
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  const form = document.getElementById('authForm');
  const fullNameInput = document.getElementById('fullName');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const messageDiv = document.getElementById('message');

  modeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const mode = document.querySelector('input[name="mode"]:checked').value;
      fullNameInput.style.display = mode === 'register' ? 'block' : 'none';
      confirmPasswordInput.style.display = mode === 'register' ? 'block' : 'none';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (mode === 'register') {
      const fullName = fullNameInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (password !== confirmPassword) {
        messageDiv.textContent = 'كلمة السر غير متطابقة';
        messageDiv.style.color = 'red';
        return;
      }

      localStorage.setItem(email, JSON.stringify({ fullName, password, balance: 0, wallet: generateWallet() }));
      messageDiv.textContent = 'تم تسجيل حسابك بنجاح';
      messageDiv.style.color = 'green';
      setTimeout(() => window.location.href = 'dashboard.html?user=' + email, 1000);
    } else {
      const userData = localStorage.getItem(email);
      if (!userData) {
        messageDiv.textContent = 'الحساب غير موجود';
        messageDiv.style.color = 'red';
        return;
      }

      const user = JSON.parse(userData);
      if (user.password !== password) {
        messageDiv.textContent = 'كلمة السر غير صحيحة';
        messageDiv.style.color = 'red';
        return;
      }

      messageDiv.textContent = 'تم تسجيل الدخول بنجاح';
      messageDiv.style.color = 'green';
      setTimeout(() => window.location.href = 'dashboard.html?user=' + email, 1000);
    }
  });

  function generateWallet() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    return 'T' + Array.from({ length: 33 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }
});
