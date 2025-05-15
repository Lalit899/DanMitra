const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function registerUser(userData) {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.error || "Registration failed" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error" };
  }
}

export async function loginUser(credentials) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.error || "Login failed" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error" };
  }
}

export async function logoutUser() {
  try {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.error || "Logout failed" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error" };
  }
}

export async function createOrder(amount) {
  try {
    const result = await fetch(`${SERVER_URL}/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const data = await result.json();
    if (!result.ok) {
      return { success: false, message: data.error || "Order creation failed" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error" };
  }
}

export async function userdetails(useremail) {
  try {
    const res = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: useremail }),
    });
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error" };
  }
}

// export async function getUserData(userId) {
//   try {
//     const res = await fetch(`${BASE_URL}/user/${userId}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       return { success: false, message: data.error || "Failed to fetch user data" };
//     }

//     return { success: true, data };
//   } catch (err) {
//     return { success: false, message: "Network error" };
//   }
// }

// export async function updateUserData(userId, userData) {
//   try {
//     const res = await fetch(`${BASE_URL}/user/${userId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       return { success: false, message: data.error || "Failed to update user data" };
//     }

//     return { success: true, data };
//   } catch (err) {
//     return { success: false, message: "Network error" };
//   }
// }
