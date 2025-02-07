import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../store/blogSlice';
import styled from 'styled-components';
import './intrface2.css';

const Intrface2 = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      id: Date.now(),
      title,
      content,
      attachments: files.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      })),
      likes: 0,
      dislikes: 0,
      comments: [],
    };

    dispatch(addBlog(newBlog));
    setTitle('');
    setContent('');
    setFiles([]);
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    setFiles([]);
    alert('Form cleared!');
  };

  return (
    <div className='body'>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          className='title'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <StyledWrapper>
        <div className="file-upload-container">
          <div className="file-upload">
            <input
              multiple
              className="file-input"
              id="fileInput"
              type="file"
              onChange={handleFileChange}
            />
            <label className="file-label" htmlFor="fileInput">
              <i className="upload-icon">📁</i>
              <p>Drag & Drop files here or click to upload</p>
            </label>
          </div>
        </div>
      </StyledWrapper>
      <div className="preview-section">
        {files.map((file, index) => (
          <div key={index} className="file-preview">
            {file.type.startsWith('image/') && (
              <img src={URL.createObjectURL(file)} alt="Preview" width="200" multiple/>
            )}
            {file.type === 'application/pdf' && (
              <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                📄 {file.name}
              </a>
            )}
            {file.type.startsWith('video/') && (
              <video width="200" controls>
                <source src={URL.createObjectURL(file)} type={file.type} />
              </video>
            )}
          </div>
        ))}
      </div>
<div className='intr'>
      <button type="submit">Add Blog</button>
      <button type="button" onClick={clearForm}>Clear</button></div>
    </form>
    </div>
  );
};

const StyledWrapper = styled.div`
  .file-upload-container {
    width: 100%;
    max-width: 500px;
    margin: 10px 0;
  }

  .file-upload {
    border: 2px dashed rgb(206, 140, 172);
    border-radius: 10px;
    padding: 30px;
    text-align: center;
    background-color: #fff;
    transition: background-color 0.3s;
    cursor: pointer;
  }

  .file-upload:hover {
    background-color: #f0f8ff;
  }

  .file-input {
    display: none;
  }

  .file-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    color:rgb(0, 0, 0);
    cursor: pointer;
  }

  .upload-icon {
    font-size: 40px;
    margin-bottom: 5px;
  }

  .preview-section {
    margin-top: 15px;
  }

  .file-preview {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  img, video {
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 100%;
  }

  a {
    text-decoration: none;
    color:rgb(5, 9, 13);
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default Intrface2;
