"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { runPersonalizedSkillJourney } from "@/app/actions";
import type { PersonalizedSkillJourneyOutput } from "@/ai/flows/personalized-skill-journey";
import { Loader2, BookOpen, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  skillLevel: z.string().min(1, { message: "Please select your skill level." }),
  learningGoals: z.string().min(10, {
    message: "Learning goals must be at least 10 characters.",
  }),
  interests: z.string().min(3, {
    message: "Interests must be at least 3 characters.",
  }),
});

export default function SkillNavigator() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PersonalizedSkillJourneyOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillLevel: "",
      learningGoals: "",
      interests: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults(null);
    try {
      const response = await runPersonalizedSkillJourney(values);
      if (response.error) {
        throw new Error(response.error);
      }
      setResults(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred.",
        description:
          "Failed to generate your personalized skill journey. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-8 grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Discover Your Creative Path</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Skill Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your skill level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Interests</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., fantasy art, minimalist design"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="learningGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Learn to draw portraits, master UI design"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe what you want to achieve on your creative journey.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Generate My Journey
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

      {results && (
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <BookOpen className="text-accent" />
                Course Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {results.courseRecommendations.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Rocket className="text-accent" />
                Project Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {results.projectRecommendations.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
