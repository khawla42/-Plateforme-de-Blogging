import React from 'react';
import styled from 'styled-components';

const Contact = () => {
  return (
    <StyledWrapper>
      <div className="return">
        <form className="form">
          <div className="group">
            <label htmlFor="email">Company Email</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div className="group">
            <label htmlFor="textarea">How Can We Help You?</label>
            <textarea name="textarea" id="textarea" rows={10} cols={50} required defaultValue={"          "} />
          </div>
          <button className="form-submit-btn" type="submit">Submit</button>
        </form>
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  .return {
    width: 400px;
    background: linear-gradient(#212121, #212121) padding-box,
                linear-gradient(145deg, transparent 35%,#e81cff,rgb(162, 72, 156)) border-box;
    border: 2px solid transparent;
    padding: 32px 24px;
    font-size: 14px;
    font-family: inherit;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    border-radius: 16px;
  }

  .return button:active {
    scale: 0.95;
  }

  .return .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .return.group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .return .group label {
    display: block;
    margin-bottom: 5px;
    color: #717171;
    font-weight: 600;
    font-size: 12px;
  }

  .return .group input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    color: #fff;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid #414141;
  }

  .return .group textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    resize: none;
    color: #fff;
    height: 96px;
    border: 1px solid #414141;
    background-color: transparent;
    font-family: inherit;
  }

  .return .group input::placeholder {
    opacity: 0.5;
  }

  .return .group input:focus {
    outline: none;
    border-color: #e81cff;
  }

  .return .group textarea:focus {
    outline: none;
    border-color: #e81cff;
  }

  .return .form-submit-btn {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    align-self: flex-start;
    font-family: inherit;
    color: #717171;
    font-weight: 600;
    width: 40%;
    background: #313131;
    border: 1px solid #414141;
    padding: 12px 16px;
    font-size: inherit;
    gap: 8px;
    margin-top: 8px;
    cursor: pointer;
    border-radius: 6px;
  }

  .return .form-submit-btn:hover {
    background-color: #fff;
    border-color: #fff;
  }`;

export default Contact;
