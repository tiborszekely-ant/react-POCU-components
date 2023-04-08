const apiUrl = import.meta.env.VITE_API_URL;

export class ApiError extends Error {}

async function handleResponse(res) {
    if (!res.ok) {
        const errorMessage = await res.json();
        if (errorMessage === "Email and password are required" || errorMessage === "Email already exists") {
            throw new ApiError(errorMessage);
        }
        if (errorMessage === "Cannot find user") {
            throw new ApiError("There is no existing user with this email, please register");
        }
        if (errorMessage === "Password is too short" || errorMessage === "Incorrect password") {
            throw new ApiError("Incorrect password");
        }
        throw new ApiError(errorMessage);
    }
    return res.json();
}

const headers = {
    'Content-type': 'application/json',
};

export function configureApi(entity) {

    function add(body, options = {}) {
        return fetch(`${apiUrl}/${entity}`, {
          headers,
          body: JSON.stringify(body),
          method: 'POST',
          ...options,
        }).then(handleResponse);
    }

    return {
        add,
    };
}
