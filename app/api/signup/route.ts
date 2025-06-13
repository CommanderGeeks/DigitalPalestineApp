export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { signupSchema } from "@/lib/validations/user"

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json()
    console.log("Received signup request:", JSON.stringify(body, null, 2))

    const validationResult = signupSchema.safeParse(body)

    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.format())
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: validationResult.error.format(),
          received: body,
        },
        { status: 400 },
      )
    }

    const { user, personalProfile, businessInfo, institutionInfo, developerInfo } = validationResult.data

    // Ensure arrays are properly initialized
    user.volunteerSkills = Array.isArray(user.volunteerSkills) ? user.volunteerSkills : []

    // Create the appropriate profile based on passport type
    let businessInfoId: string | undefined
    let institutionInfoId: string | undefined
    let developerInfoId: string | undefined

    // Try to create business info if applicable
    if (user.passportType === "BUSINESS" && businessInfo) {
      try {
        const createdBusinessInfo = await prisma.businessInfo.create({
          data: {
            companyName: businessInfo.companyName || "Unnamed Business",
            website: businessInfo.website || null,
            country: businessInfo.country || null,
            city: businessInfo.city || null,
            sector: businessInfo.sector || null,
            employeeCount: businessInfo.employeeCount || null,
            goals: businessInfo.goals || null,
            challenges: businessInfo.challenges || null,
            interestedInGovernance: businessInfo.interestedInGovernance || false,
          },
        })
        businessInfoId = createdBusinessInfo.id
      } catch (error) {
        console.error("Error creating business info:", error)
        // Continue without business info
      }
    }

    // Try to create institution info if applicable
    if (user.passportType === "INSTITUTION" && institutionInfo) {
      try {
        const createdInstitutionInfo = await prisma.institutionInfo.create({
          data: {
            orgName: institutionInfo.orgName || "Unnamed Institution",
            orgType: institutionInfo.category || "Other",
            website: institutionInfo.website || null,
            country: institutionInfo.country || null,
            city: institutionInfo.city || null,
            memberCount: institutionInfo.memberCount || null,
            areaOfFocus: institutionInfo.areaOfFocus || null,
            goals: institutionInfo.goals || null,
            partnerships: institutionInfo.partnerships || null,
            services: institutionInfo.services || null,
            category: institutionInfo.category || "Other",
          },
        })
        institutionInfoId = createdInstitutionInfo.id
      } catch (error) {
        console.error("Error creating institution info:", error)
        // Continue without institution info
      }
    }

    // Try to create developer info if applicable
    if (user.passportType === "DEVELOPER" && developerInfo) {
      try {
        const developerStack = Array.isArray(developerInfo.stack) ? developerInfo.stack : []

        const createdDeveloperInfo = await prisma.developerInfo.create({
          data: {
            nationality: developerInfo.nationality || null,
            country: developerInfo.country || null,
            city: developerInfo.city || null,
            expertise: developerInfo.expertise || null,
            yearsExperience: developerInfo.yearsExperience || null,
            primaryFocus: developerInfo.primaryFocus || null,
            stack: developerStack,
            github: developerInfo.github || null,
            interestedInGrants: developerInfo.interestedInGrants || false,
            interestedInGovernance: developerInfo.interestedInGovernance || false,
            joinDeveloperNetwork: developerInfo.joinDeveloperNetwork || false,
            workingModality: developerInfo.workingModality || null,
          },
        })
        developerInfoId = createdDeveloperInfo.id
      } catch (error) {
        console.error("Error creating developer info:", error)
        // Continue without developer info
      }
    }

    // Create the user
    try {
      // Check if email already exists
      if (user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        })

        if (existingUser) {
          return NextResponse.json(
            {
              error: "Email already registered",
              message: "This email address is already registered. Please use a different email or login.",
            },
            { status: 409 },
          )
        }
      }

      // Create user with fallback values for all fields
      const createdUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name || "New User",
          isPalestinian: user.isPalestinian || false,
          regionId: user.regionId || null,
          townCity: user.townCity || null,
          connectToOrigin: user.connectToOrigin || false,
          passportType: user.passportType || "PERSONAL",
          volunteer: user.volunteer || false,
          joinSubCommittee: user.joinSubCommittee || false,
          volunteerSkills: Array.isArray(user.volunteerSkills) ? user.volunteerSkills : [],
          additionalContributions: user.additionalContributions || null,
          participateInSurveys: user.participateInSurveys || false,
          earlyAccessTesting: user.earlyAccessTesting || false,
          joinCommunityEvents: user.joinCommunityEvents || false,
          connectWithOthers: user.connectWithOthers || false,
          contributeIdeas: user.contributeIdeas || false,
          hopesForDigitalPalestine: user.hopesForDigitalPalestine || null,
          supportNeeds: user.supportNeeds || null,
          desiredFeatures: user.desiredFeatures || null,
          businessInfoId: businessInfoId || null,
          institutionInfoId: institutionInfoId || null,
          developerInfoId: developerInfoId || null,
        },
      })

      // Create personal profile if applicable
      if (user.passportType === "PERSONAL" && personalProfile) {
        try {
          await prisma.profile.create({
            data: {
              userId: createdUser.id,
              fullName: user.name || null,
              nationality: personalProfile.nationality || null,
              countryOfResidence: personalProfile.countryOfResidence || null,
              cityOfResidence: personalProfile.cityOfResidence || null,
              dateOfBirth: personalProfile.dateOfBirth || null,
              gender: personalProfile.gender || null,
              profession: personalProfile.profession || null,
              areasOfExpertise: personalProfile.areasOfExpertise || null,
              skillsOrHobbies: personalProfile.skillsOrHobbies || null,
              primaryInterests: personalProfile.primaryInterests || null,
              interestedInGovernance: personalProfile.interestedInGovernance || false,
            },
          })
        } catch (error) {
          console.error("Error creating profile:", error)
          // Continue even if profile creation fails
        }
      }

      // Create committee interests if user is volunteering
      if (user.volunteer && Array.isArray(user.volunteerSkills) && user.volunteerSkills.length > 0) {
        try {
          // Map skills to committees (simplified example)
          const committees = mapSkillsToCommittees(user.volunteerSkills)

          for (const committee of committees) {
            await prisma.committeeInterest.create({
              data: {
                userId: createdUser.id,
                committee,
                skillMatch: 1, // Default match score
              },
            })
          }
        } catch (error) {
          console.error("Error creating committee interests:", error)
          // Continue even if committee interest creation fails
        }
      }

      return NextResponse.json({ success: true, userId: createdUser.id }, { status: 201 })
    } catch (error) {
      console.error("Error creating user:", error)
      // Provide detailed error information
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      const errorStack = error instanceof Error ? error.stack : "No stack trace available"

      return NextResponse.json(
        {
          error: "Failed to create user",
          message: errorMessage,
          stack: errorStack,
          details: JSON.stringify(error),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in signup route:", error)
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorStack = error instanceof Error ? error.stack : "No stack trace available"

    return NextResponse.json(
      {
        error: "Failed to process signup request",
        message: errorMessage,
        stack: errorStack,
        details: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}

// Helper function to map skills to committees
function mapSkillsToCommittees(skills: string[]): string[] {
  const skillToCommitteeMap: Record<string, string> = {
    Writing: "Media",
    Translation: "Language",
    "Software Development": "Tech",
    "Community Outreach": "Outreach",
    "Graphic Design": "Media",
    "Legal Expertise": "Legal",
    Fundraising: "Finance",
    "Social Media": "Media",
    "Event Organizing": "Events",
    // Add more mappings as needed
  }

  const committees = new Set<string>()

  for (const skill of skills) {
    const committee = skillToCommitteeMap[skill]
    if (committee) {
      committees.add(committee)
    }
  }

  return Array.from(committees)
}
