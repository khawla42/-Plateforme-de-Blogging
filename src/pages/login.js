import React, { useState } from "react";
import "./login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true); 
  return (
    <div className="full">
      <div className="mam">
        <form className="form">
          <h2 className="signup">{isLogin ? "Login" : "Sign Up"}</h2>

          <input placeholder="Email" className="input" type="email" />
          <input placeholder="Password" className="input" type="password" />
          {!isLogin && (
            <input
              placeholder="Confirm Password"
              className="input"
              type="password"
            />
          )}
          {!isLogin && (
            <>
              <label className="label" htmlFor="gender">
                Gender
              </label>
              <select className="input" id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <label className="label" htmlFor="age">
                Age
              </label>
              <input className="input" id="age" type="date" />
            </>
          )}

          {/* Bouton d'envoi dynamique */}
          <button type="submit" className="buttonne">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {/* Lien pour basculer entre Login et Sign Up */}
          <p className="text-white mt-4">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <button
            type="button"
            className="buttonne"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
