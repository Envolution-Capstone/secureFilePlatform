import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#f3f3f3",
      top: "68px !important",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      borderRadius: "10px",
    },
  },
  selectBox: {
    marginLeft: 6,
  },
}));
