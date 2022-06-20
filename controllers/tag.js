import Tag from "../models/tags.js";

export const getTags = async (req, res) => {
  try {
    //await bcof async
    const posts = await Tag.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const pushTag = async (req, res) => {
  const newTag = new Tag(req.body);

  try {
    console.log(newTag);
    await newTag.push();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const createTag = async (req, res) => {
  const newTag = new Tag(req.body);
  try {
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
