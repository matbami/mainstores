import { DB_HOST, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection = {
  url: `mongodb+srv://Haywhy:QMjsnGtJhz1MQk0n@cluster0.qlusc.mongodb.net/mainstore?retryWrites=true&w=majority`,
  // url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
