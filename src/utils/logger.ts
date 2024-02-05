import pino from "pino";
import dayjs from "dayjs";
import pretty from "pino-pretty";

const stream = pretty({
  colorize: true,
});

const logger = pino(
  {
    base: {
      pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
  },
  stream
);

export default logger;
