const comment = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment-text').value.trim();

    if (comment) {
        const response = await fetch('/post/:id', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': "application/json" },
        });

        if (response.ok) {
            document.location.reload('/comment')
        } else {
            const x = await response.json()
            // alert(x.message)
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit', comment);