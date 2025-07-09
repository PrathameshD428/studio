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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { runProvideProjectFeedback } from "@/app/actions";
import type { ProvideProjectFeedbackOutput } from "@/ai/flows/provide-project-feedback";
import { Loader2, Palette, PenTool, Scaling, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "./ui/checkbox";
import Image from "next/image";

const aspects = [
  { id: "composition", label: "Composition" },
  { id: "color", label: "Color" },
  { id: "technique", label: "Technique" },
] as const;

const formSchema = z.object({
  projectImage: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "An image of your project is required."),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  aspectsToEvaluate: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

export default function CritiqueAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ProvideProjectFeedbackOutput | null>(
    null
  );
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectImage: undefined,
      description: "",
      aspectsToEvaluate: [],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("projectImage", e.target.files as FileList);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults(null);

    try {
      const projectDataUri = await fileToBase64(values.projectImage[0]);
      const response = await runProvideProjectFeedback({
        projectDataUri,
        description: values.description,
        aspectsToEvaluate: values.aspectsToEvaluate as ('composition' | 'color' | 'technique')[],
      });
      if (response.error) {
        throw new Error(response.error);
      }
      setResults(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred.",
        description: "Failed to get project feedback. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-8 grid md:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Get Intelligent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="projectImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Your Project</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {preview && (
                <div className="w-full aspect-video relative">
                  <Image
                    src={preview}
                    alt="Project preview"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project, medium, techniques, and goals..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aspectsToEvaluate"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Aspects to Evaluate
                      </FormLabel>
                      <FormDescription>
                        Select the areas where you'd like feedback.
                      </FormDescription>
                    </div>
                    <div className="flex flex-wrap gap-4">
                    {aspects.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="aspectsToEvaluate"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Get Feedback
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="sticky top-8">
        {isLoading && (
          <Card className="flex items-center justify-center p-10">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </Card>
        )}

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Feedback Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {results.feedback.composition && (
                    <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Scaling className="text-primary"/> Composition</h3>
                        <p className="text-muted-foreground">{results.feedback.composition}</p>
                    </div>
                )}
                 {results.feedback.color && (
                    <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Palette className="text-primary"/> Color</h3>
                        <p className="text-muted-foreground">{results.feedback.color}</p>
                    </div>
                )}
                 {results.feedback.technique && (
                    <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><PenTool className="text-primary"/> Technique</h3>
                        <p className="text-muted-foreground">{results.feedback.technique}</p>
                    </div>
                )}
                <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Star className="text-accent"/> Overall Impression</h3>
                    <p className="text-muted-foreground">{results.feedback.overallImpression}</p>
                </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
