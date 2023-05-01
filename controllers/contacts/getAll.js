const {Contact} = require('../../models/contacts');

// pagination
// const paginate = require('mongoose-paginate');


const getAll = async(req,res) => {
    const {_id:owner} = req.user;

    const result = await Contact.find({owner},"-createdAt,-updatedAt")
                                .populate("owner","name email");
    res.status(200).json(result);
}

// const getAll = async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const options = {
//         page,
//         limit,
//         sort: { author: 1 },
//     };

//     const result = await Contact.paginate({}, options);
//     res.json(result);
// }

// const favorite = req.query.favorite;

//   const filter = {};

//   if (favorite !== undefined) {
//     filter.favorite = favorite;
//   }

//   const result = await Contact.find(filter);
//     res.json(result);

module.exports = getAll;
