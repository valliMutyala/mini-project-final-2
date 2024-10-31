import React from "react";
const { StarIcon } = require("lucide-react");
const { AvatarImage, Avatar, AvatarFallback } = require("./ui/avatar");

function CommentList({user, comment}) {
    return (
        <>
            <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-medium">{user}</h3>
                        <div className="flex items-center gap-0.5">
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        </div>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                    {comment}
                    </p>
                </div>
            </div>
        </>
    )
}

export default CommentList;