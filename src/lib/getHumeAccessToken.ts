"use server";
import { fetchAccessToken } from "hume";

export const getHumeAccessToken = async () => {
  const accessToken = await fetchAccessToken({
    apiKey: "c1oySde5b4sX3rGxOWFFG5PIMAURoIqSirxuQ6DwfSVAaBgX",
    secretKey:
      "YeK2lJzLWYe2krGsMkyIi5WOnz4M3hG3sLtneCXmIUPWK156kz84JolOQeCwQkAP",
  });
  console.log(accessToken);

  if (accessToken === "undefined") {
    return null;
  }

  return accessToken ?? null;
};
