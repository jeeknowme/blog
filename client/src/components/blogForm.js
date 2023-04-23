import { useState } from 'react'

const Blog = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            ...newBlog
        })

        setNewBlog({ title: '', author: '', url: '', likes: 0 })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewBlog({ ...newBlog, [name]: value })
        console.log(newBlog)
    }

    return (
        <div  className="formDiv">
            <h2>Create a new Blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title <input role="textbox-title" name="title" value={newBlog.title} onChange={handleInputChange}/>
                </div>
                <div>
                    Author <input  name="author" value={newBlog.author} onChange={handleInputChange}/>
                </div>
                <div>
                    URL <input  name="url" value={newBlog.url} onChange={handleInputChange}/>
                </div>
                <div>
                    Likes <input  name="likes" value={newBlog.likes} onChange={handleInputChange}/>
                </div>
                <button>Create</button>
            </form>
        </div>
    )
}


export default Blog
