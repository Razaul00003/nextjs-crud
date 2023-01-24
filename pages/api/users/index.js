import { deleteUser, getUsers, postUser, putUser } from "@/database/controller";
import connectMongo from "@/database/conn";

export default async function handler(req, res) {
  connectMongo();

  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in  connection from catch" })
  );
  //type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getUsers(req, res);
      break;
    case "POST":
      postUser(req, res);
      break;
    case "PUT":
      putUser(req, res);
      break;
    case "DELETER":
      deleteUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not allowed`);
  }
}
