import {jwtDecode} from "jwt-decode";


export const getUserFromToken = (): any | null => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    const decoded: any = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      console.warn("Access token đã hết hạn");
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Lỗi khi giải mã token:", error);
    return null;
  }
};
