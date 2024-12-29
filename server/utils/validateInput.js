exports.validateRegisterInput = ({ contactNumber, password, email }) => {
    if (!contactNumber || !password) {
      return 'Contact number and password are required';
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Invalid email address';
    }
    return null;
  };