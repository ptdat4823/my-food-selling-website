import UserInfoForm from "@/src/components/setting/user-info-form";
import animation from "@/src/style/animation.module.css";

import { GetInfo } from "@/src/actions/user";
import { cn } from "@/src/utils/func";

export default async function UserSettingPage() {
  const [userResults] = await Promise.allSettled([GetInfo()]);
  const user = userResults.status === "fulfilled" ? userResults.value : null;
  return (
    <div
      className={cn(
        "w-full h-screen font-sans p-8 text-primary-word",
        "dark:text-dark-primary-word"
      )}
    >
      <div
        className={cn(
          "w-full h-full p-6 rounded-md bg-white/20 shadow-primary-shadow",
          "dark:bg-dark-secondary-bg/40",
          animation["fade-in"]
        )}
      >
        <UserInfoForm thisUser={user} />
      </div>
    </div>
  );
}
