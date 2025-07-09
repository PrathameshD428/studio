'use server';

/**
 * @fileOverview An AI agent that provides personalized course and project recommendations based on the user's current skill level and learning goals.
 *
 * - personalizedSkillJourney - A function that recommends courses and projects.
 * - PersonalizedSkillJourneyInput - The input type for the personalizedSkillJourney function.
 * - PersonalizedSkillJourneyOutput - The return type for the personalizedSkillJourney function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedSkillJourneyInputSchema = z.object({
  skillLevel: z
    .string()
    .describe('The current skill level of the user (e.g., beginner, intermediate, advanced).'),
  learningGoals:
    z.string().describe('The learning goals of the user (e.g., learn to draw portraits, master UI design).'),
  interests: z.string().describe('The interests of the user (e.g., fantasy art, minimalist design).'),
});
export type PersonalizedSkillJourneyInput = z.infer<typeof PersonalizedSkillJourneyInputSchema>;

const PersonalizedSkillJourneyOutputSchema = z.object({
  courseRecommendations: z.array(z.string()).describe('A list of recommended courses.'),
  projectRecommendations: z.array(z.string()).describe('A list of recommended projects.'),
});
export type PersonalizedSkillJourneyOutput = z.infer<typeof PersonalizedSkillJourneyOutputSchema>;

export async function personalizedSkillJourney(
  input: PersonalizedSkillJourneyInput
): Promise<PersonalizedSkillJourneyOutput> {
  return personalizedSkillJourneyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedSkillJourneyPrompt',
  input: {schema: PersonalizedSkillJourneyInputSchema},
  output: {schema: PersonalizedSkillJourneyOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized learning recommendations.

  Based on the user's current skill level, learning goals, and interests, recommend relevant courses and projects.

  Skill Level: {{{skillLevel}}}
  Learning Goals: {{{learningGoals}}}
  Interests: {{{interests}}}

  Provide the course recommendations and project recommendations in separate lists.
  Be concise.
  `,
});

const personalizedSkillJourneyFlow = ai.defineFlow(
  {
    name: 'personalizedSkillJourneyFlow',
    inputSchema: PersonalizedSkillJourneyInputSchema,
    outputSchema: PersonalizedSkillJourneyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
