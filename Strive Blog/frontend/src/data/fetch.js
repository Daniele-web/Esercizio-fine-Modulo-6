export const loadPosts = async () => {
    console.log("inizio fetch loadPosts")

    const res = await fetch('http://localhost:4000/blogPosts')
    const data = await res.json()

    return data
};

export const login = async (loginFormValue) => {
    try {
        console.log("inizio fetch login")

        const res = await fetch('http://localhost:4000/login', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(loginFormValue)
        });
        if (res.ok) {
            const data = await res.json();

            console.log("fine fetch login")

            return data

        } else {
            const errorData = await res.json()

            return { error: errorData.message || 'Errore di login' }
        }

    } catch (error) {
        return { error: 'Errore nel login' }
    }
};



export const me = async () => {
    console.log("inizio fetch me")

    const res = await fetch('http://localhost:4000/me', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "Application/json"
        },
    });

    const data = res.json();

    return data;
};