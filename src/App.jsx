import { useState, useEffect } from "react";
import { Blog } from "./components/Blog";
import { createBlog, getAll } from "./services/blogs";
import { login } from "./services/login";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { BlogForm } from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showBlogForm, setshowBlogForm] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [loginFormData, setLoginFormData] = useState({
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
    const response = await login(loginFormData);

    if (response.status === 200) {
      showNotification("Login Successfull", "success");
      const cridentials = response.data;
      setUser(cridentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(cridentials));
      setLoginFormData({
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
      setshowBlogForm(false);
      getAll().then((blogs) => setBlogs(blogs));
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
            {!showBlogForm && (
              <button onClick={() => setshowBlogForm(true)}>New Blog</button>
            )}
            {showBlogForm && (
              <>
                <BlogForm
                  setBlogForm={setBlogForm}
                  blogForm={blogForm}
                  handleSubmit={handleSubmit}
                />
                <button onClick={() => setshowBlogForm(false)}>Cancel</button>
              </>
            )}
            <br />
            <h3>Blogs</h3>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </>
        )}
        <br />

        {!user && (
          <>
            <LoginForm
              handleLogin={handleLogin}
              loginFormData={loginFormData}
              setLoginFormData={setLoginFormData}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
