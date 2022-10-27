// Connecting with https://petstore.swagger.io/

export const findPets = async (status) => {
  const response = await fetch(
    `https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.json();
};

export const createPet = async (id, name, status) => {
  const response = await fetch(`https://petstore.swagger.io/v2/pet`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      status: status,
    }),
  });
  if (response.ok) {
    return response.json();
  } else {
    return {};
  }
};

export const updatePet = async (id, name, status) => {
  const response = await fetch(`https://petstore.swagger.io/v2/pet`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      status: status,
    }),
  });
  return response.json();
};

export const findPet = async (id) => {
  const response = await fetch(`https://petstore.swagger.io/v2/pet/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return response.json();
};

export const deletePet = async (id) => {
  const response = await fetch(`https://petstore.swagger.io/v2/pet/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });
  return response.json();
};
