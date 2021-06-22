const ctrlSystemRoutes = (app, fs) => {
    // variables
    const dataPath = '../../models/json/ctrl_system.json';
  
    // READ
    app.get('/', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
    });
  };
  
  module.exports = ctrlSystemRoutes;