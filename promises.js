const posts = [
    { title: 'Post One', body: 'This is Post One' },
    { title: 'Post Two', body: 'This is Post Two' }
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        console.log(posts[posts.length - 1]);
        posts.forEach((post) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
};

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            const error = false;
            if (!error) {
                resolve();
            }
            else {
                reject('Error: Something went wrong');
            }
        }, 2000);
    });
};

// Create a new function called delete post which uses promises and deletes in 1 second (processing time - mimic it with setimeout). Everytime you call it, it should delete the last element of the array
function deletePost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (posts.length != 0) {
                resolve(posts.pop());
            }
            else {
                reject('Failed to delete');
            }
        }, 1000);
    });
};

createPost({ title: 'Post Three', body: 'This is Post Three' })
    .then(() => {
        getPosts(); //3
        deletePost()
            .then(() => {
                getPosts(); //2
                deletePost()
                    .then(() => {
                        getPosts(); //1
                        deletePost()
                            .then(() => {
                                getPosts(); //0
                                deletePost()
                                    .then(() => { })
                                    .catch(rej => console.log(`Inside the catch block: ${rej}`));
                            })
                            .catch(rej => console.log(`Inside the catch block: ${rej}`));
                    })
                    .catch(rej => console.log(`Inside the catch block: ${rej}`));
            })
            .catch(rej => console.log(`Inside the catch block: ${rej}`));
    })
    .catch(err => console.log(err));

// Try creating a post (post four) and once the post is created, call delete post after 1 second and delete post 4. How would you do it? Write the code.
// I am having doubts here. I have thought of three solutions listed below (but they are not working).

/* createPost({ title: 'Post Four', body: 'This is Post Four' }).then(getPosts); */

/*
function create4thPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            const error = false;
            if (!error) {
                resolve();
            }
            else {
                reject();
            };
        }, 2000);
    });
};
create4thPost({ title: 'Post Four', body: 'This is Post Four' })
    .then(getPosts);
*/

/* 
createPost({ title: 'Post Three', body: 'This is Post Three' }).then(getPosts);

createPost({ title: 'Post Four', body: 'This is Post Four' })
    .then(() => {
        getPosts();
        deletePost()
            .then(() => {
                getPosts();
                deletePost()
                    .then(() => {
                        getPosts();
                        deletePost()
                            .then(() => {
                                getPosts();
                                deletePost()
                                    .then(() => { })
                                    .catch(rej => console.log(`Inside the catch block: ${rej}`));
                            })
                            .catch(rej => console.log(`Inside the catch block: ${rej}`));
                    })
                    .catch(rej => console.log(`Inside the catch block: ${rej}`));
            })
            .catch(rej => console.log(`Inside the catch block: ${rej}`));
    })
    .catch(err => console.log(err));
*/