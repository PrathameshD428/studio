import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Award, Sparkles } from "lucide-react";
import type { Milestone } from "@/lib/types";

const journey: Milestone[] = [
  {
    type: "course",
    title: "Introduction to Procreate",
    description: "Mastered the fundamentals of digital illustration.",
    date: "2 Weeks Ago",
    icon: <CheckCircle2 className="text-green-500" />,
  },
  {
    type: "project",
    title: "First Character Portrait",
    description: "Completed and shared a personal project with the community.",
    date: "1 Week Ago",
    icon: <Sparkles className="text-yellow-500" />,
  },
  {
    type: "achievement",
    title: "Beginner Illustrator Badge",
    description: "Earned recognition for consistent practice and skill development.",
    date: "3 Days Ago",
    icon: <Award className="text-blue-500" />,
  },
    {
    type: "course",
    title: "Advanced Color Theory",
    description: "Explored complex color harmonies and palettes.",
    date: "1 Day Ago",
    icon: <CheckCircle2 className="text-green-500" />,
  },
];

export default function MyJourney() {
  return (
    <div className="p-4 md:p-8">
       <div className="mb-8">
        <h2 className="text-3xl font-bold font-headline">Your Creative Journey</h2>
        <p className="text-muted-foreground">A timeline of your progress, projects, and achievements.</p>
      </div>

      <div className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-border after:left-0">
        {journey.map((milestone, index) => (
          <div key={index} className="relative pb-8">
            <div className="absolute top-1 -left-[37px] h-8 w-8 bg-background rounded-full flex items-center justify-center border-2 border-primary">
              <div className="h-6 w-6 bg-background rounded-full flex items-center justify-center">
                 {milestone.icon}
              </div>
            </div>
            <Card className="ml-4">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-headline text-xl">{milestone.title}</CardTitle>
                    <CardDescription>{milestone.description}</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{milestone.date}</span>
                </div>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
