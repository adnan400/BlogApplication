import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }

  if (!users) {
    res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (existingUser) {
    return res
      .status(400) //400 means user not authorized
      .json({ message: 'User already exist , Login instead' });
  }

  const hashingPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashingPassword,
    blog: [],
  });

  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }

  res.status(201).json({ user }); //201 means user created
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: 'Could not find user by this email' }); // this message supposed to be same message of validation for password which is "Incorrect email or password"
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Incorrect email or password' });
  }
  return res.status(200).json({ message: 'Login Successfully' });
};
