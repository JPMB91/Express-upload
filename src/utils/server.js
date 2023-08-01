import express from 'express';
import exphbs from 'express-handlebars';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import router from '../routes/index.routes.js';

const app = express();
const port = 3000;

// config
app.engine(
  'hbs',
  exphbs.engine({
    helpers: {
      // funcion que aumenta en 1
      // usada para que al usar el '@index' de un #each
      // SUME 1 valor mas
      inc: function (value, options) {
        return parseInt(value) + 1;
      },
    },
    extname: 'hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', './src/views');

// config handlebars

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.use(
  fileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: 'El peso del archivo excede el limite permitido',
  })
);

// rutas
app.use(router);

app.listen(port, () => console.log(`server en puerto ${port} `));

export { app };
