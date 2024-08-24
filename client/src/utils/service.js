const baseUrl = import.meta.env.VITE_LOCAL_API_URI;

const postRequest = async(url, body) =>{
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

export default {baseUrl, postRequest}