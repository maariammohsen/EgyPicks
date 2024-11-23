const User = require('../models/userModel');
exports.getAllUsers = async (req, res) => {
  try {
    const usersMohtarama = await User.find();
    res.status(200).json({
      status: 'Success!',
      result: usersMohtarama.length,
      data: usersMohtarama,
    });
  } catch (err) {
    res.status(500).json({
      status: 'server error',
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userLazeez = await User.findById(req.params.id);
    console.log(userLazeez);
    if (!userLazeez) {
      throw 'user not found!'; //throwing error
    }
    res.status(200).json({
      status: 'Success!',
      data: userLazeez,
    });
  } catch (err) {
    res.status(500).json({
      status: 'server error',
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    //it creates a new user from the request body that the user has inserted his information inside it
    const userMohtaram = await User.create(req.body);
    res.status(200).json({
      status: 'Success!',
      data: userMohtaram,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const byeUser = await User.findByIdAndDelete(req.params.id);
    if (!byeUser) {
      throw "can't find user with this id!";
    }
    res.status(200).json({
      status: 'Success!',
      message: 'user is deleted successfully!',
    });
  } catch (err) {
    res.status(500).json({
      status: 'server error',
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const freshUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!freshUser) {
      throw "can't find user with this id!";
    }
    res.status(200).json({
      status: 'Success!',
      data: freshUser,
    });
  } catch (err) {
    res.status(500).json({
      status: 'server error',
      message: err,
    });
  }
};
