export const BlogForm = ({ blogForm, setBlogForm, handleSubmit }) => {
  return (
    <div>
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
    </div>
  );
};
