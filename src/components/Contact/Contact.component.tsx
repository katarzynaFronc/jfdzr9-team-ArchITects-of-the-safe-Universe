import { useEffect, useState } from "react";
import { Title } from "../../UI/Title.styled";
import { FormContainer, Input, TextArea } from "./Contact.styled";
import { ButtonM, ButtonS } from "../Buttons/Button.styled";
import { Controller, useForm } from "react-hook-form";
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  doc,
  CollectionReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase/firebase.config";
import "firebase/firestore";
import { useAuth } from "../../utils/firebase/auth";
import { query, where } from "firebase/firestore";
import { useLocation } from "react-router";
import "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { ProductProps } from "../AddProductPage/AddNewProduct.component";

type ContactFormData = {
  email: string;
  name: string;
  message: string;
};

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const { currentUser } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ContactFormData>();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [product, setProduct] = useState<ProductProps | undefined>(undefined);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";
  useEffect(() => {
    setValue("email", email);
  }, [email, setValue]);

  return (
    <>
      {success ? (
        <Title>Wiadomość została wysłana</Title>
      ) : (
        <FormContainer>
          <Controller
            name="email"
            control={control}
            rules={{ required: "E-mail jest wymagany" }}
            defaultValue={email || ""}
            render={({ field }) => (
              <>
                {errors.email && <span>{errors.email.message}</span>}
                <Input placeholder="E-mail" type={"text"} {...field} />
              </>
            )}
          />
          <Controller
            name="message"
            control={control}
            rules={{ required: "Wiadomość jest wymagana" }}
            render={({ field }) => (
              <>
                {errors.message && <span>{errors.message.message}</span>}
                <TextArea placeholder="Wiadomość" rows={5} {...field} />
              </>
            )}
          />
          <Controller
            name="name"
            control={control}
            rules={{ required: "Imię jest wymagane" }}
            defaultValue={currentUser?.displayName || ""}
            render={({ field }) => (
              <>
                {errors.name && <span>{errors.name.message}</span>}
                <Input placeholder="Imię" type={"text"} {...field} />
              </>
            )}
          />
          <ButtonM type="submit">Wyślij wiadomość</ButtonM>
        </FormContainer>
      )}
    </>
  );
};

export default Contact;
