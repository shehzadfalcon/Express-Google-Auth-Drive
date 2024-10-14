const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.get("/auth/google", (req, res) => {
  const redirectUri = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/drive.readonly&access_type=offline&prompt=consent`;
  res.redirect(redirectUri);
});

app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          code,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          redirect_uri: process.env.REDIRECT_URI,
          grant_type: "authorization_code",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );
    // Redirect to frontend with tokens
    res.redirect(
      `http://localhost:5173/callback?access_token=${response.data.access_token}&refresh_token=${response.data.refresh_token}`
    );
  } catch (error) {
    res.send("Error exchanging code for token");
  }
});

app.post("/drive/files", async (req, res) => {
  const accessToken = req.body.access_token;
  try {
    const response = await axios.get(
      "https://www.googleapis.com/drive/v3/files",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data.files);
  } catch (error) {
    res.status(500).send("Error fetching files from Google Drive");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
