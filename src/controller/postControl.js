import Post from "../models/post.js";

export const getAllPost = async (req, res) => {
  try {
    const data = await Post.find().populate("author");
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params || {};
    const userId = req.result._id;
    if (!id) {
      res.send("Missing post id");
      return;
    }

    const data = await Post.findById(id).populate("author");
    if (!data) {
      res.send("Invalid post");
      return;
    }
    console.log(data.author._id, userId);
    if (!data.author._id.equals(userId)) {
      res.send("access denied");
      return;
    }

    await Post.deleteOne({ _id: id });
    res.send("post deleted successfully");
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
};

export const newPost = async (req, res) => {
  try {
    const { title, content } = req.body || {};
    const userData = req.result;
    console.log(userData, title, content);

    if (!title && !content) {
      res.send("Missing content or title");
      return;
    }

    req.body.author = userData._id;
    const postData = await Post.create(req.body);
    res.send(postData);
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

export const recentPost = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 3 },
    ]);

    res.send(posts)
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};
