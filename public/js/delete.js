// logic for deleting posts
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
                alert(x.message)
            }
        }
     
// logic for editing posts
const editPost = async (event) => {
    event.preventDefault();
            
    const params = window.location;
    const post_id = params.toString().split('/')[params.toString().split('/').length - 1];
    const post = document.querySelector('#update-body').value.trim();

    const response = await fetch('/post/edit/:id', {
        method: 'PUT',
        body: JSON.stringify({ post_id, post }),
        headers: { 'Content-Type': "application/json" },
    });
    
    if (response.ok) {
        document.location.replace(`/post/edit/${post_id}`)
    } else {
        const x = await response.json()
        alert(x.message)
    }
}

document.querySelector('#post-delete').addEventListener('click', removePost);
document.querySelector('#post-update').addEventListener('click', editPost);