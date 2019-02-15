import React from 'react';
import ReactLoading from 'react-loading';

type type = "balls"
          | "blank"
          | "bubbles"
          | "cubes"
          | "cylon"
          | "spin"
          | "spinningBubbles"
          | "spokes"
          | undefined;

const Loading = ({ type, color }: { type: type, color: string }) => (
    <ReactLoading type={type} color={color} height={667} width={375} />
);

export default Loading;
