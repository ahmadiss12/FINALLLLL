const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

const usernameRegisterError = document.querySelector('.usernameRegister');
const emailRegisterError = document.querySelector('.emailRegister');
const passwordRegisterError = document.querySelector('.passwordRegister');
const i11 = document.querySelector('.register-lock-icon');
const i22 = document.querySelector('.register-user-icon');
const i3 = document.querySelector('.register-email-icon');
const RegisterButton = document.querySelector('.btn1');
const usernameRegister = document.querySelector('#registerUsername');
const emailRegister = document.querySelector('#registerEmail');
const passwordRegister = document.querySelector('#registerPassword');

RegisterButton.addEventListener('click', (e) => {
    e.preventDefault();

    i11.style.top = "30%";
    i22.style.top = "30%";
    i3.style.top = "30%";

    if (usernameRegister.value !== '') {
        usernameRegisterError.style.display = "none";
    }
    if (emailRegister.value !== '') {
        emailRegisterError.style.display = "none";
    }
    if (passwordRegister.value !== '') {
        passwordRegisterError.style.display = "none";
    }

    if (emailRegister.value !== '' && usernameRegister.value == '' && passwordRegister.value == '') {
        passwordRegisterError.style.display = "block";
        usernameRegisterError.style.display = "block";
        i11.style.top = "28%";
    }

    if (emailRegister.value == '' && usernameRegister.value !== '' && passwordRegister.value == '') {
        emailRegisterError.style.display = "block";
        passwordRegisterError.style.display = "block";
        i11.style.top = "65%";
    }

    if (emailRegister.value == '' && usernameRegister.value == '' && passwordRegister.value !== '') {
        emailRegisterError.style.display = "block";
        usernameRegisterError.style.display = "block";
        i3.style.top = "65%";
    }

    if (emailRegister.value !== '' && usernameRegister.value !== '' && passwordRegister.value == '') {
        passwordRegisterError.style.display = "block";
        i11.style.top = "28%";
    }

    if (emailRegister.value !== '' && usernameRegister.value == '' && passwordRegister.value !== '') {
        usernameRegisterError.style.display = "block";
        i11.style.top = "28%";
    }

    if (emailRegister.value == '' && usernameRegister.value !== '' && passwordRegister.value !== '') {
        emailRegisterError.style.display = "block";
        i11.style.top = "28%";
    }

    if (usernameRegister.value == '' && emailRegister.value == '' && passwordRegister.value == '') {
        usernameRegisterError.style.display = "block";
        emailRegisterError.style.display = "block";
        passwordRegisterError.style.display = "block";
        i11.style.top = "65%";
        i22.style.top = "65%";
        i3.style.top = "65%";
        return;
    } else if (usernameRegister.value == '') {
        usernameRegisterError.style.display = "block";
        i22.style.top = "65%";
        return;
    } else if (emailRegister.value == '') {
        emailRegisterError.style.display = "block";
        i3.style.top = "65%";
        return;
    } else if (passwordRegister.value == '') {
        passwordRegisterError.style.display = "block";
        i11.style.top = "65%";
        return;
    }

    // Check if username already exists
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const usernameExists = users.some(user => user.username === usernameRegister.value);

    if (usernameExists) {
        usernameRegisterError.textContent = "Username already exists.";
        usernameRegisterError.style.display = "block";
        i22.style.top = "65%";
        return;
    }

    // Add new user
    const newUser = {
        username: usernameRegister.value,
        email: emailRegister.value,
        password: passwordRegister.value
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    window.location.href = "login.html";
});



