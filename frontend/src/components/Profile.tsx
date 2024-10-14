// src/components/Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get("http://localhost:5000/drive/files", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setFiles(response.data.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h1>Google Drive Files</h1>
      <ul>
        {files.map((file) => (
          <li key={file?.id}>{file?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
