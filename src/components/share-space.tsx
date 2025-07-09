import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import type { Project } from "@/lib/types";

const projects: Project[] = [
  {
    title: "Enchanted Forest",
    author: "Elena Rodriguez",
    imageUrl: "https://placehold.co/600x400.png",
    likes: 124,
    comments: 18,
    "data-ai-hint": "fantasy forest",
  },
  {
    title: "Cyberpunk Alley",
    author: "Ben Carter",
    imageUrl: "https://placehold.co/600x400.png",
    likes: 256,
    comments: 32,
    "data-ai-hint": "cyberpunk alley"
  },
  {
    title: "Serenity",
    author: "Aisha Khan",
    imageUrl: "https://placehold.co/600x400.png",
    likes: 98,
    comments: 12,
    "data-ai-hint": "calm lake"
  },
  {
    title: "Mech Warrior",
    author: "Marcus Greene",
    imageUrl: "https://placehold.co/600x400.png",
    likes: 312,
    comments: 45,
    "data-ai-hint": "giant robot"
  },
   {
    title: "Sun-kissed Petals",
    author: "Sofia Chen",
    imageUrl: "https://placehold.co/600x400.png",
    likes: 178,
    comments: 21,
    "data-ai-hint": "watercolor flowers"
  },
  {
    title: "The Last Dragon",
    author: "Leo Takahashi",
    imageUrl: "https://placehold.co/600x400.png",
    likes: 450,
    comments: 68,
    "data-ai-hint": "fantasy dragon"
  },
];

export default function ShareSpace() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-headline">Community Showcase</h2>
        <p className="text-muted-foreground">Explore amazing projects from creatives around the world.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden group">
            <CardContent className="p-0">
              <div className="aspect-video w-full overflow-hidden">
                 <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={project['data-ai-hint']}
                />
              </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
                <div>
                    <CardTitle className="font-headline text-lg">{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {project.author}</p>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Heart className="size-4" />
                        <span>{project.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageCircle className="size-4" />
                        <span>{project.comments}</span>
                    </div>
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
