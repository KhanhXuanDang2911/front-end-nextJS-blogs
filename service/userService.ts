import { del, get, patch, post, put } from "@/util/request";

const api: string = 'users/';

export const getUsersForAdminPage = async (): Promise<any[]> => {
    const path: string = `${api}`;
    const response: any = await get(path);
    return response.data;
    // const users = [
    //     {
    //       id: 1,
    //       username: "johndoe",
    //       name: "John Doe",
    //       email: "john@example.com",
    //       role: "Admin",
    //       phone: "0987654321",
    //       is_active: true,
    //       avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    //     },
    //     {
    //       id: 2,
    //       username: "janesmith",
    //       name: "Jane Smith",
    //       email: "jane@example.com",
    //       role: "User",
    //       phone: "0971234567",
    //       is_active: true,
    //       avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    //     },
    //     {
    //       id: 3,
    //       username: "bobjohnson",
    //       name: "Bob Johnson",
    //       email: "bob@example.com",
    //       role: "User",
    //       phone: "0964567890",
    //       is_active: false,
    //       avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    //     },
    //     {
    //       id: 4,
    //       username: "alicebrown",
    //       name: "Alice Brown",
    //       email: "alice@example.com",
    //       role: "Admin",
    //       phone: "0912345678",
    //       is_active: true,
    //       avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    //     },
    //   ];
    // return users
}

export const searchUserByName = async (name: string): Promise<any[]> => {
    const path: string = `${api}?search=${name}`;
    const response: any = await get(path);
    return response.data;
}

export const getUsersDetail = async (id: any): Promise<any> => {
    const path: string = `${api}${id}/`;
    const response: any = await get(path);
    return response.data;
};

export const addUser = async (user: any): Promise<any> => {
    const path: string = `${api}`;
    const response: any = await post(path, user);
    return response;
}

export const updateUser = async (user: any): Promise<any> => {
    const path: string = `${api}${user.id}/`;
    const response: any = await patch(path, user);
    return response;
}

export const deleteUser = async (id: any): Promise<any> => {
    const path: string = `${api}${id}/`;
    const response: any = await del(path);
    console.log("response", response);
    return response;
}
