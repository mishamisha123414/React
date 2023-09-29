const express = require("express");
const cors = require("cors"); // Імпорт cors
const app = express();
const port = 3001; // Порт, на якому запуститься сервер

app.use(cors());
app.use(express.json()); // Додайте цей middleware для обробки JSON-даних

// Обробник POST-запиту для реєстрації користувачів
app.post("/register", (req, res) => {
  // Отримайте дані з запиту, обробіть їх та відправте відповідь
  const { email, phone, password } = req.body;
  // Додайте логіку для обробки цих даних
  console.log("Подані дані:", email, phone, password);
  // Відправте відповідь (наприклад, успішну відповідь або помилку)
  res.status(200).send("Реєстрація пройшла успішно");
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
