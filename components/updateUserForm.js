import React, { useReducer } from "react";
import Bug from "./bug";
import { BiBrush } from "react-icons/bi";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { getUser, getUsers, updateUser } from "@/lib/helper";

const UpdateUserForm = ({ formId, formData, setFormData }) => {
  const { isLoading, isError, data, error } = useQuery(["users", formId], () =>
    getUser(formId)
  );
  const queryClient = useQueryClient();
  const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
    onSuccess: async (data) => queryClient.prefetchQuery("users", getUsers),
  });
  if (isLoading) return <div> Loading...</div>;
  if (isError) return <div> Error</div>;

  const { name, avatar, salary, date, email, status } = data;
  const [firstname, lastname] = name ? name.split(" ") : formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userName = `${formData.firstname ?? firstname} ${
      formData.lastname ?? lastname
    }`;
    let updated = Object.assign({}, data, formData, { name: userName });

    await UpdateMutation.mutate(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 w-4/6 gap-4">
      <div className="input-type">
        <input
          type="text"
          name="firstname"
          defaultValue={firstname}
          className="border w-full px-5 py-3 focus:outline-none"
          placeholder="First Name"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="lastname"
          defaultValue={lastname}
          className="border w-full px-5 py-3 focus:outline-none"
          placeholder="Last Name"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="email"
          defaultValue={email}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none"
          placeholder="Email"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="salary"
          defaultValue={salary}
          className="border w-full px-5 py-3 focus:outline-none"
          placeholder="Salary"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          name="date"
          defaultValue={date}
          className="border px-5 py-3  focus:outline-none rounded-md"
          placeholder="Date"
          onChange={setFormData}
        />
      </div>
      <div className=" flex gap-10 items-center">
        <div className="form-check ">
          <input
            type="radio"
            id="radioDefault1"
            name="status"
            defaultChecked={status == "Active"}
            value="Active"
            onChange={setFormData}
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white focus:outline-none checked:bg-green-500 checked:border-green-500 transition duration-200 mt-1 align-top bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            {" "}
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            id="radioDefault2"
            name="status"
            value="inactive"
            defaultChecked={status != "Active"}
            onChange={setFormData}
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white focus:outline-none checked:bg-green-500 checked:border-green-500 transition duration-200 mt-1 align-top bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            {" "}
            Inactive
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="flex justify-center text-md w-2/6 bg-yellow-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-green-500"
      >
        Update
        <span className="px-1 ">
          <BiBrush size={24} />
        </span>
      </button>
    </form>
  );
};

export default UpdateUserForm;
