import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './intrface1.css';


const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to filter blogs based on the search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='home'>

    <div className='dev' >
      
        <h1>List of articles</h1>

        {/* Search field */}
        <input
          type="text"
          placeholder="Search for an article..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='inputt'
        />
    </div>
      {/* Filtered blog list */}
      <div className='articlesSection'>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div key={blog.id} className='articles'>
              <h2 className='texte22'>
                <Link to={`/blogs/${blog.id}`} style={{ color: '#982f5c', textDecoration: 'none' }}>
                  {blog.title}
                </Link>
              </h2>
              <p className='textee'>{blog.content.substring(0, 100)}...</p> {/* Display a summary */}
              <Link to={`/blogs/${blog.id}`} className='Voir-plus'>
              See more
              </Link>
              {/* Display photo preview if available */}
              {blog.photo && (
                <div style={{ marginTop: '1rem' }}>
                  <img src={blog.photo} alt="Blog Preview" style={{ width: '100px', height: 'auto' }} />
                </div>
              )}
              {/* Display PDF link if available */}
              {blog.pdf && (
                <div style={{ marginTop: '1rem' }}>
                  <a href={blog.pdf} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db' }}>
                    View PDF
                  </a>
                </div>
              )}
              {/* Display Video preview if available */}
              {blog.video && (
                <div style={{ marginTop: '1rem' }}>
                  <video width="200" controls>
                    <source src={blog.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No articles found for "{searchTerm}".</p>
        )}
      </div>

      {/* Footer */}
      <footer className='footer'>
      <div className='programmed'>
      <h1>Programmed by Khaoula elmanfalouti</h1>
      <h2>Under the supervision of a teacher Hajar Hardi</h2></div>
      <div className='linke'>
      <p><a href="https://www.facebook.com" style={{ color: '#ff39c7', textDecoration: 'none' }}>Facebook</a></p>
        <p><a href="https://www.instagram.com" style={{ color: '#ff39c7', textDecoration: 'none' }}>Instagram</a></p>
        <p><a href="https://web.telegram.org"  style={{ color: '#ff39c7', textDecoration: 'none' }}>Telegram</a></p>
        <p><a href="https://www.linkedin.com"  style={{ color: '#ff39c7', textDecoration: 'none' }}>LinkedIn</a></p>
        <p></p>
        </div>
        
      </footer>
    
    </div>
  );
};

export default BlogList;
