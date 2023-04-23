import { useState, useRef } from "react";
import { ButtonM } from "../components/Buttons/Button.styled";
import { Input } from "../components/AddProductPage/AddNewProduct.styled";
import { SignInGoogle } from "../GoogleButton/SignInGoogle";
import {
  TwoMainContainers,
  // LogoConteiner,
  ForgotPasswordLink,
  SignInBottomConrainer,
  SignInContainer,
  SignInWord,
  NewUser,
  Registration,
  SingleLine,
} from "../components/SignIn/SignIn.styled";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "../utils/firebase/firebase.config";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { InputPassword } from "../components/Input/Input.componentpassword";

export const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [isEnterPressed, setIsEnterPressed] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const app = firebase.initializeApp(firebaseConfig);
      const auth = app.auth();
      await auth.createUserWithEmailAndPassword(email, password);
      setIsSignUpSuccess(true);
    } catch (error) {
      alert(`Hasło powinno zawierać min 6 znaków`);
    }
  };

  const handleSignIn = async () => {
    try {
      const app = firebase.initializeApp(firebaseConfig);
      const auth = app.auth();
      await auth.signInWithEmailAndPassword(email, password);
      navigate("/userPanelBorrow");
    } catch (error) {
      alert(`Nieprawidłowe dane logowania`);
    }
  };

  const loginButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <TwoMainContainers>
        <SignInContainer>
          <SignInWord>
            <h1>Zaloguj się</h1>
          </SignInWord>
          <NewUser>
            <div>Nie posiadasz konta?</div>
            <Registration>
              <span onClick={handleSignUp}>Zarejestruj się</span>
              {isSignUpSuccess && <div>Konto zostało utworzone pomyślnie</div>}
            </Registration>
          </NewUser>
          <Input
            placeholder="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <InputPassword
            placeholder="hasło"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                setIsEnterPressed(true);
                handleSignIn();
              }
            }}
          />
          <SignInBottomConrainer>
            <ButtonM onClick={handleSignIn} ref={loginButtonRef}>
              Zaloguj się
            </ButtonM>
          </SignInBottomConrainer>

          <SingleLine>
            <h4>
              <span>Albo</span>
            </h4>
          </SingleLine>

          <SignInBottomConrainer>
            <SignInGoogle />
            <ForgotPasswordLink>
              <span onClick={() => navigate("/forgotPassword")}>Zapomniałeś hasła?</span>
            </ForgotPasswordLink>
          </SignInBottomConrainer>
        </SignInContainer>
      </TwoMainContainers>
    </>
  );
};
