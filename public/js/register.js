console.log('register.js');

const registratonForm = document.querySelector('#registrationForm');
if (registratonForm) {
    registratonForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        document.querySelectorAll('.error-msg').forEach(span => span.textContent = '');

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData.entries());
        if (data.age) {
            data.age = parseInt(data.age, 10);
        }

        console.log('Send data', data);

        try {
            console.log('h');
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('Server response', result);

            if (!response.ok) {
                if (result.errors) {
                    Object.keys(result.errors).forEach(field => {
                        const errorMessage = result.errors[field];
                        const errorSpan = document.querySelector(`[data-error="${field}"]`);
                        if (errorSpan) {
                            errorSpan.textContent = errorMessage;
                        }
                    });
                } else if (result.message) {
                    alert(result.message);
                }
                console.log('h');
            } else if (response.ok) {
                alert('All ok');
                window.location.href = '/login';
            }

        } catch (error) {
            console.error('Submission error:', error);
        }
    });
}
