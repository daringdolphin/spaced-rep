"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Textarea } from "~/components/ui/textarea"
import { toast } from "~/hooks/use-toast"
import { type Card } from "~/types/schema"
import { addCard } from "~/server/actions/cards"

interface CreateCardModalProps {
  deckId: number
  isOpen: boolean
  onClose: () => void
  onSuccess: (card: Card) => void
}

export function CreateCardModal({ deckId, isOpen, onClose, onSuccess }: CreateCardModalProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const question = formData.get("question") as string
    const answer = formData.get("answer") as string

    try {
      const result = await addCard({ deckId, question, answer })

      if (!result.success) {
        throw new Error(result.error)
      }

      toast({
        title: "Success",
        description: "Your flashcard has been added to the deck",
      })

      onSuccess(result.card!)
      router.refresh()
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create card",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Card</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="question" className="text-sm font-medium">
                Question
              </label>
              <Textarea
                id="question"
                name="question"
                placeholder="Enter the question..."
                required
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="answer" className="text-sm font-medium">
                Answer
              </label>
              <Textarea
                id="answer"
                name="answer"
                placeholder="Enter the answer..."
                required
                className="resize-none"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="primary-500 hover:bg-primary-900">
              {isSubmitting ? "Creating..." : "Create Card"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 