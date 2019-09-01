const mongoose = require('mongoose');

const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
// for rezise images
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ msg: 'That file type does not exists and is not allowed' }, false);
    }
  },
};

exports.addStore = (req, res) => {
  res.render('editStore', {
    title: 'Add Store',
  });
};

exports.upload = multer(multerOptions).single('photo');

// middleware
exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const extenstion = req.file.mimetype.split('/')[1];

  req.body.photo = `${uuid.v4()}.${extenstion}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
};

exports.createStore = async (req, res) => {
  req.body.author = req.user._id;
  const store = await new Store(req.body).save();
  req.flash(
    'success',
    `Successfully created! ${store.name}. Care to leave a review!`
  );
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render('stores', { title: 'stores', stores });
};

const confirmOwner = (store, user) => {
  // Can also use built in method , (equals) to compare with an object ID

  if (store.author.toString() !== user._id) {
    throw Error('You must be the owner of the store to edit it');
  }
};
exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id });
  if (!store.author.equals(req.user._id)) {
    throw Error('You must be the owner of the store to edit it');
  }

  res.render('editStore', { title: `edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  req.body.location.type = 'Point';
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  req.flash(
    'success',
    `Successfully updated  <strong>${store.name}</strong> <a href="/stores/${store.slug}"> View Store </a> `
  );
  res.redirect(`/stores/${store._id}/edit`);
};

exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug }).populate(
    'author'
  );
  if (!store) return next();

  res.render('store', { title: store.name, store });
};

exports.getStoresByTag = async (req, res) => {
  const { tag } = req.params;
  const tagQuery = tag || { $exists: true };
  const tagPromise = Store.getTagList();
  const storePromise = Store.find({ tags: tagQuery });

  const [tags, stores] = await Promise.all([tagPromise, storePromise]);
  res.render('tags', { tags, title: 'Tags', tag, stores });

  // res.render('tags', { title: 'Tags', tags, tag });
};

exports.searchStores = async (req, res) => {
  const stores = await Store.find(
    {
      $text: {
        $search: req.query.q,
      },
    },
    {
      score: { $meta: 'textScore' },
    }
  )
    .sort({
      score: { $meta: 'textScore' },
    })
    .limit(5);

  res.json(stores);
};

exports.mapStores = async (req, res) => {
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
  const q = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates,
        },
        $maxDistance: 1000,
      },
    },
  };

  const stores = await Store.find(q)
    .select('slug name description location')
    .limit(10);
  res.json(stores);
};

exports.mapPage = (req, res) => {
  res.render('map', { title: 'Map' });
};
