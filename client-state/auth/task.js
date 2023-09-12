const signIn = document.getElementById('signin');
const signinForm = document.getElementById('signin__form');
const welcomeBlock = document.getElementById('welcome');
const userId = document.getElementById('user_id');

window.addEventListener('load', () => {
  if (localStorage.loginID) {
    showWelcomeBlock();
    userId.textContent = localStorage.loginID;
  }
});

function showWelcomeBlock() {
  signIn.classList.remove('signin_active');
  welcomeBlock.classList.add('welcome_active');
}

signinForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(signinForm);
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    let response = xhr.response;

    if (response.success) {
        showWelcomeBlock();
        userId.textContent = response.user_id;
        localStorage.loginID = response.user_id;
    } else {
        alert('Неверный логин/пароль');
        form.reset();
    }
  });
  
  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
  xhr.responseType = 'json';
  xhr.send(formData);  
});
