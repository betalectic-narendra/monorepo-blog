const baseUrl=process.env.NEXT_PUBLIC_API_URL

interface RequestData {
  [key: string]: any;
}

interface ResponseData {
  [key: string]: any;
}
async function getData(url: string): Promise<ResponseData | null> {
  try {
    const response = await fetch(baseUrl+url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function getUserData(url: string,token:string): Promise<ResponseData | null> {
  try {
    const response = await fetch(baseUrl+url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`,
      },
      body: JSON.stringify({}),

    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function postData(url: string, data: RequestData,token:string): Promise<ResponseData | null> {
  try {
    const response = await fetch(baseUrl+url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function putData(url: string, data: RequestData,token:string): Promise<ResponseData | null> {
  try {
    const response = await fetch(baseUrl+url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function deleteData(url: string,token:string): Promise<boolean> {
  try {
    const response = await fetch(baseUrl+url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

async function loginUser(url: string, credentials: { email: string, password: string }): Promise<ResponseData | null> {
  try {
    const response = await fetch(baseUrl+url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function registerUser(url: string, credentials: { email: string, password: string }): Promise<ResponseData | null> {
  try {
    const response = await fetch(baseUrl+url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export { getData, postData, putData, deleteData, getUserData, loginUser, registerUser};
