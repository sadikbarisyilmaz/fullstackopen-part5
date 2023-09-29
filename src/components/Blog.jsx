import { useState } from "react";

export const Blog = ({ blog }) => {
  const [toggle, setToggle] = useState(false);
  const blogStyle = {
    padding: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button
          style={{ marginLeft: 5 }}
          onClick={() => (toggle ? setToggle(false) : setToggle(true))}
        >
          {toggle ? "Hide" : "View"}
        </button>
      </div>
      <div style={{ display: ` ${toggle ? "inline" : "none"} ` }}>
        <div>
          URL:{" "}
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
        </div>
        <div>
          Likes: {blog.likes} <button>Like</button>
        </div>
        <div>Created by: {blog.user.name}</div>
      </div>
    </div>
  );
};
