import React from "react";
import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const data = location.state?.data;

  const loginStatus = data?.loginStatus;
  const vulnerablePoint = data?.vulnerablePoint;
  const username = data?.username;
  const password = data?.password;
  const role = data?.role;

  return (
    <div style={styles.container}>
      <h2>로그인 결과</h2>
      {data ? (
        <div style={styles.result}>
          <p><strong>로그인 상태:</strong> {loginStatus}</p>
          <p><strong>취약점:</strong> {vulnerablePoint}</p>
          <p><strong>아이디:</strong> {username}</p>
          <p><strong>비밀번호:</strong> {password}</p>
          <p><strong>권한:</strong> {role}</p>
        </div>
      ) : (
        <p>결과 데이터를 불러올 수 없습니다.</p>
      )}
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
  result: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "80%",
    maxWidth: "600px",
    wordWrap: "break-word",
    textAlign: "left",
  },
};

export default Result;