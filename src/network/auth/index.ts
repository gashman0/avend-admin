import api from "../../api/axios";
import routes from "../routes";
import type{ loginPayload } from "./types";

export const login = async (payload: loginPayload) => {
    const response = await api.post(
        routes.auth.login, payload
    );

    return response?.data;
}

export const logout = async () => {
    const response = await api.post(
        routes.auth.logout
    );

    return response?.data;
}