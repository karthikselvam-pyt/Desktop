import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { countries } from "../Data/countries";
import { useNavigate } from "react-router-dom";

export const AddForm = ({
  onSuccess,
}: {
  onSuccess?: (value: boolean) => void;
}) => {
  const [formData, setFormData] = useState({
    country: "",
    user: "",
  });

  const history = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/users", formData);
      toast.success("Suucessfully Added ");
      history("/overview");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Something is wrong Pls try Again Later");
    } finally {
      onSuccess?.(true);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-5 w-1/2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 overflow-hidden">
            <label htmlFor="country" className="text-lg">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={(e) => handleChange(e)}
              className="border p-2"
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="user" className="text-lg">
              User
            </label>
            <input
              id="user"
              name="user"
              type="number"
              value={formData.user}
              onChange={(e) => handleChange(e)}
              className="border p-2"
            />
          </div>
          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white ">
            Add User
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};
