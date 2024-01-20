const userService = require("../services/userService");
class UserController {
  async createPost(req, res) {
    const auth = res.locals.data.payload;
    const content = req.body.content ?? "";
    const file = req.file;
    const post = {
      content,
      file,
    };
    try {
      const response = await userService.createPost(post, auth);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
  async createVideo(req, res) {
    const auth = res.locals.data.payload;
    const content = req.body.content ?? "";
    const post = {
      content,
      path: req.file.path,
    };
    try {
      const response = await userService.createVideo(post, auth);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async following(req, res) {
    const auth = res.locals.data.payload;
    const idReceiver = req.params.id;
    try {
      const response = await userService.following(idReceiver, auth);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async comment(req, res) {
    const auth = res.locals.data.payload;
    const data = req.body;
    const id = req.params.id;
    try {
      const response = await userService.comment(data, auth, id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async like(req, res) {
    const auth = res.locals.data.payload;
    const id = req.params.id;
    const type = req.query.type;
    console.log(type, id);
    try {
      const response = await userService.like(id, auth, type);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getComment(req, res) {
    const postId = req.params.id;
    const limit = req.query.limit;
    const page = req.query.page;
    try {
      const response = await userService.getComment(postId, limit, page);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
module.exports = new UserController();
