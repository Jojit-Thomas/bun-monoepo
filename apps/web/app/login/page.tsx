"use client"

const LoginPage = () => {
  const googleAuth = () => {
    window.open("http://localhost:8080/login/google", "_self");
  };
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={googleAuth} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Login with Google
      </button>
    </div>
  );
}

export default LoginPage