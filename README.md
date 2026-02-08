# South Fade Barbers Website

<div align="center">

![South Fade Barbers Banner](./South-fade.png)

A modern, responsive website for South Fade Barbers - where tradition meets modern style.

**[Live Demo](https://south-fade.com/)** | **[Book Appointment](https://booksy.com/en-gb/167246_south-fade-barbers_barber_311817_london)**

</div>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Customization](#customization)
- [Business Information](#business-information)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 About

South Fade Barbers is a premium barbershop website designed to showcase services, provide business information, and enable easy online booking for customers. The website combines modern design principles with user-friendly navigation to create an exceptional digital presence for the barbershop.

### Mission
At South Fade Barbers, we believe that a great haircut is more than just a service—it's an experience. This website reflects our commitment to excellence by providing clients with easy access to our services and convenient online booking.

## ✨ Features

- **Responsive Design** - Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, contemporary design with smooth animations and transitions
- **Image Gallery** - Showcase barbershop interior and atmosphere
- **Service Showcase** - Detailed presentation of all grooming services offered
- **About Section** - Tell the barbershop's story and values
- **Online Booking Integration** - Direct integration with Booksy for appointment scheduling
- **Contact Information** - Easy access to location, phone, and business hours
- **Navigation Menu** - Smooth scrolling navigation with mobile-friendly hamburger menu
- **Performance Optimized** - Fast loading times and optimized assets
- **SEO Friendly** - Structured markup and meta tags for better search visibility

## 🛠 Tech Stack

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with Flexbox/Grid layouts
- **JavaScript** - Interactive functionality and smooth scrolling
- **Responsive Design** - Mobile-first approach

### Assets
- **Images** - WebP format for optimal performance
- **Icons** - Custom SVG icons or icon library
- **Fonts** - Web-optimized typography

### Third-Party Services
- **Booksy** - Appointment booking integration
- **Unsplash** - High-quality stock photography (where applicable)

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript
- Optional: Local web server (Live Server extension, Python's http.server, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SadikMohamud/South-fade-barbers.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd South-fade-barbers
   ```

3. **Open the project**
   ```bash
   code .  # If using VS Code
   ```

### Running Locally

#### Option 1: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option 2: Using Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then navigate to `http://localhost:8000` in your browser.

#### Option 3: Direct File Opening
Simply open `index.html` directly in your web browser (note: some features may require a server).

## 📁 Project Structure

```
South-fade-barbers/
│
├── index.html              # Main HTML file
├── style.css              # Main stylesheet
├── script.js              # JavaScript functionality
├── README.md              # Project documentation
│
├── assets/                # Assets directory
│   ├── images/
│   │   ├── South-fade.png
│   │   ├── sfbfront.webp
│   │   ├── Chairs.webp
│   │   └── Child-seat.webp
│   ├── fonts/            # Custom fonts (if any)
│   └── icons/            # Icon files (if any)
│
└── docs/                 # Additional documentation
    └── CONTRIBUTING.md   # Contribution guidelines
```

## 🌐 Deployment

### GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" section
3. Select the branch to deploy (usually `main` or `master`)
4. Choose the root directory
5. Click "Save"
6. Your site will be available at `https://yourusername.github.io/South-fade-barbers/`

### Netlify
1. Push your code to GitHub
2. Sign up for Netlify
3. Click "New site from Git"
4. Connect your GitHub repository
5. Configure build settings (usually none needed for static sites)
6. Deploy!

### Custom Domain
To use a custom domain like `south-fade.com`:
1. Purchase a domain from a registrar (Namecheap, GoDaddy, etc.)
2. Configure DNS settings to point to your hosting provider
3. Update CNAME or A records as per hosting provider instructions

## 🎨 Customization

### Updating Business Information

**Contact Details** (`index.html`):
```html
<p>5 Cavendish parade, London SW4 9DW</p>
<p>(0203) 496 4512</p>
```

**Business Hours** (`index.html`):
```html
<p>Mon-Fri: 9AM-8PM</p>
<p>Saturday: 9AM-7PM</p>
<p>Sunday: 10AM-6PM</p>
```

**Booking Link**:
Update the Booksy link in the "Book Now" buttons:
```html
<a href="https://booksy.com/your-booking-link">Book Now</a>
```

### Changing Colors
Update the color scheme in `style.css`:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --accent-color: #your-color;
}
```

### Adding Services
Add new service cards in the services section of `index.html`:
```html
<div class="service-card">
  <h3>Service Name</h3>
  <p>Service description</p>
  <span class="price">£Price</span>
</div>
```

## 📍 Business Information

**South Fade Barbers**
- **Address:** 5 Cavendish parade, London SW4 9DW, United Kingdom
- **Phone:** (0203) 496 4512
- **Website:** [south-fade.com](https://south-fade.com/)
- **Booking:** [Book on Booksy](https://booksy.com/en-gb/167246_south-fade-barbers_barber_311817_london)

**Operating Hours:**
- Monday - Friday: 9:00 AM - 8:00 PM
- Saturday: 9:00 AM - 7:00 PM
- Sunday: 10:00 AM - 6:00 PM

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a Pull Request

Please ensure your code follows best practices:
- Write clean, readable code
- Comment complex functionality
- Test across different browsers
- Maintain responsive design principles
- Optimize images and assets

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Developer:** Sadik Mohamud
- **GitHub:** [@SadikMohamud](https://github.com/SadikMohamud)
- **Website:** [snurm.dev](https://github.com/SadikMohamud)

**Business Inquiries:**
- **Email:** Contact via website form
- **Phone:** (0203) 496 4512

---

## 🙏 Acknowledgments

- Thanks to all clients who trust South Fade Barbers with their grooming needs
- Unsplash for high-quality stock photography
- The open-source community for inspiration and resources

## 📈 Future Enhancements

Potential features for future development:
- [ ] Gallery page with more photos
- [ ] Client testimonials section
- [ ] Blog for grooming tips and trends
- [ ] Online payment integration
- [ ] Email newsletter signup
- [ ] Social media feed integration
- [ ] Staff profiles and bios
- [ ] Price list PDF download
- [ ] Gift card purchase option
- [ ] Loyalty program integration

---

<div align="center">

**Crafted with passion for excellence in grooming** ✂️

Made with ❤️ by [Sadik Mohamud](https://github.com/SadikMohamud)

[⬆ Back to Top](#south-fade-barbers-website)

</div>

