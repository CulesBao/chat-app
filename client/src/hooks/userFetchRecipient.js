import { useEffect, useState } from "react";
import service from "../utils/service.js";
const userFetchRecipientUser = (userId) => {
    const [recipientUser, setRecipientUser] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        const getUser = async () => {
            if (!userId) return null;
            try {
                const response = await service.GetRequest(`${service.baseUrl}/auth/find/${userId.userId}`);
                console.log('response', response);
                if (response.status >= 400) {
                    setError(response.message);
                } else {
                    setRecipientUser(response.user.name);
                }
            } catch (err) {
                setError(err.message);
            }
        };
        getUser();
    }, [userId]);
    return {recipientUser, error}
}
export default userFetchRecipientUser