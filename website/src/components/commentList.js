import { type } from "@testing-library/user-event/dist/type";
import React from "react";
const { StarIcon } = require("lucide-react");
const { AvatarImage, Avatar, AvatarFallback } = require("./ui/avatar");

function CommentList({ username, comment, rating }) {
    console.log(type(username));
    return (
        <div className="flex gap-4">
            <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" alt={`@${username}`} />
                <AvatarFallback>{username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium">{username}</h3>
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, index) => (
                            <StarIcon
                                key={index}
                                className={`w-5 h-5 ${
                                    index < rating
                                        ? "fill-primary"
                                        : "fill-muted stroke-muted-foreground"
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <p className="mt-2 text-muted-foreground">{comment}</p>
            </div>
        </div>
    );
}

export default CommentList;
