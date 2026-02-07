const UserAvatars = () => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
      <div className="flex -space-x-2">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 border-2 border-background" />
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-pink-400 to-pink-600 border-2 border-background" />
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-purple-400 to-purple-600 border-2 border-background" />
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold border-2 border-background">
          +
        </div>
      </div>
   
    </div>
  );
};

export default UserAvatars;
