// Importing necessary modules and functions
import express                          from 'express';
import { getUserByEmail, createUser }   from '../db/users';
import { random, authentication }       from '../helpers';

// Controller function for user login
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({ message: "Email or password is missing." });
    }

    const user = await getUserByEmail(email).select('+authentication.salt, +authentication.password');

    if(!user){
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if(user.authentication.password != expectedHash){
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('FLORIO-SILLA-AUTH', user.authentication.sessionToken, {domain: 'localhost', path: '/' });

    return res.status(200).json(user).end();

  }catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};


// Controller function for user registration
export const register = async (req: express.Request, res: express.Response) => {
  try {
    // Destructuring user registration data from the request body
    const { email, password, username } = req.body;
    // Checking if required fields are provided
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Email, password, or username is missing." });
    }
    // Checking if a user with the provided email already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    
    // Generating a random salt for password hashing
    const salt = random();
    // Creating a new user in the database
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    // Sending a success response with the created user information
    return res.sendStatus(200).json({message: user}).end();

  } catch (error) {
    // Handling errors and sending an error response
    console.error(error);
    return res.status(500).json({ message: error });
  }
};
