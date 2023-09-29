import React, { Component } from "react";
import axios from "axios";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      password: "",
      registrationMessage: "", // Повідомлення про результат реєстрації
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, phone, password } = this.state;

    // Створіть об'єкт з даними для відправки
    const userData = {
      email,
      phone,
      password,
    };

    try {
      // Відправка POST-запиту на сервер
      const response = await axios.post("http://localhost:3001/register", userData);

      // Логіка обробки успішної відповіді від сервера
      console.log("Відповідь від сервера:", response.data);

      // Очистіть поля після відправки даних
      this.setState({
        email: "",
        phone: "",
        password: "",
        registrationMessage: "Реєстрація пройшла успішно", // Повідомлення про успіх
      });
    } catch (error) {
      // Логіка обробки помилки
      console.error("Помилка при відправці даних на сервер:", error);

      // Встановіть повідомлення про помилку
      this.setState({
        registrationMessage: "Помилка при реєстрації. Спробуйте ще раз.", // Повідомлення про помилку
      });
    }
  };

  render() {
    const { email, phone, password, registrationMessage } = this.state;

    return (
      <div>
        <h2>Реєстрація користувача</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label>Телефон:</label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <button type="submit">Зареєструватися</button>
        </form>
        {registrationMessage && (
          <p className="registration-message">{registrationMessage}</p>
        )}
      </div>
    );
  }
}

export default Registration;
