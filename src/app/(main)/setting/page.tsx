import UserInfoForm from "@/src/components/setting/user-info-form";
import animation from "@/src/style/animation.module.css";

import { GetInfo } from "@/src/actions/user";
import { cn } from "@/src/utils/func";

export default async function UserSettingPage() {
  const [userResults] = await Promise.allSettled([GetInfo()]);
  const user = userResults.status === "fulfilled" ? userResults.value : null;
  return (
    <div className="w-full h-screen font-sans p-8 text-primary-word bg-[#fff2e8]">
      <div
        className={cn(
          "w-full h-full p-6 rounded-md bg-white shadow-primaryShadow",
          animation["fade-in"]
        )}
      >
        <UserInfoForm thisUser={user} />
      </div>
    </div>
  );
}
