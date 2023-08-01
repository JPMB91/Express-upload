import path from 'path';
import fs from 'fs';

const subirImagen = (req, res) => {
  const { posicion } = req.body;
  const { imagen } = req.files;
  const extension = imagen.name.split('.');

  const fileName = `${posicion}.${extension[1]}`;

  let fileExtension = path.extname(req.files.imagen.name);
  let allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

  if (!allowedExtensions.includes(fileExtension)) {
    return res.status(400).send('Extension del archivo invalida!');
  }

  imagen.mv(`${process.cwd()}/public/uploads/${fileName}`, (error) => {
    if (error) {
      return res.status(500).json({
        code: 500,
        message: 'Ha ocurrido un error en el servidor',
        error: error,
      });
    }
    res.redirect('/collage');
  });
};

const verCollage = (req, res) => {
  const title = 'Collage de imagenes';

  // Guardamos la ruta de donde se guardan las 'imagenes'
  const pathCarpetaUploads = `${process.cwd()}/public/uploads`;

  fs.readdir(pathCarpetaUploads, (error, data) => {
    if (error) {
      console.error('Error al leer la carpeta uploads:', error);
      return res.status(500).send('Error al leer la carpeta uploads');
    }

    // array de las imagenes, que cumplan con la extensiones
    // especificadas en el array
    const images = data.filter((file) => ['.png', '.jpg', '.jpeg', '.gif'].includes(path.extname(file)));
    res.render('collage', { title, images });
  });
};

const eliminarImagen = (req, res) => {
  const { posicion } = req.params;
  try {
    fs.unlinkSync(`${process.cwd()}/public/uploads/${posicion}`);
    res.send('Imagen eliminada con exito!');
  } catch (error) {
    console.error('Error al eliminarImagen:', error);
    res.send('Error al eliminar la image');
  }
};
export { subirImagen, verCollage, eliminarImagen };
