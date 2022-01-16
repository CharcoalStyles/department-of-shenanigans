'use strict';
const axios = require("axios");

module.exports.dept = async (event) => {
  const bodyString = event.body ? Buffer.from(event.body, "base64").toString() : {};
  const bodyArray = bodyString.split('&').map((keyVal) => keyVal.split("="));
  const body = bodyArray.reduce((acc, cv) => {
    const newValue = acc;
    newValue[cv[0]] = cv[1]
    return newValue;
  }, {});

  if (Object.keys(body).includes("challenge")) {
    console.log("Challenge Received", body.challenge);
    return {
      statusCode: 200,
      body: body.challenge,
    };
  }

  let departmentName = "filling in the slash command correctly";

  if (Object.keys(body).includes("text")) {
    departmentName = body.text;
  }

  const deptName = `Department+of+${departmentName.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("+")}`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        "blocks": [
          {
            "type": "image",
            "image_url": `https://api-gov-au-crest-branding.apps.y.cld.gov.au/inline.png?agency=${deptName}&height=200`,
            "alt_text": "image1"
          },
        ]
      },
      null,
      2
    ),
  };
};
