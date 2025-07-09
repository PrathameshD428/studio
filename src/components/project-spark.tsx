"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { useState } from "react";
import { runGenerateProjectIdeas } from "@/app/actions";
import type { GenerateProjectIdeasOutput } from "@/ai/flows/generate-project-ideas";
import { Loader2, Sparkles, Wrench, Clock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  topic: z.string().min(3, { message: "Topic must be at least 3 characters." }),
  skillLevel: z.enum(["beginner", "intermediate", "advanced"]),
  duration: z.enum(["short", "medium", "long"]),
  materials: z.string().optional(),
});

export default function ProjectSpark() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GenerateProjectIdeasOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      skillLevel: "beginner",
      duration: "short",
      materials: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults(null);
    try {
      const response = await runGenerateProjectIdeas(values);
      if (response.error) {
        throw new Error(response.error);
      }
      setResults(response);
    } catch (error) {
       console.error(error);
       toast({
         variant: "destructive",
         title: "An error occurred.",
         description: "Failed to generate project ideas. Please try again.",
       });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-8 grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Ignite Your Next Creation</CardTitle>
          <CardDescription>
            Tell us what you're thinking, and we'll spark some ideas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic or Theme</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Surreal landscapes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Duration</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="short">Short (1-3 hours)</SelectItem>
                          <SelectItem value="medium">Medium (4-8 hours)</SelectItem>
                          <SelectItem value="long">Long (8+ hours)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="materials"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Materials (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Watercolors, iPad, clay"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Ideas
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center p-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {results && results.projectIdeas.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 font-headline flex items-center gap-2">
            <Sparkles className="text-accent" />
            Your Project Ideas
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {results.projectIdeas.map((idea, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="bg-card border rounded-lg">
                <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                  {idea.title}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <p className="mb-4">{idea.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                        <Clock className="size-4 mt-1 text-primary"/>
                        <div>
                            <h4 className="font-semibold">Estimated Effort</h4>
                            <p>{idea.estimatedEffort}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Wrench className="size-4 mt-1 text-primary"/>
                        <div>
                            <h4 className="font-semibold">Suggested Materials</h4>
                            <p>{idea.suggestedMaterials}</p>
                        </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
