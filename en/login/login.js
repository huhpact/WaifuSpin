if (localStorage.getItem("loggedInUseremail") && 
    localStorage.getItem("loggedInUserBalance") && 
    localStorage.getItem("loggedInUserUsername")) {
    window.location.href = "/en/dashboard/dashboard.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.form__box.login');
    const registerForm = document.querySelector('.form__box.register');
    const switchBtns = document.querySelectorAll('.switch__btn');
    const forms = document.querySelectorAll('form');

    switchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.dataset.target;
            
            if (target === 'register') {
                loginForm.classList.remove('active');
                loginForm.classList.add('inactive');
                registerForm.classList.add('active');
                registerForm.classList.remove('inactive');
            } else {
                registerForm.classList.remove('active');
                registerForm.classList.add('inactive');
                loginForm.classList.add('active');
                loginForm.classList.remove('inactive');
            }
        });
    });

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (validateForm(form)) {
                const submitBtn = form.querySelector('.submit__btn');
                submitBtn.classList.add('loading');

                await new Promise(resolve => setTimeout(resolve, 2000));
                
                submitBtn.classList.remove('loading');
                showSuccess(form);
            }
        });

        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
            });

            input.addEventListener('blur', () => {
                validateInput(input);
            });
        });
    });

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input');
        
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (form.id === 'registerForm') {
            const password = form.querySelector('input[type="password"]');
            const confirmPassword = form.querySelectorAll('input[type="password"]')[1];
            
            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Passwords do not match');
                isValid = false;
            }
        }

        return isValid;
    }

    function validateInput(input) {
        const inputField = input.parentElement;
        
        inputField.classList.remove('error');
        const existingError = inputField.querySelector('.error__message');
        if (existingError) {
            existingError.remove();
        }

        if (input.value.trim() === '') {
            showError(input, 'This field is required');
            return false;
        }

        if (input.type === 'email' && !isValidEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }

        if (input.type === 'password' && input.value.length < 6) {
            showError(input, 'The password must be at least 6 characters long');
            return false;
        }

        return true;
    }

    function showError(input, message) {
        const inputField = input.parentElement;
        inputField.classList.add('error');
        
        const errorMessage = document.createElement('span');
        errorMessage.classList.add('error__message');
        errorMessage.textContent = message;
        inputField.appendChild(errorMessage);
    }

    function showSuccess(form) {
        const submitBtn = form.querySelector('.submit__btn');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check success__checkmark"></i>';
        submitBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.backgroundColor = '';
            form.reset();
        }, 2000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    loginForm.classList.add('active');
    registerForm.classList.add('inactive');
});

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/users.json"); 
        const users = await response.json();

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem("loggedInUseremail", email);
            localStorage.setItem("loggedInUserBalance", user.balance);
            localStorage.setItem("loggedInUserUsername", user.username);
            setTimeout(() => {
                window.location.href = "/en/dashboard/dashboard.html"; 
            }, 2000); 
        } else {
            alert("Wrong username or password.");
        }
    } catch (error) {
        console.error("Fehler beim Laden der Benutzerdatei:", error);
    }
});