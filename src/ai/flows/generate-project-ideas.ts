// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview An AI agent that suggests creative project ideas based on user preferences.
 *
 * - generateProjectIdeas - A function that generates project ideas.
 * - GenerateProjectIdeasInput - The input type for the generateProjectIdeas function.
 * - GenerateProjectIdeasOutput - The return type for the generateProjectIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectIdeasInputSchema = z.object({
  topic: z.string().describe('The topic or theme of the project.'),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('The desired skill level for the project.'),
  duration: z.enum(['short', 'medium', 'long']).describe('The desired duration of the project.'),
  materials: z.string().optional().describe('Optional: List of materials the user wants to use.'),
});
export type GenerateProjectIdeasInput = z.infer<typeof GenerateProjectIdeasInputSchema>;

const GenerateProjectIdeasOutputSchema = z.object({
  projectIdeas: z.array(
    z.object({
      title: z.string().describe('The title of the project idea.'),
      description: z.string().describe('A brief description of the project idea.'),
      estimatedEffort: z.string().describe('Estimated time and resources needed.'),
      suggestedMaterials: z.string().describe('List of materials needed for the project.'),
    })
  ).describe('An array of creative project ideas.'),
});
export type GenerateProjectIdeasOutput = z.infer<typeof GenerateProjectIdeasOutputSchema>;

export async function generateProjectIdeas(input: GenerateProjectIdeasInput): Promise<GenerateProjectIdeasOutput> {
  return generateProjectIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectIdeasPrompt',
  input: {schema: GenerateProjectIdeasInputSchema},
  output: {schema: GenerateProjectIdeasOutputSchema},
  prompt: `You are a creative assistant that helps users generate project ideas based on their preferences.

  Generate a few project ideas based on the following criteria:

  Topic: {{{topic}}}
  Skill Level: {{{skillLevel}}}
  Duration: {{{duration}}}
  {{#if materials}}
  Materials: {{{materials}}}
  {{/if}}

  Format the project ideas as a JSON array of objects, each containing a title, description, estimated effort, and suggested materials.
  `,
});

const generateProjectIdeasFlow = ai.defineFlow(
  {
    name: 'generateProjectIdeasFlow',
    inputSchema: GenerateProjectIdeasInputSchema,
    outputSchema: GenerateProjectIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
