function getTokenFromAuthHeader(headers) {
  let token = null;

  if (headers.authorization) {
    // беремо ключ authorization з request Headers
    const getAuthValue = headers.authorization.split(" ");

    // перевіряємо на потрібен нам токен
    if (getAuthValue[0] === "Bearer")
      token = headers.authorization.split(" ")[1];
  }

  return token;
}

module.exports = getTokenFromAuthHeader;
