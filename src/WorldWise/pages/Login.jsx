import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Nav from "../components/Nav";
import { useFakeAuthContext } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, logout, user } = useFakeAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.isAuthenticated) {
      navigate("/app")
    }

  }, [user]);


  const appLogin = () => {
    login(email, password)
    //eliminar la pagina anterior del historial
    navigate("/app", { replace: true })
  }

  return (
    <main className={styles.login}>
      <Nav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className={styles.button} onClick={appLogin}>Login</button>
        </div>
      </form>
    </main>
  );
}
