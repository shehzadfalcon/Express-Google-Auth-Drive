const App = () => {
  const handleLoginClick = () => {
    window.location.href = "http://localhost:3000/auth";
  };

  return (
    <div>
      <h1>Google drive OAuth2 Integration</h1>
      <p>Click the button below to authenticate with Google drive:</p>
      <button onClick={handleLoginClick}>Login with Google drive</button>
    </div>
  );
};

export default App;
