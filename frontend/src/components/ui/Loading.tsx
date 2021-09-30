import Typography from "@material-ui/core/Typography";
import React from "react";

const Loading = () => {
  return (
    <div className="loading">
      <img
        src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/books_1f4da.png"
        alt="loading"
      />
      <Typography variant="h3" component="h2">
        Loading
      </Typography>
    </div>
  );
};

export default Loading;
