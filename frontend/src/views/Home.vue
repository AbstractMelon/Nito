<template>
  <div class="home">
    <!-- Hero Section -->
    <header class="hero">
      <h1>Welcome to Nito</h1>
      <p>Your secure, private messaging platform</p>
      <router-link to="/auth" class="cta-button">Get Started</router-link>
    </header>

    <!-- Features Section -->
    <section class="features">
      <h2>Why Choose Nito?</h2>
      <div class="feature-list">
        <div class="feature-item">
          <h3>End-to-End Encryption</h3>
          <p>Your messages are encrypted and stay private.</p>
        </div>
        <div class="feature-item">
          <h3>Cross-Platform</h3>
          <p>Access your messages anytime, anywhere, on any device.</p>
        </div>
        <div class="feature-item">
          <h3>User-Focused</h3>
          <p>Your privacy and security are our top priority.</p>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <h2>How It Works</h2>
      <p>Nito makes messaging simple and secure:</p>
      <ol>
        <li>Sign up and create your private account.</li>
        <li>Send encrypted messages to your friends and family.</li>
        <li>Enjoy the peace of mind knowing your data is safe!</li>
      </ol>
    </section>

    <!-- Footer Section -->
    <footer class="footer">
      <p>&copy; 2024 Nito. All rights reserved.</p>
      <div class="social-links">
        <a href="#" class="social-icon">Discord</a>
        <a href="#" class="social-icon">Bluesky</a>
        <a href="#" class="social-icon">Youtube</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home {
  font-family: "Arial", sans-serif;
  background-color: var(--background-dark);
  color: var(--text-light);
}

.hero {
  text-align: center;
  padding: 80px 20px;
  background-color: var(--background-light);
  color: #fff;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.hero p {
  font-size: 1.3rem;
  margin-bottom: 30px;
}

.cta-button {
  padding: 12px 25px;
  font-size: 1.1rem;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: var(--secondary-color);
}

.features {
  text-align: center;
  padding: 40px 20px;
  background-color: var(--background-dark);
}

.features h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.feature-list {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}

.feature-item {
  width: 30%;
}

.feature-item h3 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.feature-item p {
  color: var(--gray-light);
}

.how-it-works {
  background-color: var(--background-light);
  padding: 40px 20px;
  text-align: center;
}

.how-it-works h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.how-it-works ol {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: var(--gray-light);
}

.how-it-works li {
  margin: 10px 0;
  list-style-type: none;
}

.footer {
  background-color: var(--background-dark);
  color: var(--gray-light);
  text-align: center;
  padding: 20px;
}

.footer p {
  font-size: 1rem;
}

.social-links {
  margin-top: 10px;
}

.social-icon {
  margin: 0 10px;
  color: var(--gray-light);
  text-decoration: none;
  font-size: 1.1rem;
}

.social-icon:hover {
  color: var(--primary-color);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .feature-list {
    flex-direction: column;
  }

  .feature-item {
    width: 100%;
    margin-bottom: 30px;
  }

  .how-it-works ol {
    font-size: 1rem;
  }
}
</style>
