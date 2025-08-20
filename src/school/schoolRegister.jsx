import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { schoolRegisterData } from "../thunk/userThunk";
import { toast } from "react-toastify";
import registerIllustration from "../assets/loginimg.avif";
import AuthForm from "../commonComponents/AuthForm";

export default function SchoolRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("School name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, setLoading) => {
    try {
      const res = await dispatch(schoolRegisterData(values)).unwrap();
      toast.success(res?.msg);
      navigate("/Login");
    } catch (error) {
      toast.error(error?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="🏫 School Registration"
      subtitle="Fill in the details to register your school"
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      buttonText="Register School"
      alternateText="Already have an account?"
      alternateLink="/Login"
      illustration={registerIllustration}
    />
  );
}
