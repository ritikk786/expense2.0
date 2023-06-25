import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import AuthForm from './Components/Authentication/AuthForm';
import { Route, Routes } from 'react-router';
import Welcome from './Components/Mainpage/Welcome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userloginAction } from './Store/uselogin';
import useHook from './Hooks/useHook';
import { addexpenseAction } from './Store/addexpense';
import ForgotPassword from './Components/Authentication/ForgotPassword';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './Components/Firebase';
import Footer from './Components/Footer/Footer';

// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { storage } from '../../Firebase';

function App() {
  const { sendRequest, isLoading } = useHook();
  const isUserLogin = useSelector((state) => state.loginmange.islogin)
  const useremail = useSelector((state) => state.loginmange.email)
  // console.log(isUserLogin, useremail)
  const dispatch = useDispatch();
  // function for storing Loged In user Details
  useEffect(() => {
    // console.log('appcompone')
    const email = localStorage.getItem('email');
    const idToken = localStorage.getItem('token')
    const name = localStorage.getItem('name')

    if (idToken) {
      dispatch(userloginAction.loginmange({
        useremail: email,
        useridToken: idToken,
        username: name || null,
      }))
    }
  }, [isUserLogin])

  // function for getting expense
  useEffect(() => {
    if (useremail) {

      // console.log(useremail)
      let email = useremail.replace('@', '').replace('.', '');
      const transformdata = (data) => {
        // console.log('transfromdata', data)
        const newData = [];
        for (let key in data) {
          newData.push({ ...data[key], id: key })
        }
        const revData = newData.reverse()
        dispatch(addexpenseAction.addexpensedata(revData))
      }
      sendRequest({
        url: `https://expense2data-default-rtdb.firebaseio.com/expense/${email}.json`
      }, transformdata)
    }
  }, [useremail])

  // for getting profileurl
  useEffect(() => {
    if (useremail) {
      const useremailroute = useremail.replace('@', '').replace('.', '')
      const imageUrlRef = ref(storage, `profilepic/${useremailroute}`)
      if (imageUrlRef) {

        getDownloadURL(imageUrlRef).then((url) => {
          dispatch(userloginAction.propfilmanage(url))
          // setProfilePic(url)
        }).catch((error) => {
          
        })
      }
    }
  }, [useremail])

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/login' element={!isUserLogin ? <AuthForm /> : <Welcome />} />
        <Route path='/' element={isUserLogin ? <Welcome /> : <AuthForm />} />
        <Route path='/update' element={<ForgotPassword />} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );

}
export default App
