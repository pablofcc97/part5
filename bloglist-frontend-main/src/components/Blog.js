import { useState } from 'react'
//import blogService from '../services/blogs'

const Blog = ({ blog, deleteBlog, user, LikeBlog }) => {
  const [visible, setVisible] = useState(false)
  //const [likes, setLikes] = useState(blog.likes)

  /*const LikeBlog = async () => {
    const newBlog = {
      title:blog.title,
      author:blog.author,
      url: blog.url,
      likes:blog.likes+1,
    }
    const response = await blogService.likeBlog(newBlog, blog.id)
    setLikes(response.likes)
  }*/

  /*const updateLikes = async () => {
    setLikes(LikeBlog(blog))
  }*/


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //const hidden = { display:'none', }

  return(
    <div style={blogStyle} className='blog'>
      <span className='blog__title'>{blog.title} by {blog.author}</span> <button className="button--view" onClick={() => setVisible(!visible)}>{visible ?'Hide' :'View'}  </button>
      <div >
        {visible ?(
          <>
            <p className='blog__url'>{blog.url}</p>
            <span className='blog__likes' >{blog.likes}</span> <button className="button--like" onClick={() => LikeBlog(blog)}>Like</button>
            <p className='blog__user'>{user.name}</p>
            <button className="button--remove" onClick={() => deleteBlog(blog)}>Remove</button>
          </>
        ) :(
          <></>
        )}
      </div>
    </div>
  )
}

export default Blog