import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

function CreateActivities() {
  const [images, setImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      images: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Activity name is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      console.log("Form data:", values);
      // to do  intagreate with create API
    },
  });

  function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert("You can upload up to 3 images only.");
      return;
    }
    setImages([...images, ...files]);
    formik.setFieldValue("images", [...images, ...files]);
  }

  return (
    <>
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
                  htmlFor="category_name"
                >
                  Activity Name
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  name="name"
                  placeholder="Category Name"
                  required
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.name}
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
                    Upload or drag & drop your file SVG, PNG, JPG or GIF.
                  </p>

                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="category_image"
                    accept="image/png, image/jpeg, image/webp"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
                {images.length > 0 && (
                  <p className="mt-2 text-red-600">
                    {images.length} images selected
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateActivities;
