/* What we are trying to do here?
Mimic blog posts on a server: getting them and then creating a blog post */
const posts = [
    { title: 'Post One', body: 'This is Post One', createdAt: Math.floor(new Date().getTime() / 1000) },
    { title: 'Post Two', body: 'This is Post Two', createdAt: Math.floor(new Date().getTime() / 1000) }
];
// We have used setTimeouts in these functions because we are trying to mimic a server and server takes some time to return data.
let setIntervalID;
function getPosts() {
    clearInterval(setIntervalID);
    setIntervalID = setInterval(() => {
        let output = '';
        posts.forEach((post) => {
            output += `<li>${post.title} created ${Math.floor(new Date().getTime() / 1000) - post.createdAt} seconds ago</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
};

function createPost(post, callback) {
    setTimeout(() => {
        posts.push({ ...post, createdAt: Math.floor(new Date().getTime() / 1000) });
        callback();
    }, 2000);
};

function create4thPost(callback) {
    setTimeout(() => {
        callback({ title: 'Post Four', body: 'This is Post Four' }, getPosts);
    }, 2000);
};

getPosts();
createPost({ title: 'Post Three', body: 'This is Post Three' }, getPosts);
create4thPost(createPost);