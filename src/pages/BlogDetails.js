import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteBlog, updateBlog, addComment, toggleReaction } from '../store/blogSlice';
import { jsPDF } from 'jspdf';
import { FaThumbsUp, FaThumbsDown, FaHeart, FaPaperPlane, FaArrowLeft, FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = useSelector((state) => state.blogs.blogs.find((b) => b.id === Number(id)));

  const [editMode, setEditMode] = useState(false);
  const [editedBlog, setEditedBlog] = useState(blog || {});
  const [newComment, setNewComment] = useState('');

  const [buttoms, setbuttoms] = useState(true);
  

  const Edit = () => {
    setEditMode(true)
    setbuttoms(false)
  }

  useEffect(() => {
    if (blog) {
      setEditedBlog(blog);
    }
  }, [blog]);

  if (!blog) {
    return <p>❌ Article introuvable.</p>;
  }

  const handleSave = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    dispatch(updateBlog(editedBlog));
    setEditMode(false);
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id));
    navigate('/');
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({ id: blog.id, comment: newComment }));
      setNewComment('');
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(blog.title, 20, 20);
    doc.text(blog.content, 20, 30);
    doc.text(`Likes: ${blog.likes} | Dislikes: ${blog.dislikes}`, 20, 40);
    doc.text(`Commentaires: ${blog.comments.length}`, 20, 50);
    doc.save(`${blog.title}.pdf`);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    setEditedBlog({ ...editedBlog, attachments: [...(editedBlog.attachments || []), ...newAttachments] });
  };

  function handleRemoveAttachment(index) {
    const updatedAttachments = [...editedBlog.attachments];
    updatedAttachments.splice(index, 1);
    setEditedBlog({ ...editedBlog, attachments: updatedAttachments });
  };

  return (
    <div className="blog-details">
      {editMode ? (
        <form className="edit-mode" onSubmit={handleSave}>
          <input
            type="text"
            value={editedBlog.title}
            onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })}
            className="edit-input"
            placeholder="Article Title"
            required
          />
          <textarea
            value={editedBlog.content}
            onChange={(e) => setEditedBlog({ ...editedBlog, content: e.target.value })}
            className="edit-textarea"
            placeholder="Article content"
            required
          ></textarea>
          <div className="file-upload">
            <label className="upload-label">
              <FaPlus /> Add files
              <input type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} />
            </label>
          </div>
          <div>
            {editedBlog.attachments && editedBlog.attachments.map((file, index) => (
              <div key={index} className="media-item">
                {file.type.startsWith('image/') && <img src={file.url} alt={file.name} width="200" />}
                {file.type === 'application/pdf' && (
                  <a href={file.url} target="_blank" rel="noopener noreferrer">📄 {file.name}</a>
                )}
                {file.type.startsWith('video/') && (
                  <video width="200" controls>
                    <source src={file.url} type={file.type} />
                  </video>
                )}
                <button type="button" onClick={() => handleRemoveAttachment(index)}>
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
          <button type="submit" className="save-button">Save</button>
        </form>
      ) : (
        <>
          <form className='forme-text'>
            <h1>{blog.title}</h1>
            <p className='pra'>{blog.content}</p>
            <div className="media-content">
            {blog.attachments && blog.attachments.map((file, index) => (
              <div key={index} className="media-preview">
                {file.type.startsWith('image/') && <img src={file.url} alt={file.name} width="200" />}
                {file.type === 'application/pdf' && (
                  <a href={file.url} target="_blank" rel="noopener noreferrer">📄 {file.name}</a>
                )}
                {file.type.startsWith('video/') && (
                  <video width="200" controls>
                    <source src={file.url} type={file.type} />
                  </video>
                )}
              </div>
            ))}
          </div>
          </form>
         

          
        </>
      )}
      {buttoms?(<div className='buttoms'>
         
            <button onClick={() => dispatch(toggleReaction({ id: blog.id, type: 'like' }))} style={{ color: '#ffa7c4'}}><FaThumbsUp /> {blog.likes}</button>
            <button onClick={() => dispatch(toggleReaction({ id: blog.id, type: 'dislike' }))} style={{ color: '#ffa7c4'}}><FaThumbsDown /> {blog.dislikes}</button>
            <button onClick={() => dispatch(toggleReaction({ id: blog.id, type: 'love' }))} style={{ color: '#ffa7c4'}}><FaHeart /> {blog.loveCount}</button>
          

        
          <button onClick={Edit} style={{ color: '#ffa7c4'}}><FaEdit /></button>
          <button onClick={handleDelete} style={{ color: '#ffa7c4'}}><FaTrash /></button>
     <button onClick={handleDownloadPDF} className="pdf-class" style={{ color: '#ffa7c4'}}>PDF</button>

      </div>):null}
     
      
      <div className='cmentaire'>
      {buttoms?( <div className='bobo'>
        <div className="comment-section">
          <h3>💬 Comments </h3>
          {blog.comments.length > 0 ? (
            blog.comments.map((comment, index) => (
              <p key={index}>👤{comment}</p>
            ))
          ) : (
            <p>🗨 No comments</p>
          )}

          <div className="add-comment">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              placeholder="Add a comment..."
              className='input-2'
            />
            <button onClick={handleAddComment} className='addc' style={{ color: '#ffa7c4'}}><FaPaperPlane />Submit</button>
          </div>
        </div>
        </div>):null}
        <button onClick={() => navigate('/')} className='returnc' style={{ color: '#ffa7c4'}}>⬅ Retour</button></div>
    </div>
  );
};

export default BlogDetails;
