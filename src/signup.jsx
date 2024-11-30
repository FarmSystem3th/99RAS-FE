import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleSignupMethod = () => {
    setIsEncrypted((prev) => !prev); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isEncrypted
      ? "https://www.dev-app-server.site/protected-join"
      : "https://www.dev-app-server.site/join";

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { username, password } = response.data;
      setMessage("회원가입 성공");
      alert(`회원가입 성공!\n아이디: ${username}\n비밀번호: ${password}`);
      navigate("/");
    } catch (error) {
      setMessage("회원가입 실패");
      alert("회원가입 실패");
    }
  };

  return (
    <div style={styles.container}>
      <h2>회원가입</h2>
      <button
        onClick={toggleSignupMethod}
        style={{
          ...styles.toggleButton,
          backgroundColor: isEncrypted ? "#3498DB" : "#FF5733", 
        }}
      >
        {isEncrypted ? "암호화된 회원가입" : "취약한 회원가입"}
      </button>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>회원가입</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "200px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  toggleButton: {
    padding: "10px",
    fontSize: "16px",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px",
  },
  message: {
    marginTop: "20px",
    fontSize: "14px",
    color: "red",
  },
};

export default Signup;