javascript: (() => {
  const formFields = {
    "email": custom,
    
  }

  Object.entries(formFields).forEach(([name, value]) => {
    document.querySelector(`input[name="${name}"]`).value = value;
  });
})();