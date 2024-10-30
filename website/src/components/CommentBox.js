'use client'
import React from 'react'
import { useState } from 'react'
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function CommentBox() {
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting comment:', comment)
    setComment('')
  }

  return (
    <div className="mx-auto bg-card rounded-lg shadow">
      <h2 className="text-1xl font-bold mb-4 pt-4 pl-4">Add a Comment</h2>
      <div className="flex p-4 items-start space-x-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <form onSubmit={handleSubmit} className="flex-grow space-y-4">
          <Textarea
            placeholder="What are your thoughts?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full min-h-[100px]"
          />
          <Button type="submit" disabled={!comment.trim()}>
            Submit Comment
          </Button>
        </form>
      </div>
    </div>
  )
}