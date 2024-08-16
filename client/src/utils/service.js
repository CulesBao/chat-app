const baseUrl = 'http://localhost:3000/api'
const postRequest = async(url, body) =>{
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body
    })

    const data = await response.json()
    // console.log(response)
    // console.log(data)
    return { 
        status: response.status, 
        ...data
    };

    // if (!response.oke){
    //     let message;
    //     if (data?.message)
    //         message = data.message
    //     else
    //         message = data

    //     return {
    //         error: true,
    //         message
    //     }
    // }

    return data
}

export default {baseUrl, postRequest}