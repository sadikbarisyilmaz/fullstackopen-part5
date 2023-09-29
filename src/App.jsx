import { useState, useEffect } from "react";
import { Blog } from "./components/Blog";
import { createBlog, getAll } from "./services/blogs";
import { login } from "./services/login";
import { Notification } from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
    if (window.localStorage.getItem("loggedUser")) {
      const loggedUser = window.localStorage.getItem("loggedUser");
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const showNotification = (msg, type) => {
    setErrorMessage(msg);
    setNotification(type);
    setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(loginForm);

    if (response.status === 200) {
      showNotification("Login Successfull", "success");
      const cridentials = response.data;
      setUser(cridentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(cridentials));

      setLoginForm({
        username: "",
        password: "",
      });
    } else {
      showNotification(response.data.error, "fail");
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    showNotification("Logged Out", "success");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await createBlog(blogForm, user.token);

    if (response.status === 201) {
      showNotification(
        `A new blog "${blogForm.title}" by "${blogForm.author}" added`,
        "success"
      );
      setBlogForm({
        title: "",
        author: "",
        url: "",
      });
    } else {
      showNotification(response.data.error, "fail");
    }
  };

  return (
    <div>
      <div>
        <h1>Blogssss</h1>
        {errorMessage && (
          <Notification type={notification} message={errorMessage} />
        )}

        {user && (
          <>
            <h2>{user.name} logged in</h2>
            <button onClick={logout}>Logout</button>
            <br />
            <h3>Create new</h3>
            <form onSubmit={handleSubmit}>
              <div>
                Title
                <br />
                <input
                  type="text"
                  value={blogForm.title}
                  name="Title"
                  onChange={({ target }) =>
                    setBlogForm((prev) => ({
                      ...prev,
                      title: target.value,
                    }))
                  }
                />
              </div>

              <div>
                Author
                <br />
                <input
                  type="text"
                  value={blogForm.author}
                  name="author"
                  onChange={({ target }) =>
                    setBlogForm((prev) => ({
                      ...prev,
                      author: target.value,
                    }))
                  }
                />
              </div>
              <div>
                Url
                <br />
                <input
                  type="text"
                  value={blogForm.url}
                  name="url"
                  onChange={({ target }) =>
                    setBlogForm((prev) => ({
                      ...prev,
                      url: target.value,
                    }))
                  }
                />
              </div>
              <br />
              <button type="submit">Submit</button>
            </form>
            <h3>Blogs</h3>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </>
        )}
        <br />

        {!user && (
          <>
            <h1>Log in to application</h1>
            <form onSubmit={handleLogin}>
              <div>
                Username
                <br />
                <input
                  type="text"
                  value={loginForm.username}
                  name="Username"
                  onChange={({ target }) =>
                    setLoginForm((prev) => ({
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
                  value={loginForm.password}
                  name="Password"
                  onChange={({ target }) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      password: target.value,
                    }))
                  }
                />
              </div>
              <br />
              <button type="submit">login</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
