import { useEffect, useRef, useState } from 'react'
import BlogEntries from './components/blog'
import Blog from './components/blogForm'
import Login from './components/login'
import Notification from './components/notification'
import Togglable from './components/togglable'
import blogService from './services/blog'
import loginService from './services/login'

const App = () => {
  const blogFormRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notifType, setNotifType] = useState('')
  // const [blog, setBlog] = useState([])
  const [blogs, setBLogs] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogList()
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      blogList()
    } catch (exception) {
      setNotificationMessage('Wrong Credentials')
      setNotifType('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotifType(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      console.log('set blog ta pre')
      setBLogs(blogs.concat(returnedBlog))
    })
  }

  const blogList = () => {
    blogService
      .getAll()
      .then((returnedBlogs) => {
        setBLogs(returnedBlogs)
      })
      .catch((error) => {
        if (error.response.status === 403) {
          window.localStorage.removeItem('loggedBlogappUser')
        }
      })
  }

  const handleIncreaseLikes = (blog) => {
    blogService
      .update(blog._id, { ...blog, likes: blog.likes + 1 })
      .then((updatedBlog) => {
        setBLogs((blogs) => {
          const updatedBlogs = blogs.map((blog) => {
            if (blog._id === updatedBlog._id) {
              return updatedBlog
            } else {
              return blog
            }
          })

          return updatedBlogs
        })
      })
      .catch((error) => {
        console.log('error increasing likes', error)
      })
  }

  const handleUsernameChange = (value) => {
    setUsername(value)
  }

  const LoginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </Togglable>
    )
  }

  const BlogForm = () => {
    return (
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <Blog createBlog={addBlog} />
      </Togglable>
    )
  }

  const handlePasswordChange = (value) => {
    setPassword(value)
  }
  return (
    <div>
      <h3>Hello World</h3>
      <BlogEntries blogs={blogs} eventHandler={handleIncreaseLikes} />
      {user === null ? LoginForm() : BlogForm()}
      <Notification message={notificationMessage} type={notifType} />
    </div>
  )
}

export default App
