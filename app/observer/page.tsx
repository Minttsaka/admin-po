import DashboardEditorPick from "@/components/DashboardEditorPick";
import DashboardEvents from "@/components/DashboardEvents";
import DashboardSubscribers from "@/components/DashboardSubscribers";
import MarketDashboard from "@/components/MarketDashboard";
import { Analytics } from "@/components/analytics";
import { ChatModal } from "@/components/chat-modal";
import { DashboardCards } from "@/components/dashboard-cards";

export default async function Home() {

  return (
    <div className="flex gap-2 my-5">
      
      <div className="w-full">
        <DashboardCards />
        <DashboardEvents />
        <DashboardEditorPick />
        <DashboardSubscribers />
        <Analytics />
      </div>
        <ChatModal />
    </div>
  );
}
