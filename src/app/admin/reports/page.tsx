import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AdminReportsPage() {
  return (
    <div>
        <h1 className="font-headline text-3xl font-bold mb-6">Sales Reports</h1>

        <Card>
            <CardHeader>
                <CardTitle>Under Construction</CardTitle>
                <CardDescription>This section is currently being developed.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Detailed sales reports and analytics will be available here soon. You will be able to filter by event, date range, and ticket tier to gain insights into your performance.</p>
            </CardContent>
        </Card>
    </div>
  );
}
