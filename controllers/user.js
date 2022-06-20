import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    //await bcof async
    const user = await User.findById(req.params.id);
    const { password, ...data } = user._doc;
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
