export const LoginForm = ({ handleLogin, loginFormData, setLoginFormData }) => {
  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <br />
          <input
            type="text"
            value={loginFormData.username}
            name="Username"
            onChange={({ target }) =>
              setLoginFormData((prev) => ({
                ...prev,
                username: target.value,
              }))
            }
          />
        </div>
        <div>
          Password
          <br />
          <input
            type="password"
            value={loginFormData.password}
            name="Password"
            onChange={({ target }) =>
              setLoginFormData((prev) => ({
                ...prev,
                password: target.value,
              }))
            }
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};
