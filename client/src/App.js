import { useEffect, useRef, useState } from 'react'
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
    const [blog, setBlog] = useState([])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try{
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        }
        catch (exception){
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
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlog(blog.concat(returnedBlog))
            })
    }

    const handleUsernameChange = (value) => {
        setUsername(value)
    }

    const LoginForm = () =>
    {
        return <Togglable buttonLabel='login'>
            <Login
                handleLogin={handleLogin}
                username={username}
                password={password}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange} />
        </Togglable>
    }

    const BlogForm = () => {
        return <Togglable buttonLabel='New Blog' ref={blogFormRef}>
            <Blog createBlog={addBlog}/>
        </Togglable>
    }


    const handlePasswordChange = (value) => {
        setPassword(value)
    }
    return (
        <div>
            <h3>Hello World</h3>
            {user === null ? LoginForm() : BlogForm()}
            <Notification message={notificationMessage} type={notifType}/>
        </div>
    )
}

export default App
