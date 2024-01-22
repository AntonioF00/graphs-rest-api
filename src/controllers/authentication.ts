// Importing necessary modules and functions
import express                          from 'express';
import { getUserByEmail, createUser }   from '../db/users';
import { random, authentication }       from '../helpers';

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
    return res.status(200).json(user).end();

  } catch (error) {
    // Handling errors and sending an error response
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
