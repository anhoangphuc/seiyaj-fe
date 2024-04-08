import classNames from 'classnames/bind';
import styles from "@/styles/components/Home.module.scss";
import {userService} from '@/services/user';
import {useState} from 'react';
import {toast} from 'react-toastify';
import {ROUTES} from '@/constants/routes';
import {useRouter} from 'next/router';
import {useAppDispatch} from '@/store/hook';
import {saveAccount, saveEmail, saveLinkedAddress, saveToken} from '@/store/authSlice';
import {storageService} from '@/services/storage';

const cx = classNames.bind(styles);


export default function Login() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();

  async function loginUser() {
    try {
      const response = await userService.login(email, password);
      console.log("Login response");
      console.log(response);
      dispatch(saveToken(response.accessToken));
      dispatch(saveEmail(response.email));
      dispatch(saveLinkedAddress(response.address))
      storageService.saveAccount({
        accessToken: response.accessToken,
        email,
        linkedAddress: response.address,
      });
      toast.success(`Login success`);
      router.push(ROUTES.LINK_ADDRESS);
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
