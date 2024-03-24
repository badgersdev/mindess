export async function deleteItem(url, data) {
  const res = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  return json;
}
