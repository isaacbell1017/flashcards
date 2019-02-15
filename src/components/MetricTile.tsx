import React from "react";
/** @jsx jsx */
import { CSSObject, jsx } from "@emotion/core";
export const jsxBabelFix = jsx;

import colors from "../styles/globalColors";
import "../styles/tile.css";

interface Props {
  content: string;
  title: string;
  variance?: "increase" | "decrease";
}

const MetricTile: React.FC<Props> = ({ content, title, variance }) => (
  <div css={styles.wrapper}>
    <div css={styles.tile}>
      <span css={styles.title}>{title}</span>
      <span css={styles.content}>{content}</span>
      <div css={[styles.corners, styles.top]} className="corners" />
      <div css={[styles.corners, styles.bottom]} className="corners" />
    </div>
  </div>
);

const styles: Record<
  "bottom" | "content" | "corners" | "tile" | "title" | "top" | "wrapper",
  CSSObject
> = {
  bottom: {
    bottom: "7px",
    ":before": {
      borderWidth: "0 0 1px 1px"
    },
    ":after": {
      borderWidth: "0 1px 1px 0"
    }
  },
  content: {
    color: colors.darkGray,
    display: "block",
    fontSize: "3rem",
    padding: "0 4rem 1rem 4rem"
  },
  corners: {
    position: "absolute",
    width: "100%",
    ":before": {
      left: 0
    },
    ":after": {
      right: 0
    },
    ":after, :before": {
      position: "absolute",
      width: "7px",
      height: "7px",
      borderColor: colors.lightGray,
      borderStyle: "solid"
    }
  },
  tile: {
    display: "inline-block",
    margin: "1rem 0",
    padding: "1rem",
    position: "relative",
    verticalAlign: "middle",
    width: "inherit"
  },
  title: {
    color: colors.darkGray,
    display: "block",
    fontSize: "1rem",
    padding: "1rem 4rem 0 4rem"
  },
  top: {
    top: 0,
    ":before": {
      borderWidth: "1px 0 0 1px"
    },
    ":after": {
      borderWidth: "1px 1px 0 0"
    }
  },
  wrapper: {
    textAlign: "center",
    width: "100%"
  }
};

export default MetricTile;
