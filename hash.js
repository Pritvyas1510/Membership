import bcrypt from "bcrypt";

const password = "Rahul@123";

bcrypt.hash(password, 10).then(hash => {
  console.log("Hashed Password:", hash);
});
