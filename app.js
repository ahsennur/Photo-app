const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');


const Photo = require('./models/Photo');


const fileUpload = require('express-fileupload'); 
const fs = require('fs');

const methodOverride = require('method-override');

const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

mongoose.connect('mongodb://127.0.0.1:27017/pcatDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("db ok")
})

// Photo.create({
//   title: 'Photo Title 1',
//   description: 'Photo description 1',
// });

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(fileUpload()); 

app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));

//Template Engine
app.set("view engine", "ejs");

//ROUTING
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);


//BEFORE ROUTING
// app.get("/add", (req, res) => {
//   res.render('add');
// });

// app.post('/photos', async (req, res) => {
//   // await Photo.create(req.body)
//   // res.redirect('/')

//   const uploadDir = 'public/uploads';

//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
//   }

//   let uploadeImage = req.files.image;
//   let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

//   uploadeImage.mv(uploadPath, async () => {
//     await Photo.create({
//       ...req.body,
//       image: '/uploads/' + uploadeImage.name,
//     });
//     res.redirect('/');
//   });
// });


// app.get("/photos/:id", async (req, res) => {
//   const photo = await Photo.findById(req.params.id)
//   res.render('photo', {photo}
//   )
// });

// app.get('/photos/edit/:id', async (req, res) => {
//   const photo = await Photo.findOne({ _id: req.params.id });
//   res.render('edit', {
//     photo,
//   });
// });

// app.put('/photos/:id', async (req, res) => {
//   const photo = await Photo.findOne({ _id: req.params.id });
//   photo.title = req.body.title
//   photo.description = req.body.description
//   photo.save()

//   res.redirect(`/photos/${req.params.id}`)
// });

// app.delete('/photos/:id', async (req, res) => {
//   const photo = await Photo.findOne({ _id: req.params.id });
//   let deletedImage = __dirname + '/public' + photo.image;
//   fs.unlinkSync(deletedImage);
//   await Photo.findByIdAndRemove(req.params.id);
//   res.redirect('/');
// }); 

///////////////////////////////////////////
//MIDDLEWARES
// const myLogger = (req, res, next) => {
//     console.log('Middleware Log 1');
//     next();//The next middeleware in the code
//   }

// app.use(myLogger);

// app.get('/', (req, res) => {

//   const photo = {
//     id: 1,
//     name: "Photo Name",
//     description: "Photo description"
//   }
//   res.send(photo)
// })

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'temp/index.html'));
//   });



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up on the port: ${port}`);
});
