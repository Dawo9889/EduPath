import UserRole from "./UserRole";

interface User {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    role: UserRole
}
export default User;