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
    const video = {
      content,
      path: req?.file?.path ?? undefined,
    };
    try {
      const response = await userService.createVideo(video, auth);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async addFollow(req, res) {
    const auth = res.locals.data.payload;
    const idReceiver = req.params.id;
    try {
      const response = await userService.following(idReceiver, auth);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async addComment(req, res) {
    const auth = res.locals.data.payload;
    const data = req.body;
    const postId = req.params.id;
    try {
      const response = await userService.comment(data, auth, postId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async addLike(req, res) {
    const auth = res.locals.data.payload;
    const idLike = req.params.id;
    const typeLike = req.query.type;
    try {
      const response = await userService.like(idLike, auth, typeLike);
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
  async getInfoUser(req, res) {
    const userId = req.params.id;
    try {
      const response = await userService.getInfoUser(userId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getListPostFollowerUsers(req, res) {
    const auth = res.locals.data.payload;
    const limit = req.query.limit;
    const page = req.query.page;
    try {
      const response = await userService.getListPostFollowerUsers(
        auth,
        limit,
        page
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
module.exports = new UserController();
