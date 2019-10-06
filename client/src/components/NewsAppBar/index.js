import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function NewsAppBar({
  onRefresh,
  onDelete,
  favoriteOnly,
  setFavoriteOnly
}) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Popular Mechanics Technology News
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={() => setFavoriteOnly(!favoriteOnly)}>
              <FavoriteIcon color={favoriteOnly ? "secondary" : "inherit"} />
            </IconButton>
            <IconButton onClick={onRefresh}>
              <RefreshIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteForeverIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
