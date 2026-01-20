# Internship Assignment – Product Explorer Web App

This project is a frontend internship assignment built using React.  
The application displays product data fetched from a public API and provides multiple features such as searching, filtering, sorting, barcode search, and detailed product views.

---

## 🌐 Live Demo
🔗 Live URL: https://sparkling-pudding-8d40a6.netlify.app/

---

## 🚀 Features

- Product listing with real-time API data
- Search functionality with debouncing
- Category-based filtering
- Sorting options (e.g. name, nutrition grade, etc.)
- Barcode-based product search
- Detailed product view page
- Infinite scrolling for better performance
- Loading states and error handling
- Responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **API Handling:** Axios / Fetch API
- **Utilities:** Infinite Scroll
- **Version Control:** Git & GitHub

---

## 📂 Project Structure

```
├── 📁 public
│   └── 🖼️ vite.svg
├── 📁 src
│   ├── 📁 Components
│   │   ├── 📄 BarcodeSearch.jsx
│   │   ├── 📄 Category.jsx
│   │   ├── 📄 DonutChart.jsx
│   │   ├── 📄 FullDetailOfProduct.jsx
│   │   ├── 📄 Home.jsx
│   │   ├── 📄 Loader.jsx
│   │   ├── 📄 Products.jsx
│   │   ├── 📄 Products2.jsx
│   │   ├── 📄 SearchBar.jsx
│   │   └── 📄 SortItems.jsx
│   ├── 📁 assets
│   │   └── 🖼️ react.svg
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 vite.config.js

---

## ⚙️ Installation & Setup

1. Clone the repository
   ```bash
   git clone https://github.com/VanshRathor20/Internship-Assignment.git
   
2. Navigate to the project directory
   ```bash
   cd Internship-Assignment

3. Install dependencies
   ```bash
   npm install
  
4. Start the development server
   ```bash
   npm run dev

---

## 🌐 API Used

- Open Food Facts API
- Used for fetching product details including categories and nutrition grades.

---

## 📌 Key Learnings

- Working with real-world APIs

- Optimizing search using debouncing

- Managing state and side effects in React

- Implementing infinite scrolling

- Writing clean, reusable components

---

## 🧠 Method Used to Solve the Problem

- First, I analyzed the assignment requirements to understand core features.
- Chose React with Vite for faster development and better performance.
- Integrated Open Food Facts API to fetch real-time product data.
- Implemented debounced search to reduce unnecessary API calls.
- Added category-based filtering and sorting to improve usability.
- Implemented infinite scrolling to handle large data efficiently.
- Managed loading and error states for better user experience.
- Built reusable components and maintained clean project structure.

---

## ⏱️ Time Taken
Total time taken to complete this assignment: **3–4 days**

- Requirement analysis: 2–3 hours  
- API integration & data handling: 3–4 hours  
- Search, filter, sort features: 6–7 hours  
- UI styling & responsiveness: 3–4 hours  
- Testing & bug fixing: 2–3 hours
  
---

## 👤 Author
- Vansh Rathor
- Internship Assignment Project
