//script.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3001;

const User = require("./models/user"); // Імпорт моделі користувача
const bcrypt = require("bcrypt"); // Імпорт бібліотеки bcrypt

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/register", async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Перевірте, чи існує користувач з таким email в базі даних
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Користувач з таким email вже існує, поверніть помилку
      return res.status(400).send("Користувач з таким email вже зареєстрований.");
    }

    // Хешуйте пароль перед збереженням у базі даних
    const hashedPassword = await bcrypt.hash(password, 10); // "10" - кількість раундів хешування

    // Створіть нового користувача з хешованим паролем
    const newUser = new User({
      email,
      phone,
      password: hashedPassword, // Збережіть хешований пароль
    });

    // Збережіть нового користувача у базі даних
    await newUser.save();

    res.status(200).send("Реєстрація пройшла успішно");
  } catch (error) {
    console.error("Помилка при реєстрації:", error);
    res.status(500).send("Помилка при реєстрації. Спробуйте ще раз.");
  }
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});




//mongodb://localhost:27017