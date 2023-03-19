const login = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: { 'Content-Type': "application/json" },
        });

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Failed to log in')
        }
    }
}

const signup = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        console.log("************login.js(public)********" + username + email + password)
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': "application/json" },
        });

        if (response.ok) {
            console.log("******login.js***********" + username + " " + email + " " + password)
            console.log("doing anything???")
            document.querySelector('#resultText').innerText = '!!!!!!!!User Created';
            // document.location.replace('/')
        } else {
            alert('Failed to sign up')
        }
    }
}

document.querySelector('#login-form').addEventListener('submit', login);
document.querySelector('#signup-form').addEventListener('submit', signup);