import { BASE_API } from "../utils/constants";

export async function loginApi(formValue) {
  try {
    const url = `${BASE_API}/auth/login`;
    const params = {
      method: "POST",
      body: formValue
    };

    const response = await fetch(url, params);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function registerApi(formData) {
  try {
    const url = `${BASE_API}/usuarios`;
    const params = {
      method: "POST",
      body: formData
    };
    const response = await fetch(url, params);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
