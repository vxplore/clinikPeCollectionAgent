import { Tabs } from "@mantine/core";
import SampleTab from "./SampleTab/SampleTab";
import TestTab from "./TestTab/TestTab";
import PaymentTab from "./PaymentTab/PaymentTab";
import ActivitesTab from "./ActivitiesTab/ActivitesTab";
import {
  useAssignmentActivities,
  useAssignmentPayments,
  useAssignmentSample,
  useAssignmentTests,
} from "../hooks/useTabData";
import { useParams } from "react-router-dom";
interface AllTabsProps {
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
  handleMarkCollected?: (id: string, booking_id: string) => Promise<void>;
  isMarkingCollected?: boolean;
}

const AllTabs = ({
  activeTab,
  setActiveTab,
  isMarkingCollected,
  handleMarkCollected,
}: AllTabsProps) => {
  const { id } = useParams<{ id: string }>();
  console.log("Assignment ID in AllTabs:", id);
  //sample tab data
  const { samples, isLoading, error } = useAssignmentSample(id!);
  //tests tab data
  const {
    tests,
    pagination,
    isLoading: testsLoading,
    error: testsError,
  } = useAssignmentTests(id!, 1, 100, activeTab === "Tests");
  //payments tab data
  const {
    payments,
    isLoading: paymentsLoading,
    error: paymentsError,
  } = useAssignmentPayments(id!, activeTab === "Payments");
  //activities tab data
  const {
    activities: activitiesData,
    isLoading: activitiesLoading,
    error: activitiesError,
  } = useAssignmentActivities(id!, activeTab === "Activities");

  console.log("Samples data in AllTabs:", samples);
  console.log("Tests data in AllTabs:", tests);
  console.log("Payments data in AllTabs:", payments);

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
          isMarkingCollected={isMarkingCollected}
        />
      </Tabs.Panel>

      <Tabs.Panel value="Tests" className="pt-2">
        <TestTab
          tests={tests as any}
          pagination={pagination}
          isLoading={testsLoading}
          error={testsError}
        />
      </Tabs.Panel>

      <Tabs.Panel value="Payments" className="pt-2">
        <PaymentTab
          payments={payments}
          isLoading={paymentsLoading}
          error={paymentsError}
        />
      </Tabs.Panel>
      <Tabs.Panel value="Activities" className="pt-2">
        <ActivitesTab
          activities={activitiesData}
          isLoading={activitiesLoading}
          error={activitiesError}
        />
      </Tabs.Panel>
    </Tabs>
  );
};

export default AllTabs;
