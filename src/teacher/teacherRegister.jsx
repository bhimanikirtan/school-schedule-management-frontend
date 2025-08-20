import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { teacherRegisterData } from "../thunk/userThunk";
import { toast } from "react-toastify";
import registerIllustration from "../assets/loginimg.avif";
import AuthForm from "../commonComponents/AuthForm";

function TeacherRegister() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be under 50 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, setLoading) => {
    try {
      const res = await dispatch(
        teacherRegisterData({ ...values, token })
      ).unwrap();
      toast.success(res.msg || "Registration successful");
      setTimeout(() => navigate("/Login"), 1500);
    } catch (err) {
      toast.error(err?.msg || "Registration failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="👩‍🏫 Teacher Registration"
      subtitle="Register to connect with your school and start teaching."
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      buttonText="Register Teacher"
      alternateText="Already have an account?"
      alternateLink="/Login"
      illustration={registerIllustration}
    />
  );
}

export default TeacherRegister;
