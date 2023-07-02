import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/notification'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ message:'',success:true })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try{
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    }catch (exception) {
      showMessage({ message:`wrong credentials`,success:false })
      console.log(exception)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try{
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))

      showMessage({ message:`a new blog '${blog.title}' by ${blog.author} added`,success:true })
    }catch (exception) {
      showMessage({ message:`Error: ${exception}`,success:false })
      console.log(exception)
    }
  }

  const deleteBlog = async (blog) => {
    if(window.confirm(`Sure to remove blog ${blog.name} by ${blog.author}?`)){
      try{
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))

        showMessage({ message:`blog deleted correctly`,success:true })
      }catch (exception) {
        showMessage({ message:`Error: ${exception.response.data.error}`,success:false })
        console.log(exception)
      }
    }
  }
  /* */
  const LikeBlog = async (blogToUpdate) => {
    const newBlog = {
      title:blogToUpdate.title,
      author:blogToUpdate.author,
      url: blogToUpdate.url,
      likes:blogToUpdate.likes+1,
    }
    const response = await blogService.likeBlog(newBlog, blogToUpdate.id)

    setBlogs(blogs.map(b => {
      return b.id === response.id
        ? response
        : b
    }))
  }

  /* */
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const showMessage=(messageObject) => {
    setMessage(
      messageObject
    )
    setTimeout(() => {
      setMessage({ ...message,message:'' })
    }, 5000)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message.message} success={message.success}/>
      {user === null
        ?<LoginForm
          handleLogin={handleLogin}>
        </LoginForm>
        :<div>
          <span>{`${user.name} logged In`}</span>
          <button className='button--logout' onClick={() => logout()}>Logout</button>
          <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            ></BlogForm>
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map( blog => <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} user={user} LikeBlog={LikeBlog}/> )}
        </div>
      }
    </div>
  )
}

export default App