const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character

export { emailRegex, passwordRegex }