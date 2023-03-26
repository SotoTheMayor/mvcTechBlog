const findPost = document.querySelector('.post');
const findComment = document.querySelector('.comment');

if (findPost) {
const removePost = async (event) => {
        event.preventDefault();

        const params = window.location;
        const post_id = params.toString().split('/')[params.toString().split('/').length - 1];

        const response = await fetch('/dashboard/post/:id', {
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
document.querySelector('.post-delete').addEventListener('delete', removePost);
}

if (findComment) {
const removeComment = async (event) => {
        event.preventDefault();

        const params = window.location;
        const post_id = params.toString().split('/')[params.toString().split('/').length - 1];

        const response = await fetch('/dashboard/comment/:id', {
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
