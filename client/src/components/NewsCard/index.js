import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CloseIcon from "@material-ui/icons/Close";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import API from "../../utils/API";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 450
  },
  media: {
    height: 0,
    paddingTop: "20.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

export default function NewsCard(props) {
  const { news, onDelete, onSetFavorite } = props;
  const classes = useStyles();
  const { title, pubdate, link, pic, summary, _id, favorited } = news;

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label="delete" onClick={() => onDelete(_id)}>
            <CloseIcon />
          </IconButton>
        }
        title={
          <a href={link} target="_blank">
            {title}
          </a>
        }
        subheader={pubdate}
      />
      <CardMedia className={classes.media} image={pic} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {summary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => onSetFavorite(_id, !favorited)}
        >
          <FavoriteIcon color={favorited ? "secondary" : "inherit"} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
