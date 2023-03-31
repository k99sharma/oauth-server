// controllers

// secured route controller
export const securedResource = (req, res) => {
  // sending response back to client
  return res.send({
    success: true,
    data: {
      msg: "You are accessing a secured resource.",
    },
    error: null,
  });
};

// unsecured route controller
export const unsecuredResource = (req, res) => {
  // sending response back to client
  return res.send({
    success: true,
    data: {
      msg: "You are accessing an unsecured resource.",
    },
    error: null,
  });
};
