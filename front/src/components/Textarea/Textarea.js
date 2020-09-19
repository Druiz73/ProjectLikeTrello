import React, { useState, useEffect, useRef } from 'react';

const Textarea = ({ isResize, value, name, maxLength, classes, placeholder, showMarkdown, setShowMarkdown, noteValues, handleOnChange }) => {
  const textareaRef = useRef(null);
  const [text, setText] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [parentHeight, setParentHeight] = useState('auto');

  useEffect(() => {
    setParentHeight(`${textareaRef.current.scrollHeight}px`);
    setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
    setText(value);
  }, [textareaHeight])

  const parentStyle = {
    minHeight: parentHeight
  }

  const textareaStyle = {
    height: textareaHeight
  };

  return (
    <div style={isResize ? parentStyle : null }>
      <textarea 
        ref={textareaRef}
        rows={1}
        placeholder={placeholder}
        onChange={e => {
          setTextareaHeight('auto');
          setParentHeight(`${textareaRef.current.scrollHeight}px`);
          handleOnChange({...noteValues, [e.target.name]: e.target.value})
        }}
        value={value}
        maxLength={maxLength}
        onBlur={() => setShowMarkdown(!showMarkdown)}
        onTouchStart={() => setShowMarkdown(false)}
        onClick={() => setShowMarkdown(false)}
        className={classes}
        name={name}
        style={textareaStyle}
      ></textarea>
    </div>
  );

}
 
export default Textarea;