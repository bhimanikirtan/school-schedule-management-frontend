import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import registerIllustration from "../assets/loginimg.avif";
import { toast } from "react-toastify";
import { loginData } from "../thunk/userThunk";
import AuthForm from "../commonComponents/AuthForm";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
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
      const response = await dispatch(loginData(values)).unwrap();
      const { user, token } = response;
      localStorage.setItem("token", token);

      toast.success(`${user.role} login successful`);

      if (user.role === "school") {
        navigate("/school/schoolDashboard");
      } else if (user.role === "teacher") {
        navigate("/teacher/teacherDashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="🔑 School Login"
      subtitle="Enter your credentials to access your account"
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      buttonText="Login"
      alternateText="Don’t have an account?"
      alternateLink="/schoolRegister"
      illustration={registerIllustration}
    />
  );
}
