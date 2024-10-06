// import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import { getHumeAccessToken } from "@/lib/getHumeAccessToken";
import dynamic from "next/dynamic";
// import EnhancedAIVoiceChat from ".";

const EnhancedAIVoiceChat = dynamic(() => import("./index"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();
  console.log(accessToken);

  if (!accessToken) {
    console.error("Failed to get Hume access token");
    console.log(accessToken);
    throw new Error();
  }

  return (
    <div className={"grow flex flex-col"}>
      <EnhancedAIVoiceChat accessToken={accessToken} />
    </div>
  );
}
