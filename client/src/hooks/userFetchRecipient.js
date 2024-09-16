import { useEffect, useState } from "react";
import service from "../utils/service.js";
const userFetchRecipientUser = (members, user) => {
    const [recipientUser, setRecipientUser] = useState(null)
    const [error, setError] = useState(null)

    const recipientId = members?.find(id => id != user.id)
    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;
            try {
                const response = await service.GetRequest(`${service.baseUrl}/auth/find/${recipientId}`);
                // console.log('response', response);
                if (response.status >= 400) {
                    setError(response.message);
                } else {
                    setRecipientUser(response.user);
                }
            } catch (err) {
                setError(err.message || 'Something went wrong')
            }
        };
        getUser();
    }, [recipientId]);
    return {recipientUser, error}
}
export default userFetchRecipientUser