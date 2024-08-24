const baseUrl = import.meta.env.VITE_LOCAL_API_URI;

const postRequest = async(url, body) =>{
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body
        })
    
        const data = await response.json()
        return { 
            status: response.status, 
            ...data
        };
    }
    catch (error) {
        console.error('Error during GET request:', error);
        throw error;
    }
}

const getRequest = async(url, token) =>{
    const response = await (url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json()
    return {
        status: response.status,
        ...data
    }
}

export default {baseUrl, postRequest, getRequest}