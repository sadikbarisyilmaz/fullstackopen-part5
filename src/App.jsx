import { useState, useEffect } from "react";
import { Blog } from "./components/Blog";
import { createBlog, getAll } from "./services/blogs";
import { login } from "./services/login";
import { Notification } from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const cridentials = await login(loginForm);
    setUser(cridentials);

    window.localStorage.setItem("loggedUser", JSON.stringify(cridentials));

    setLoginForm({
      username: "",
      password: "",
    });
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createBlog(blogForm, user.token);
    setBlogForm({
      title: "",
      author: "",
      url: "",
    });
  };

  return (
    <div>
      <div>
        <h1>Blogssss</h1>
        <Notification message={errorMessage} />

        {user && (
          <>
            <h1>Blogssss</h1>
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
                  // value={loginForm.username}
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
                  // value={loginForm.author}
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
                  // value={loginForm.url}
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
                  // value={loginForm.username}
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
                  // value={loginForm.password}
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
