'use client'
import React from 'react'
import { useState } from 'react'
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function CommentBox({shopId, comment, setComment}) {

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/shop/${shopId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment })
    })
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