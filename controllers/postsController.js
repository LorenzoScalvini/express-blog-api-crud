const posts = require("../data/posts.js");

// Utility function per la validazione dei dati
function validatePostData(postData) {
  const errors = [];
  const { title, content, image, tags } = postData;

  if (!title?.trim()) {
    errors.push("Title is required and cannot be empty");
  }

  if (!image?.trim()) {
    errors.push("Image is required and cannot be empty");
  }

  if (!content?.trim()) {
    errors.push("Content is required and cannot be empty");
  }

  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    errors.push("At least one tag is required");
  }

  return errors;
}

function handleNotFound(res, next) {
  const error = new Error("Post not found");
  error.status = 404;
  return next(error);
}

// Index function
function index(req, res) {
  res.json(posts);
}

// Show function
function show(req, res, next) {
  const id = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === id);

  if (!foundPost) {
    return handleNotFound(res, next);
  }

  res.json(foundPost);
}

// Store function
function store(req, res, next) {
  const postData = req.body;
  const errors = validatePostData(postData);

  if (errors.length) {
    const error = new Error("Invalid request");
    error.status = 400;
    error.messages = errors;
    return next(error);
  }

  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    ...postData,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
}

// Update function
function update(req, res, next) {
  const id = parseInt(req.params.id);
  const postData = req.body;
  const foundPost = posts.find((post) => post.id === id);

  if (!foundPost) {
    return handleNotFound(res, next);
  }

  const errors = validatePostData(postData);

  if (errors.length) {
    const error = new Error("Invalid request");
    error.status = 400;
    error.messages = errors;
    return next(error);
  }

  const updatedPost = { ...foundPost, ...postData };
  const postIndex = posts.findIndex((post) => post.id === id);
  posts[postIndex] = updatedPost;

  res.json(updatedPost);
}

// Modify function
function modify(req, res, next) {
  const id = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === id);

  if (!foundPost) {
    return handleNotFound(res, next);
  }

  const { title, content, image, tags } = req.body;

  if (title) foundPost.title = title;
  if (content) foundPost.content = content;
  if (image) foundPost.image = image;
  if (tags) foundPost.tags = tags;

  res.json(foundPost);
}

// Destroy function
function destroy(req, res, next) {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return handleNotFound(res, next);
  }

  posts.splice(postIndex, 1);
  res.status(200).json({ message: "Post deleted successfully" });
}

module.exports = { index, show, store, update, modify, destroy };
