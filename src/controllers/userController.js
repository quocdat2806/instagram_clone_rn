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
    const data = req.body?.payload;
    try {
      const response = await userService.following(data, auth);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async comment(req, res) {
    const auth = res.locals.data.payload;
    const data = req.body?.payload;
    const id = req.params.id;
    try {
      const response = await userService.comment(data, auth, id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
module.exports = new UserController();
