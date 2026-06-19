console.log('login.ejs page loaded');

const loginForm = document.querySelector('#loginForm');
const generalError = document.querySelector('#generalError');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (generalError) generalError.textContent = '';
        document.querySelectorAll('.error-msg').forEach(span => span.textContent = '');

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });



            const result = await response.json();
            //
            if (!response.ok) {
                if (result.errors && result.errors.email) {
                    const emailErrorSpan = document.querySelector('[data-error="email"]');
                    if (emailErrorSpan) emailErrorSpan.textContent = result.errors.email;
                } else if (result.message) {
                    generalError.textContent = result.message;
                }
                return;
            }
            alert('All ok');
            // const homeResponse = await fetch('/main', {
            //     method: 'GET',
            // });
            //
            // if (homeResponse.ok) {
            //     const html = await homeResponse.text();
            //     document.documentElement.innerHTML = html;
            //     history.pushState(null, '', '/main');
            // }
            window.location.href = '/main';
        } catch (error) {
            console.error('Login error:', error);
        }
    });
}