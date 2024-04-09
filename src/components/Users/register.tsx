import classNames from 'classnames/bind';
import styles from "@/styles/components/Home.module.scss";
import {userService} from '@/services/user';
import {useState} from 'react';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import {ROUTES} from '@/constants/routes';

const cx = classNames.bind(styles);


export default function Register() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const router = useRouter();

  async function registerUser() {
    console.log("Register user");
    try {
      await userService.register(email, password);
      toast.success(`Email ${email} registered`);
      router.push(ROUTES.LOGIN);
    } catch (error: any) {
      toast.error(error.response.data.error.toString());
      console.error(error);
    }
  }
  return (
    <div>
      <p style={{ textAlign: "center", fontSize: "30px" }}>REGISTER</p>
      <div className={cx("user-form")}>
        <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
        <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
        <button onClick={registerUser}>Register</button>
        <div>Have an account?  <button className={cx("secondary-button")} onClick={() => router.push(ROUTES.LOGIN)}>Login</button></div>
      </div>
    </div>
  )
}
