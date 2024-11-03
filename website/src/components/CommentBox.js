'use client'
import React, { useState } from 'react'
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function CommentBox({ shopId, setComment, comment }) {

  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0) {
      alert("Please provide a comment and a rating.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/shop/${shopId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment, rating })
      });
      
      if (response.ok) {
        setComment("");
        setRating(0);
        alert("Comment and rating submitted successfully");
      } else {
        alert("Failed to submit comment and rating");
      }
    } catch (error) {
      console.error("Error submitting comment and rating:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="mx-auto bg-card rounded-lg shadow">
      <h2 className="text-1xl font-bold mb-4 pt-4 pl-4">Add a Comment & Rating</h2>
      <div className="flex p-4 items-start space-x-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <form onSubmit={handleSubmit} className="flex-grow space-y-4">
          <Textarea
            placeholder="What are your thoughts?"
            className="w-full min-h-[100px]"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <label htmlFor="rating" className="font-medium">Rating:</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="p-2 border rounded"
            >
              <option value="0">Select Rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value} Star{value > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit">Submit Comment & Rating</Button>
        </form>
      </div>
    </div>
  );
}
