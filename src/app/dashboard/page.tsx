import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, PenSquare, BookCopy, History, Wand2, Save } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const recentActivities = [
    {
        action: 'Generated course: "Advanced TypeScript"',
        time: '2 hours ago',
        icon: <Wand2 className="h-4 w-4" />
    },
    {
        action: 'Saved course: "Introduction to React"',
        time: '1 day ago',
        icon: <Save className="h-4 w-4" />
    },
    {
        action: 'Generated course: "Next.js Fundamentals"',
        time: '3 days ago',
        icon: <Wand2 className="h-4 w-4" />
    },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="space-y-1.5">
        <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">Welcome to Your Dashboard</h1>
        <p className="text-muted-foreground">Here's a quick overview of what you can do.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>A log of your recent course generations and saves.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground mt-1">
                                {activity.icon}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{activity.action}</p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                <PenSquare className="h-5 w-5 text-primary" />
                <span>Generate a New Course</span>
                </CardTitle>
                <CardDescription>Start creating a new programming course with the power of AI.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                <Link href="/dashboard/generate">
                    Start Generating <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                </Button>
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                <BookCopy className="h-5 w-5 text-primary" />
                <span>View Your Courses</span>
                </CardTitle>
                <CardDescription>Access and manage all the courses you have saved.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild variant="secondary">
                <Link href="/dashboard/courses">
                    My Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                </Button>
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
