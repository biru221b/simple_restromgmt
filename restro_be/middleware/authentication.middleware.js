import jwt from "jsonwebtoken";
import Admin from "../admin/admin.model.js";

const isValidAdmin = async (req, res, next) => {
  // extract token from req.headers
  const authorization = req.headers.authorization;
  const splittedArray = authorization?.split(" ");
  const token = splittedArray?.length === 2 ? splittedArray[1] : null;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;
  try {
    const secretKey = "jpayotehi";

    payload = jwt.verify(token, secretKey);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // find admin using email from payload
  const admin = await Admin.findOne({ email: payload.email });

  // if not admin, throw error
  if (!admin) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  next();
};

export default isValidAdmin;
