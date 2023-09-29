import { useState } from "react";
import { deleteBlog, getAll, updateBlog } from "../services/blogs";

export const Blog = ({ blog, setBlogs, token, showNotification }) => {
  const [toggle, setToggle] = useState(false);
  const blogStyle = {
    padding: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      const response = await deleteBlog(token, blog.id);
      getAll().then((blogs) => setBlogs(blogs));
      if (response.status === 204) {
        showNotification(
          `Removed "${blog.title}" by ${blog.author}`,
          "success"
        );
      } else {
        showNotification(`Blot not found`, "fail");
      }
    } else {
      return;
    }
  };

  const handleLike = async () => {
    const likedBlog = blog;
    likedBlog.likes += 1;
    const response = await updateBlog(likedBlog, token, blog.id);
    const blogs = await getAll();
    setBlogs(blogs);
    if (response.status === 201) {
      showNotification(`Liked "${blog.title}" by ${blog.author}`, "success");
    } else {
      showNotification(`Like failed`, "fail");
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        <span className="title">{blog.title}</span> -{" "}
        <span className="author">{blog.author}</span>
        <button
          style={{ marginLeft: 5 }}
          onClick={() => (toggle ? setToggle(false) : setToggle(true))}
        >
          {toggle ? "Hide" : "View"}
        </button>
      </div>
      {toggle && (
        <div>
          <div>
            URL:
            <a href={blog.url} className="url" target="_blank">
              {blog.url}
            </a>
          </div>
          <div>
            Likes: {blog.likes} <button onClick={handleLike}>Like</button>
          </div>
          <div>Created by: {blog.user.name}</div>
          <button onClick={handleDelete}>Remove</button>
        </div>
      )}
    </div>
  );
};
