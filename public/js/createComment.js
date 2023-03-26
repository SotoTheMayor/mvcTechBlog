const comment = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment-text').value.trim();
    const params = window.location;
    const post_id = params.toString().split('/')[params.toString().split('/').length - 1];

    if (comment) {
        const response = await fetch('/post/:id', {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: { 'Content-Type': "application/json" },
        });

        if (response.ok) {
            document.location.reload()
            // document.location.search(`/post/${post_id}`)
        } else {
            const x = await response.json()
            // alert(x.message)
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit', comment);