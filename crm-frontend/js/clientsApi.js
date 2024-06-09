const URL = 'http://localhost:3000';

export async function getClients() {
  try {
    const res = await fetch(`${URL}/api/clients`, {
      method: 'GET',
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function sendClientData(client, method, id = null) {
  try {
    const res = await fetch(
      `${URL}/api/clients/${method === 'POST' ? '' : id}`,
      {
        method,
        body: JSON.stringify(client),
      }
    );
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteClientItem(id) {
  try {
    await fetch(`${URL}/api/clients/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
  }
}

export async function findClient(value) {
  try {
    const res = await fetch(`${URL}/api/clients?search=${value}`, {
      method: 'GET',
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
