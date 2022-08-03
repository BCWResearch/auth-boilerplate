import axios from "axios";

interface SignIn {
    email: string;
    password: string;
}

const signIn = async (body: SignIn) => {
    const response = await axios.post(`/login`, body);
    return response;
};

const success = async () => {
    const response = await axios.get(`/success`);
    return response;
};

export const UserService = {
    signIn,
    success,
};
