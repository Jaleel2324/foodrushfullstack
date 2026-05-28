import { useState } from "react";
import axios from "axios";

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!formData.firstName.trim()) {
    setMessage("First name is required.");
    return;
  }

  if (!formData.email.includes("@")) {
    setMessage("Please enter a valid email.");
    return;
  }

  if (formData.phone.trim().length < 10) {
    setMessage("Please enter a valid phone number.");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/signup", formData);

    setMessage("Signup submitted successfully!");

    setFormData({
      firstName: "",
      email: "",
      phone: "",
      wantsTextReminder: false,
    });
  } catch (error) {
    setMessage("Something went wrong. Please try again.");
    console.error(error);
  }
};


