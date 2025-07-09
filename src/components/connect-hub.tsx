import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import type { Peer } from "@/lib/types";

const peers: Peer[] = [
  {
    name: "Elena Rodriguez",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    specialty: "Illustration",
    tags: ["Portraits", "Digital Art", "Procreate"],
  },
  {
    name: "Ben Carter",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
    specialty: "UI/UX Design",
    tags: ["Figma", "Web Design", "Mobile Apps"],
  },
  {
    name: "Aisha Khan",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
    specialty: "Photography",
    tags: ["Street", "Landscape", "Lightroom"],
  },
  {
    name: "Marcus Greene",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
    specialty: "3D Modeling",
    tags: ["Blender", "Character Design", "Hard Surface"],
  },
   {
    name: "Sofia Chen",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026708d",
    specialty: "Watercolor",
    tags: ["Botanical", "Plein Air", "Abstract"],
  },
  {
    name: "Leo Takahashi",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026709d",
    specialty: "Creative Writing",
    tags: ["Fiction", "Poetry", "Storytelling"],
  },
];

export default function ConnectHub() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-headline">Connect with Creatives</h2>
        <p className="text-muted-foreground">Find peers and experts for collaboration and mentorship.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {peers.map((peer, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={peer.avatar} alt={peer.name} />
                <AvatarFallback>{peer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-xl">{peer.name}</CardTitle>
                <CardDescription>{peer.specialty}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {peer.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Connect</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
