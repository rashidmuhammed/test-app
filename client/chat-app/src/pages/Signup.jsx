import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import AuthenticationService from "../Services/AuthenticationService";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("First Name is required"),
    // lname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);
      try {
        const response = await AuthenticationService.signupUser(values);
        console.log("res", response);
        if (response) {
          toast.success("user Created Sucessffully");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error?.message || "An error occurred");
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
      <div className="text-center mb-16">
        <a>
          <img
            src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572-768x591.png"
            alt="logo"
            className="w-52 inline-block"
          />
        </a>
        <h4 className="text-gray-800 text-base font-semibold mt-6">
          Sign up into your account
        </h4>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              First Name
            </label>
            <input
              name="name"
              type="text"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          {/* <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Last Name
            </label>
            <input
              name="lname"
              type="text"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter last name"
              value={formik.values.lname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lname && formik.errors.lname ? (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.lname}
              </div>
            ) : null}
          </div> */}

          <div>
            <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
            <input
              name="email"
              type="text"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">Password</label>
            <input
              name="password"
              type="password"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Confirm Password
            </label>
            <input
              name="cpassword"
              type="password"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter confirm password"
              value={formik.values.cpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cpassword && formik.errors.cpassword ? (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.cpassword}
              </div>
            ) : null}
          </div>
        </div>

        <div className="!mt-12">
          <button
            type="submit"
            className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Sign up
          </button>
        </div>

        <p>
          <Link to="/login">alredy have an account ?</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
