// controller
import Users from "@/model/user";
import { fromJSON } from "postcss";

//get : http://localhost:3000/api/users
export async function getUsers(req, res) {
  try {
    const users = await Users.find({});

    if (!users) return res.status(404).json({ error: "Data not found" });

    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({ error: "Error while fetching data" });
  }
}

//get : http://localhost:3000/api/users/1

export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "UserId not found" });
  } catch (error) {
    res.status(404).json({ error: "Error getting user data" });
  }
}

//post : http://localhost:3000/api/users

export async function postUser(req, res) {
  try {
    const formData = req.body;

    if (!formData) return res.status(404).json({ error: "No form data" });
    Users.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

//put : http://localhost:3000/api/users/1

export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;
    if (userId && formData) {
      await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(formData);
    }
    res.status(404).json({ error: "User Not Selected" });
  } catch (eror) {
    res.status(404).json({ error: "Error while updating the data" });
  }
}

//deleete : http://localhost:3000/api/users/1

export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      return res.status(200).json({ deleted: userId });
    }
    res.status(404).json({ error: "User not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error while deleteing  the user" });
  }
}
