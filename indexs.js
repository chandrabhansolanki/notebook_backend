const mongoose = require('mongoose');
main().catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://localhost:27017/ChandraKart');
  console.log("connection done");
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}


// SCHEMA
const kittySchema = new mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function speak() {
  console.log(this?.name,"hello how");
  const greeting = this.name
    ? "Meow name is " + this.name 
    : "I don't have a name";
  // console.log(greeting);
};


// MODAL
const kitten = mongoose.model("newCollection", kittySchema)

const chandraKitty = new kitten({name: "chandraBhan"})
// console.log(chandraKitty.name);
// chandraKitty.speak()

// chandraKitty.save();
// chandraKitty.speak();

chandraKitty.save(function(err, chandraKitty){
  if(err) return console.log(err);
})


kitten.find({name:"chandraBhan"},function(err, kittens){
  if(err) return console.log(err);
  console.log(kittens);
})
// const kittens = kitten.find({ name:"chandraBhan" });
// console.log(kittens);