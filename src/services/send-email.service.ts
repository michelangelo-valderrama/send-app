export const sendEmail = async (dto: any) => {
  return fetch(`${import.meta.env.VITE_API_URL}/send`, {
    method: "POST",
    headers: {
      "x-token": import.meta.env.VITE_X_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  })
}
