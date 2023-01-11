import User from "./model.js";

export default {
  create(payload) {
    return User.create(payload);
  },
};
