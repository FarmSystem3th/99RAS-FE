import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "", role: "" });
  const [error, setError] = useState(null);
  const [apiChoice, setApiChoice] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApiChoiceChange = (e) => {
    setApiChoice(e.target.value);
    if (!e.target.value.includes("broken-access")) {
      setFormData((prev) => ({
        ...prev,
        role: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiChoice) {
      setError("API 선택을 해주세요.");
      return;
    }
    const body =
      apiChoice.includes("broken-access")
        ? { username: formData.username, password: formData.password, role: formData.role }
        : { username: formData.username, password: formData.password }; 

    try {
      const response = await axios.post(apiChoice, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/result", { state: { data: response.data } });
    } catch (err) {
      setError(err.response?.data?.message || "로그인 실패");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div style={styles.container}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <select value={apiChoice} onChange={handleApiChoiceChange} style={styles.select}>
          <option value="">공격 방법 선택</option>
          <option value="http://localhost:8080/vulnerable-broken-access-login">
            취약한 권한 조작 로그인
          </option>
          <option value="http://localhost:8080/protected-broken-access-login">
            권한 조작 로그인 방어
          </option>
          <option value="http://localhost:8080/vulnerable-brute-force-login">
            취약한 무차별 공격 로그인
          </option>
          <option value="http://localhost:8080/protected-brute-force-login">
            무차별 공격 로그인 방어
          </option>
        </select>
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
        {apiChoice.includes("broken-access") && ( 
          <input
            type="text"
            name="role"
            placeholder="권한"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          />
        )}
        <button type="submit" style={styles.button}>
          로그인
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      <button onClick={handleSignup} style={styles.signupButton}>
        회원가입
      </button>
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
  select: {
    padding: "10px",
    fontSize: "16px",
    width: "220px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  signupButton: {
    marginTop: "20px",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  error: {
    marginTop: "10px",
    color: "red",
  },
};

export default Login;