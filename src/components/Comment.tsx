interface Props {
    comment: string;
    user: string;
    time: string;
}

const Comment = ({comment, user, time}: Props) => {
    return (
        <li className="ml-6 lg:ml-0 mb-2 list-none">
            <div className="flex items-center gap-2">
                <span className="text-[#424242] font-bold">{user}</span>
                <span className="h-1 w-1 bg-[#A4A2A2] rounded-full"></span>
                <span className="text-[#A4A2A2]">{time}</span>
            </div>
            <span className="text-[#424242]">{comment}</span>
        </li>
    );
};

export default Comment;
