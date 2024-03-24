export async function SaveItem(data, url) {
  console.log(data);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  return { json };
}
