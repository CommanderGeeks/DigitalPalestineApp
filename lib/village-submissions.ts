import { RegionKey } from "@/data/types"

export interface VillageSubmission {
  id?: string
  villageName: string
  regionKey: RegionKey
  coordinates: {
    x: number
    y: number
  }
  submittedAt: string
  status?: 'pending' | 'reviewed' | 'added'
}

export interface VillageSubmissionResponse {
  success: boolean
  submissionId?: string
  message: string
  error?: string
}

// Utility function to validate submission data
export function validateSubmission(submission: Partial<VillageSubmission>): string[] {
  const errors: string[] = []

  if (!submission.villageName || submission.villageName.trim().length === 0) {
    errors.push("Village name is required")
  }

  if (!submission.regionKey) {
    errors.push("Region is required")
  }

  if (!submission.coordinates) {
    errors.push("Coordinates are required")
  } else {
    if (typeof submission.coordinates.x !== 'number' || submission.coordinates.x < 0) {
      errors.push("Valid X coordinate is required")
    }
    if (typeof submission.coordinates.y !== 'number' || submission.coordinates.y < 0) {
      errors.push("Valid Y coordinate is required")
    }
  }

  if (!submission.submittedAt) {
    errors.push("Submission timestamp is required")
  }

  return errors
}

// Utility function to format submission for display
export function formatSubmissionForDisplay(submission: VillageSubmission): string {
  return `Village: ${submission.villageName}
Region: ${submission.regionKey}
Coordinates: (${submission.coordinates.x.toFixed(2)}, ${submission.coordinates.y.toFixed(2)})
Submitted: ${new Date(submission.submittedAt).toLocaleString()}
Status: ${submission.status || 'pending'}`
}