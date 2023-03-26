const findComment = document.querySelector('.comment');

const removePost = async (event) => {
        event.preventDefault();

        const params = window.location;
        const post_id = params.toString().split('/')[params.toString().split('/').length - 1];

        const response = await fetch('/post/edit/:id', {
                method: 'DELETE',
                body: JSON.stringify({ post_id }),
                headers: { 'Content-Type': "application/json" },
            });
    
            if (response.ok) {
                document.location.replace('/dashboard')
            } else {
                const x = await response.json()
                // alert(x.message)
            }
        }
document.querySelector('#post-delete').addEventListener('click', removePost);

const editPost = async (event) => {
    event.preventDefault();

    const params = window.location;
    const post_id = params.toString().split('/')[params.toString().split('/').length - 1];

    const response = await fetch('/post/edit/:id', {
            method: 'PUT',
            body: JSON.stringify({ post_id }),
            headers: { 'Content-Type': "application/json" },
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            const x = await response.json()
            // alert(x.message)
        }
    }
document.querySelector('#post-delete').addEventListener('click', removePost);


if (findComment) {
const removeComment = async (event) => {
        event.preventDefault();

        const params = window.location;
        const post_id = params.toString().split('/')[params.toString().split('/').length - 1];

        const response = await fetch('/post/edit/comment/:id', {
                method: 'DELETE',
                body: JSON.stringify({ post_id }),
                headers: { 'Content-Type': "application/json" },
            });
    
            if (response.ok) {
                document.location.reload('/dashboard')
            } else {
                const x = await response.json()
                alert(x.message)
            }
        }
        document.querySelector('#comment-delete').addEventListener('submit', removeComment);
}
