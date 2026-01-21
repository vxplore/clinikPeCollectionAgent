import { Tabs } from "@mantine/core";
import SampleTab from "./SampleTab/SampleTab";
import TestTab from "./TestTab/TestTab";
import PaymentTab from "./PaymentTab/PaymentTab";
import ActivitesTab, { type Activity } from "./ActivitiesTab/ActivitesTab";
import { useAssignmentSample, useAssignmentTests } from "../hooks/useTabData";
import { useParams } from "react-router-dom";
interface AllTabsProps {
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
  activities: Activity[];
  handleMarkCollected?: () => Promise<void>;
}

const AllTabs = ({
  activeTab,
  setActiveTab,
  activities,
  handleMarkCollected,
}: AllTabsProps) => {
  const { id } = useParams<{ id: string }>();
  console.log("Assignment ID in AllTabs:", id);

  const { samples, isLoading, error } = useAssignmentSample(id!);
  const {
    tests,
    pagination,
    isLoading: testsLoading,
    error: testsError,
  } = useAssignmentTests(id!, 1, 100, activeTab === "Tests");

  console.log("Samples data in AllTabs:", samples);
  console.log("Tests data in AllTabs:", tests);

  return (
    <Tabs
      value={activeTab}
      onChange={setActiveTab}
      defaultValue="Sample"
      classNames={{ root: "py-0", list: "gap-1" }}
    >
      <Tabs.List grow>
        <Tabs.Tab value="Sample" className="text-xs px-2 py-1">
          Sample
        </Tabs.Tab>
        <Tabs.Tab value="Tests" className="text-xs px-2 py-1">
          Tests
        </Tabs.Tab>
        <Tabs.Tab value="Payments" className="text-xs px-2 py-1">
          Payments
        </Tabs.Tab>
        <Tabs.Tab value="Activities" className="text-xs px-2 py-1">
          Activities
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Sample" className="pt-2">
        <SampleTab
          samples={samples}
          isLoading={isLoading}
          error={error}
          handleMarkCollected={handleMarkCollected}
        />
      </Tabs.Panel>

      <Tabs.Panel value="Tests" className="pt-2">
        <TestTab
          tests={tests}
          pagination={pagination}
          isLoading={testsLoading}
          error={testsError}
        />
      </Tabs.Panel>

      <Tabs.Panel value="Payments" className="pt-2">
        <PaymentTab />
      </Tabs.Panel>
      <Tabs.Panel value="Activities" className="pt-2">
        <ActivitesTab activities={activities} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default AllTabs;
