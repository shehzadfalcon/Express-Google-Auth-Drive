import React, { useEffect, useState } from "react";
import axios from "axios";
function OAuthSuccess() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("access_token");

    const fetchFiles = async () => {
      try {
        const response = await axios.post("http://localhost:5000/drive/files", {
          access_token: accessToken,
        });

        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
        setError("Error fetching files from Google Drive");
      }
    };

    if (accessToken) {
      fetchFiles();
    }
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {files.map((file: any) => (
            <li key={file.id}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OAuthSuccess;
