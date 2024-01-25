import jwt from 'jsonwebtoken';

const createAccessToken = (document) => {
  const payload = {
    id: document._id,
  };
  const newToken = jwt.sign(payload, 'KYMA', {
    expiresIn: '1h',
  });

  // Save the token to HttpOnly cookie
  // Make sure to set the 'secure' option to true in a production environment if using HTTPS
  document.cookie = `token=${newToken}; path=/; HttpOnly; SameSite=Strict;`;

  return newToken;
};

const verifyToken = (token) => {
  const checkToken = jwt.verify(token, 'KYMA');
  return checkToken;
};

export { createAccessToken, verifyToken };
