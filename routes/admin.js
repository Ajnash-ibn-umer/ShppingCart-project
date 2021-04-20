var express = require("express");
var router = express.Router();
var adminHelper = require("../helpers/admin-helper");

let admin = true;

router.get("/", function (req, res, next) {
  let products = adminHelper.getAllProduct().then((products) => {
    res.render('./admin/admin-panel', { admin, products });
  })
});



router.get("/add-product", (req, res) => {
  res.render("admin/add-product", { admin: true });
});



router.post("/add-product", (req, res) => {
  console.log(req.body);
  console.log(req.files.image);
  adminHelper.addProduct(req.body, (id) => {
    let image = req.files.image;
    image.mv("./public/product-images/" + id + ".jpg", (err) => {
      if (!err) {
        res.render("admin/add-product.hbs", { admin });
      } else {
        console.log(err);
      }
    });
  });
});


router.get('/delete-product/:id',(req,res)=>{
let proId=req.params.id
 adminHelper.deleteProduct(proId).then(()=>{
   res.redirect('/admin')
 })
})
module.exports = router;
