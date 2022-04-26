export const clearStyles = (selector: any) => {
    const selectors = Array.isArray(selector) ? selector : [selector];
    selectors.forEach(clearStyle);
  };
  
  const clearStyle = (selector: any) => {
    const element = document.getElementById(selector);
    if (element && element.parentElement) {
      element.parentElement.removeChild(element);
    }
  };
  
  export const addOutlineStyles = (selector: any, css: any) => {
    const existingStyle = document.getElementById(selector);
    if (existingStyle) {
      if (existingStyle.innerHTML !== css) {
        existingStyle.innerHTML = css;
      }
    } else {
      const style = document.createElement('style');
      style.setAttribute('id', selector);
      style.innerHTML = css;
      document.head.appendChild(style);
    }
  };