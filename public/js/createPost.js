// logic to create a post based on passed form data
const post = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const post = document.querySelector('#post-text').value.trim();

    if (title && post) {
        const response = await fetch('/dashboard', {
            method: 'POST',
            body: JSON.stringify({ title, post }),
            headers: { 'Content-Type': "application/json" },
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            const x = await response.json()
            alert(x.message)
        }
    }
}

document.querySelector('#post-form').addEventListener('submit', post);
