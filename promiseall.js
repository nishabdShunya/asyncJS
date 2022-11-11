const posts = [
    { title: 'Post One', body: 'This is Post One' },
    { title: 'Post Two', body: 'This is Post Two' }
];

function getPosts() {
    setTimeout(() => {
        let output = '';
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

const user = {
    name: 'Leo',
    lastActivityTime: '10 Nov 2022'
}

function updateLastUserActivityTime() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            user.lastActivityTime = new Date();
            const error = false;
            if (!error) {
                resolve(user.lastActivityTime)
            }
            else {
                reject('Failed')
            }
        }, 1000);
    });
};
// I want you to create one more promise called updateLastUserActivityTime. Every time the user creates a post, this promise should be parallely called (should execute in 1 second).
// When both the promises (createPost and updateLastUserActivityTime) resolve, I want you to console log all the posts created and lastActivityTime of the user.
function firstResolve() {
    Promise.all([createPost({ title: 'Post Three', body: 'This is Post Three' }), updateLastUserActivityTime()])
        .then(([a, b]) => {
            posts.forEach((post) => {
                console.log(post);
            })
            console.log(b);
        });
}
firstResolve();

// Once both the above promises are resolved , I want you to delete the last post by calling the deletion promise. Once successfully deleted, I want you to log the new set of Posts of the user.
function secondResolve() {
    Promise.all([createPost({ title: 'Post Three', body: 'This is Post Three' }), updateLastUserActivityTime()])
        .then(([a, b]) => {
            deletePost()
                .then((deletedPost) => {
                    posts.forEach((post) => {
                        console.log(post);
                    })
                    console.log('This post is deleted: ', deletedPost);
                });
        });
}
// secondResolve();
// NOTE - Do not invoke firstResolve() and secondResolve() simultaneously because they are acting differently on same promise, so the results in console will overlap and may create confusion. So, comment one and invoke the other. This will give expected results.