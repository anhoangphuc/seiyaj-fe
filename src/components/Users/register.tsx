import classNames from 'classnames/bind';
import styles from "@/styles/components/Home.module.scss";
import {userService} from '@/services/user';
import {useState} from 'react';
import {toast} from 'react-toastify';

const cx = classNames.bind(styles);


export default function Register() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  async function registerUser() {
    console.log("Register user");
    try {
      await userService.register(email, password);
      toast.success(`Email ${email} registered`);
    } catch (error: any) {
      toast.error(error.response.data.error.toString());
      console.error(error);
    }
  }
  return (
    <div className={cx("user-form")}>
      <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
      <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
      <button onClick={registerUser}>Register</button>
    </div>
  )
}
