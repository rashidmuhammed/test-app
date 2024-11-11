import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import AuthenticationService from "../Services/AuthenticationService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function CreateActivities() {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  let data = AuthenticationService.getDecryptedToken();

  const formik = useFormik({
    initialValues: {
      user_id: data.id,
      title: "",
      description: "",
      imageUrls: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Activity name is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      const activityData = {
        user_id: values.user_id,
        title: values.title,
        description: values.description,
        imageUrls: imageUrls.map((file) => [file.name]),
      };

      console.log(activityData);

      try {
        const response = await AuthenticationService.createActivity(
          activityData
        );
        if (response) {
          toast.success("Activity Created");
          formik.resetForm();
          navigate("/home");
          setImageUrls([]);
        }
      } catch (error) {
        console.error("Error:", error?.message || "An error occurred");
        toast.error("Something went wrong");
      }
    },
  });

  function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    if (files.length + imageUrls.length > 3) {
      toast.error("You can upload up to 3 images only.");
      return;
    }
    setImageUrls([...imageUrls, ...files]);
  }

  return (
    <div className="flex flex-col mx-3 mt-6 lg:flex-row justify-center align-middle">
      <div className="w-full lg:w-1/3 m-1">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full bg-white shadow-md p-6"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Activity Name
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                type="text"
                name="title"
                placeholder="Enter Activity Name"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title ? (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.title}
                </p>
              ) : null}
            </div>

            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                rows="4"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                name="description"
                placeholder="Enter description"
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description ? (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.description}
                </p>
              ) : null}
            </div>

            <div className="w-full px-3 mb-6">
              <button
                type="submit"
                className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
              >
                Add
              </button>
            </div>

            <div className="w-full px-3 mb-8">
              <label
                className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                htmlFor="dropzone-file"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                  Image
                </h2>
                <p className="mt-2 text-gray-500 tracking-wide">
                  Upload or drag & drop up to 3 images (SVG, PNG, JPG, GIF).
                </p>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
              {imageUrls.length > 0 && (
                <p className="mt-2 text-green-600">
                  {imageUrls.length} images selected
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateActivities;
