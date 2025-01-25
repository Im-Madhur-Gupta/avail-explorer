"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/common/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/modules/common/components/ui/tabs";
import DataSubmission from "../components/DataSubmission";
import BalanceTransfer from "../components/BalanceTransfer";

const PerformActionsPage = () => {
  return (
    <div className="mx-auto space-y-8 max-w-screen-md">
      <div>
        <h2>Actions</h2>
        <p className="text-muted-foreground">
          Connect your wallet and interact with the Avail Turing network
        </p>
      </div>

      <Tabs defaultValue="transfer" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transfer">Balance Transfer</TabsTrigger>
          <TabsTrigger value="data">Submit Data</TabsTrigger>
        </TabsList>

        <TabsContent value="transfer">
          <Card>
            <CardHeader>
              <CardTitle>Balance Transfer</CardTitle>
              <CardDescription>
                Transfer balance to another account on the Avail Turing network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BalanceTransfer />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Submit Data</CardTitle>
              <CardDescription>
                Submit arbitrary data to the Avail network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataSubmission />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformActionsPage;
