const Blog = ({ blog, eventHandler }) => {
    // const blogStyle = {
    //     paddingTop: 10,
    //     paddingLeft: 2,
    //     border: 'solid',
    //     borderWidth: 1,
    //     marginBottom: 5
    // }

    return (
        // <div style={blogStyle}>
        //         {blog.title} {blog.author}
        //     </div>
        // </div>
        <li className="blog">
            {blog.title}
            <button onClick={() => eventHandler()}>Test Lang</button>
        </li>
    )}

export default Blog
