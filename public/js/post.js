const post = async (event) => {
    event.preventDefault();

    const post = document.querySelector('#post-text').value.trim();

    if (post) {
        const response = await fetch('/dashboard', {
            method: 'POST',
            body: JSON.stringify({ post }),
            headers: { 'Content-Type': "application/json" },
        });

        if (response.ok) {
            document.location.reload('/dashboard')
        } else {
            const x = await response.json()
            alert(x.message)
        }
    }
}



document.querySelector('#post-form').addEventListener('submit', post);
