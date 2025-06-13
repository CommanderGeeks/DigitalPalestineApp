import { z } from "zod"

// Base user schema
export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  isPalestinian: z.boolean().optional().default(false),
  regionId: z.string().optional().nullable(),
  townCity: z.string().optional().nullable(),
  connectToOrigin: z.boolean().optional().default(false),
  passportType: z.enum(["PERSONAL", "BUSINESS", "INSTITUTION", "DEVELOPER"]),
  volunteer: z.boolean().optional().default(false),

  // Volunteer fields
  joinSubCommittee: z.boolean().optional().default(false),
  volunteerSkills: z.array(z.string()).optional().default([]),
  additionalContributions: z.string().optional().nullable(),

  // Community engagement
  participateInSurveys: z.boolean().optional().default(false),
  earlyAccessTesting: z.boolean().optional().default(false),
  joinCommunityEvents: z.boolean().optional().default(false),
  connectWithOthers: z.boolean().optional().default(false),
  contributeIdeas: z.boolean().optional().default(false),

  // Feedback fields
  hopesForDigitalPalestine: z.string().optional().nullable(),
  supportNeeds: z.string().optional().nullable(),
  desiredFeatures: z.string().optional().nullable(),
})

// Personal passport schema
export const personalProfileSchema = z
  .object({
    dateOfBirth: z.string().optional().nullable(),
    gender: z.string().optional().nullable(),
    nationality: z.string().optional().nullable(),
    countryOfResidence: z.string().optional().nullable(),
    cityOfResidence: z.string().optional().nullable(),
    profession: z.string().optional().nullable(),
    areasOfExpertise: z.string().optional().nullable(),
    skillsOrHobbies: z.string().optional().nullable(),
    primaryInterests: z.string().optional().nullable(),
    interestedInGovernance: z.boolean().optional().default(false),
  })
  .optional()

// Business passport schema
export const businessInfoSchema = z
  .object({
    companyName: z.string().optional().nullable(),
    website: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    sector: z.string().optional().nullable(),
    employeeCount: z.string().optional().nullable(),
    goals: z.string().optional().nullable(),
    challenges: z.string().optional().nullable(),
    interestedInGovernance: z.boolean().optional().default(false),
  })
  .optional()

// Institution passport schema
export const institutionInfoSchema = z
  .object({
    orgName: z.string().optional().nullable(),
    website: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    memberCount: z.string().optional().nullable(),
    areaOfFocus: z.string().optional().nullable(),
    goals: z.string().optional().nullable(),
    partnerships: z.string().optional().nullable(),
    services: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
  })
  .optional()

// Developer passport schema
export const developerInfoSchema = z
  .object({
    nationality: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    expertise: z.string().optional().nullable(),
    yearsExperience: z.string().optional().nullable(),
    primaryFocus: z.string().optional().nullable(),
    stack: z.array(z.string()).optional().default([]),
    github: z.string().optional().nullable(),
    interestedInGrants: z.boolean().optional().default(false),
    interestedInGovernance: z.boolean().optional().default(false),
    joinDeveloperNetwork: z.boolean().optional().default(false),
    workingModality: z.string().optional().nullable(),
  })
  .optional()

// Combined signup schema with conditional fields based on passport type
export const signupSchema = z.object({
  user: userSchema,
  personalProfile: personalProfileSchema,
  businessInfo: businessInfoSchema,
  institutionInfo: institutionInfoSchema,
  developerInfo: developerInfoSchema,
})
