const Blog = ({ blogs, eventHandler }) => {
  // const blogStyle = {
  //     paddingTop: 10,
  //     paddingLeft: 2,
  //     border: 'solid',
  //     borderWidth: 1,
  //     marginBottom: 5
  // }

  return (
    <div>
      <h3>Blogs</h3>
      <ul>
        {blogs.map((blog, index) => {
          return (
            <li key={blog + '-' + index} className="blog">
              {blog.title} {blog.likes}
              <button onClick={() => eventHandler(blog)}>Increase Likes</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Blog
