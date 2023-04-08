// logic for creating a new comment based on passed form data 
//associates to a specific post
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
        } else {
            const x = await response.json()
            alert(x.message)
        }
    }
}

// logic to allow editing of owned posts
const switchToEdit = async (event) => {
    event.preventDefault();

    const params = window.location;
    const post_id = params.toString().split('/')[params.toString().split('/').length - 1];

            document.location.replace(`/post/edit/${post_id}`)
}

document.querySelector('#comment-form').addEventListener('submit', comment);
document.querySelector('#editRoute').addEventListener('click', switchToEdit);