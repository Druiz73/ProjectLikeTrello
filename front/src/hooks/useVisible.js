import { useState, useRef, useEffect} from 'react';

const useVisible = (initialVisible) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const ref = useRef(null);
  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target) && !e.target.id) {
      setIsVisible(false);
    } 
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }
  }, [])

  return { ref, isVisible, setIsVisible };
}
 
export default useVisible;