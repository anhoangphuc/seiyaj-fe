import classNames from 'classnames/bind';
import styles from "@/styles/components/Home.module.scss";
import {userService} from '@/services/user';
import {useState} from 'react';
import {toast} from 'react-toastify';
import {ROUTES} from '@/constants/routes';
import {useRouter} from 'next/router';

const cx = classNames.bind(styles);


export default function Login() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const router = useRouter();

  async function loginUser() {
    try {
      await userService.login(email, password);
      toast.success(`Login success`);
    } catch (error: any) {
      toast.error(error.response.data.error.toString());
      console.error(error);
    }
  }
  return (
    <div>
      <p style={{ textAlign: "center", fontSize: "30px" }}>LOGIN</p>
      <div className={cx("user-form")}>
        <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
        <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
        <button onClick={loginUser}>Login</button>
        <div>Do not have account?  <button className={cx("secondary-button")} onClick={() => router.push(ROUTES.REGISTER)}>Register</button></div>
      </div>
    </div>
  )
}
