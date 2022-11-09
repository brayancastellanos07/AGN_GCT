import {useContext} from "react";
import {AuthContext} from "../providers/AuthProviders";

export const useAuth = () => useContext(AuthContext);

