import jwt from "jsonwebtoken";

const createAccessToken = (document) => {
  const payload = {
    id: document._id,
  };
  const newToken = jwt.sign(payload, "KYMA", {
    expiresIn: "1h",
  });
  return newToken;
};

const verifyToken = (token) => {
  const checkToken = jwt.verify(token, "KYMA");
  return checkToken;
};
export { createAccessToken, verifyToken };
